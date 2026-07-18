# Benchmark Methodology

This document is the reference source for how ACI's multi-step investigation benchmark is designed, run, and scored. It covers dataset preparation, trial design, the tool surface available to the agent, metric definitions, the statistical method used to interpret results, and the assumptions/threats to validity behind all of it.

The [blog post](/documents/blog/performing-multi-step-attack-analysis-with-agentic-ai) walks through a specific benchmark run narratively, with a worked example trace and a condensed statistics appendix. This document is the fuller, standalone version: read it if you're trying to reproduce the evaluation, scrutinize the scoring, or run a similar benchmark against a different scenario or model.

## Dataset

### AIT Alert Data Set (AIT-ADS)

The benchmark is built on the [AIT Alert Data Set](https://github.com/ait-aecid/ait-ads-dataset), a collection of multi-stage intrusion scenarios executed against a simulated enterprise network, with every attack step timestamped and labeled against the underlying host and network logs. AIT-ADS was chosen over a synthetic or hand-written alert set for two reasons: the alerts come from real detection tooling (Wazuh) reacting to real attacker behavior rather than being authored to be "findable," and each scenario ships with an independent ground-truth timeline, so phase recall can be scored against a source the agent never sees.

### The `fox` scenario

The benchmark uses the `fox` scenario. `fox` chains a public-facing WordPress instance, service and directory reconnaissance, credential theft, and a pivot to local privilege escalation, giving a single scenario enough distinct phases to measure recall meaningfully while still being small enough to seed and tear down per trial. Ten phases are labeled in the scenario's ground truth; eight are used for scoring in this benchmark. See [Phase glossary](#phase-glossary) for why two are excluded and what each phase name means operationally.

### Data preparation pipeline

AIT-ADS distributes each scenario as two raw dumps: Wazuh alerts and AMiner anomaly events. Neither is benchmark-ready on its own, so both go through a preparation pipeline before a trial can run against them:

1. **Wazuh alert reconstruction.** The raw Wazuh alert dump is preprocessed back into full OpenSearch documents — rebuilding the `_index`, `_id`, and `_score` envelope and a native timestamp field — so the alerts look exactly like what a live Wazuh deployment would have indexed at ingest time.
2. **AMiner-to-Wazuh re-decoding.** AMiner (the dataset's host-based anomaly detector) events are not native Wazuh alerts, but the scenario's ground truth is keyed to them. Each AMiner event's raw log line is re-decoded exactly as Wazuh's own decoders and default ruleset would process it — assigning the real rule ID, level, rule groups, and extracted fields — so it becomes indistinguishable in structure from an alert Wazuh generated natively.
3. **Ground-truth separation.** The AMiner detector's own metadata (which events are anomalous, and which phase they belong to) is stripped out of the re-decoded alert and written to a separate labels file. This file is never exposed to the agent; it exists purely for scoring.
4. **Chronological merge.** The reconstructed Wazuh alerts and the re-decoded AMiner alerts are merged into one chronologically ordered stream. This step matters for validity: if the two sources were loaded separately, the agent could learn to treat "came from the AMiner file" as a signal of relevance. Merged, a planted anomaly is presented in the same stream, in the same format, and in the same time order as ordinary background alert noise.
5. **Loading.** The merged stream is loaded into a live Wazuh instance via `elasticdump`, so the agent's SIEM tools query real Wazuh indices rather than a static fixture.
6. **SOAR seeding.** A subset of the merged stream is imported into TheHive to seed the cases and alerts the agent actually triages: Wazuh alerts at rule level ≥ 7, plus the AMiner-flagged anomalies, excluding events AMiner itself marked as baseline/training-mode. This mirrors how a real deployment's alert-forwarding rules would decide what reaches the SOC's queue in the first place — the agent is not handed the full merged stream, only what would plausibly have generated a case.
7. **Per-run tagging.** Every import is tagged with a run identifier so the seeded alerts, cases, and comments from one trial can be identified and torn down cleanly before the next trial starts, without leaving residue that could leak information between runs.

## Entry points

Two entry points are used, chosen because they sit at very different points in the `fox` kill chain and require different investigative reach to resolve fully:

- **WPScan alert** (Wazuh rule 31151, level 10) — a WordPress vulnerability-scanning detection, mapped to MITRE ATT&CK T1595.002 (Active Scanning: Vulnerability Scanning). This is an early-stage, low-severity-feeling alert: the kind of noisy signal that's easy to triage-and-close without investigating further. It requires the agent to work forward through the entire chain to reach later phases like privilege escalation.
- **Privilege-escalation alert** (Wazuh rule 5501, level 3, PAM session-opened) — a comparatively bare host-level event, mapped near the end of the kill chain. It requires the agent to work backward: correlate a low-signal login event against prior activity on the same host to reconstruct how the privilege escalation happened.

Both alerts' full raw payloads are reproduced in the blog post's [Setup](/documents/blog/performing-multi-step-attack-analysis-with-agentic-ai#setup) section rather than duplicated here, to avoid two copies drifting out of sync.

## Tool surface

The agent operates through a fixed set of MCP tools spanning the SIEM (Wazuh) and SOAR (TheHive) integrations, plus a scratchpad/task-queue interface described in [Task-driven investigation](/documents/blog/performing-multi-step-attack-analysis-with-agentic-ai#task-driven-investigation). No tools outside this list are available during a trial.

| Tool | Source | Purpose |
| --- | --- | --- |
| `search` / `search_keyword` | SIEM | Full-text and structured queries against Wazuh alert indices |
| `get_event` | SIEM | Fetch a single alert/event by ID |
| `profile_field` | SIEM | Summarize the distribution of values for a field across a result set |
| `get_event_volume` | SIEM | Time-bucketed counts of matching events, for spotting bursts or gaps |
| `correlate_entity` | SIEM | Pull every event referencing a given entity (IP, host, user); `cross_role` widens the match across a field's different roles (e.g. an IP appearing as source in one event and destination in another) |
| `correlate_techniques` | SIEM | Find events that map to related MITRE ATT&CK techniques |
| `list_indices` / `get_index_schema` | SIEM | Discover what indices exist and what fields they expose |
| `get_case` / `list_cases` | SOAR | Read case metadata and enumerate open cases |
| `get_alert` / `list_case_alerts` | SOAR | Read alert detail and list the alerts attached to a case |
| `get_similar_cases` | SOAR | Retrieve prior cases with overlapping observables, for pattern reuse |
| `update_case` | SOAR | Set case status/severity/verdict |
| `post_case_comment` / `post_case_report` | SOAR | Write investigative notes and the final report back to the case |

## Trial design

- **Model:** `gpt-5.4-mini-2026-03-17`, medium reasoning effort, held constant across every trial.
- **Structure:** 2 entry points × 3 trials each = 6 runs total.
- **What's held constant:** the scenario, the seeded alert/case data, the model and its configuration, and the tool surface.
- **What varies:** only the model's own run-to-run non-determinism. No prompt, seed data, or tool availability is changed between the three trials of a given entry point.
- **Why three trials:** three runs per entry point is enough to distinguish "the agent reliably reaches this phase" from "the agent reached this phase once and got lucky," without the cost of running dozens of trials against a single scenario. It's explicitly a consistency check, not a precision instrument — see [Assumptions and threats to validity](#assumptions-and-threats-to-validity) for what that does and doesn't license.

## Metrics

### Phase recall

A phase counts as **reached** if the agent's final report either cites a marker event from that phase directly, or contains a timestamp that falls inside that phase's ground-truth time window. Both count equally — the requirement is evidence that the agent's investigation actually touched that part of the timeline, not a specific citation format.

#### Phase glossary

The `fox` scenario's ground truth divides the intrusion into these phases. Descriptions below are operational — what evidence in the alert stream corresponds to each phase — rather than a verbatim reproduction of the dataset's own documentation.

| Phase | What it represents |
| --- | --- |
| `service_scans` | Initial network/service reconnaissance against the target host, preceding the WordPress-specific probing |
| `wpscan` | WordPress vulnerability scanning via the WPScan tool (the source of this benchmark's WPScan entry-point alert) |
| `dirb` | Directory and file brute-forcing against the web application, enumerating hidden paths |
| `webshell` | Upload and/or invocation of a web shell on the compromised host |
| `cracking` | Offline password cracking against credential material obtained earlier in the chain |
| `reverse_shell` | Establishment of an interactive reverse shell back to attacker-controlled infrastructure |
| `privilege_escalation` | Escalation from a low-privilege foothold to root/administrative access (the source of this benchmark's privilege-escalation entry-point alert) |
| `service_stop` | Disruption of a running service on the host, as a defense-evasion/impact action |

Two phases in the scenario's ground truth are **excluded** from scoring:

- **Raw network SYN sweep** — a low-level TCP SYN scan that leaves no distinguishing signature in the alert stream once merged; there is nothing in the data an agent could cite to demonstrate it noticed this phase specifically, so scoring it would measure the dataset's telemetry gaps rather than the agent.
- **No-tunneling DNS window** — a DNS-based portion of the scenario that, absent DNS tunneling indicators in this particular run of the scenario, is indistinguishable from benign DNS traffic in the available logs, for the same reason.

Both exclusions are applied identically to every trial and are decided from the dataset's structure, not from any individual run's results.

### Verdict correctness

A trial's verdict is scored correct if the case status/verdict the agent writes back via `update_case` matches the AIT-ADS ground-truth classification for `fox` (a true-positive, critical-severity intrusion). This is a binary per-trial outcome, independent of phase recall — a trial can reach every phase and still record the wrong verdict, or vice versa.

### Cost to verdict

Two figures are tracked per trial, both cumulative for the full run (from the initial alert to the final report being posted):

- **Model calls** — every model invocation during the run, including both the initial triage step and any subsequent investigation steps.
- **Input tokens** — the cumulative input token count across all of those calls.

Neither figure includes tool-execution time or the SIEM/SOAR services' own latency — only what the agent itself consumed.

## Statistical methodology

Every metric above is a small-sample proportion (recall or correctness measured over 3 trials per entry point, 6 overall). Reporting raw fractions like `2/3` without a sense of the uncertainty around them invites over-reading — the method below is the general one used to turn those fractions into credible intervals, and it's written to be reusable for any future benchmark run, not just the numbers in this specific evaluation.

**Model.** Each trial is treated as a Bernoulli outcome (phase reached or not; verdict correct or not). With a uniform `Beta(1, 1)` prior over the true success probability θ, observing `s` successes and `f` failures out of `n = s + f` trials gives a posterior `Beta(1 + s, 1 + f)` by conjugacy.

**Point estimate.** The posterior mean, `(1 + s) / (2 + n)`, is reported rather than the raw fraction `s / n`. This is a deliberate choice, not a rounding convenience: `s/n` treats `3/3` and `30/30` identically, while `(1+s)/(2+n)` pulls small samples toward 0.5 in proportion to how little evidence they represent. A perfect `3/3` becomes a point estimate of `4/5 = 0.8`, not `1.0` — the model is explicitly refusing to claim certainty from three observations.

**Credible interval.** For results at the boundary (`s = n` or `s = 0`), the posterior is `Beta(α, 1)` or `Beta(1, β)`, which has a closed-form CDF, so a one-sided credible bound can be computed directly rather than requiring numerical integration. For `Beta(α, 1)`: `P(θ > x) = 1 − x^α`. Setting this equal to a chosen confidence level and solving for `x` gives the lower bound directly — e.g. for a `Beta(4, 1)` posterior (3/3 successes) and 90% confidence, `x = 0.1^(1/4) ≈ 0.56`, meaning the data support "the true success rate is at least ~56%" at 90% confidence, well short of certainty.

**Applied to this evaluation's non-boundary results**, the same posterior mean and interval logic applies; those don't reduce to closed form as cleanly and are computed by direct integration of the Beta CDF instead of the boundary shortcut above.

**Independence caveat.** This model treats the three trials per entry point as independent draws. They share a model, a prompt, and identical seed data, so in the strictest sense they are not independent draws from some larger population of possible scenarios — they're repeated measurements of one scenario's difficulty for one model configuration. The credible interval should be read as "how consistent was this model on this scenario," not "what fraction of arbitrary scenarios would this model handle."

## Assumptions and threats to validity

- **Sample size.** Three trials per entry point bounds what the credible intervals above can claim — they characterize consistency on a single scenario, not a general success rate. See the independence caveat above.
- **Single-scenario generalization.** All results come from the `fox` scenario. AIT-ADS includes other scenarios with different attack chains; nothing here should be read as a claim about performance on scenarios not tested.
- **No negative controls.** The benchmark only measures true-positive handling. False-positive rate — how often the agent escalates or invents phases that didn't happen — is not currently measured, because `fox` doesn't include a benign-alert control arm.
- **Single model/configuration.** Every trial uses the same model at the same reasoning-effort setting. Results should not be extrapolated to other models or to different reasoning-effort settings without separate measurement.
- **Scoring is criteria-based, not exact-match.** "Reached a phase" is judged against the marker-event/time-window criteria above, which involves some interpretive judgment on ambiguous report text. The same criteria are applied uniformly across every trial to keep this consistent, but it is not a fully mechanical string match.
- **Non-determinism across trials.** Because trials differ only in the model's own sampling variance, a scenario that happens to have one especially easy or hard path through the alert stream will show up as trial-to-trial variance rather than as a distinguishable "difficulty" signal.

## Reproducing this benchmark

Reproducing a run requires a live Wazuh + TheHive environment seeded per the [data preparation pipeline](#data-preparation-pipeline) above; see [Connecting with SOC Technologies](/documents/docs/connecting-with-soc-tech) for standing up that environment, and [Configuration](/documents/reference/configuration) for the environment variables ACI needs to reach it. Each trial should be torn down (per the per-run tagging step above) before the next one starts, so that no case, comment, or alert from a prior run is visible to the next.

This document describes the experimental design in enough detail to reproduce it conceptually — the dataset transform, seeding rules, trial structure, and scoring criteria are all specified above. The harness scripts that actually drive and score trials live in the ACI backend project rather than in this docs site.

## Related reading

- [Performing Multi-Step Attack Analysis with Agentic AI](/documents/blog/performing-multi-step-attack-analysis-with-agentic-ai) — the narrative write-up, including a full worked example trace through one trial
- [Runtime & Agent Graph](/documents/architecture/runtime/agent-graph) — how the agent loop that's being benchmarked actually executes
- [MCP and Tool Policy](/documents/architecture/tools) — how the tool surface listed above is exposed to the model
