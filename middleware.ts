import { next } from "@vercel/edge";
import visibleDocuments from "./src/data/visible_documents.json";
import folderDescriptions from "./src/data/folder_descriptions.json";

export const config = {
    matcher: ["/", "/documents/:path*"],
};

const SITE_URL = "https://aci.acezxn.net";
const DEFAULT_TITLE = "ACI - Your SIEM AI SOC analyst";
const DEFAULT_DESCRIPTION =
    "Automatic Case Investigator (ACI) is an on-premise platform aimed to automate alert triage and multi-step incident investigation using agentic AI.";

type DocEntry = { title: string; path: string; description?: string };
type Meta = { title: string; description: string; path: string; type: "website" | "article" };

const docs = visibleDocuments as Record<string, DocEntry>;
const folders = folderDescriptions as Record<string, string>;

const formatSegment = (segment: string) =>
    segment
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const escapeHtml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Mirrors the leaf/folder/not-found resolution in src/pages/DocumentPage.tsx, so
// crawlers that never execute JS (Discord, Slack, Twitter) see the same per-route
// title/description that usePageMeta sets client-side for real visitors.
const resolveMeta = (pathname: string): Meta | null => {
    const trimmed = pathname.replace(/\/+$/, "") || "/";

    if (trimmed === "/") {
        return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: "/", type: "website" };
    }

    if (trimmed === "/documents") {
        return {
            title: "Documentation | ACI",
            description: "Guides, architecture references, and reference material for Automatic Case Investigator (ACI).",
            path: "/documents",
            type: "website",
        };
    }

    if (!trimmed.startsWith("/documents/")) return null;
    const documentId = trimmed.slice("/documents/".length);

    const exact = docs[documentId];
    if (exact) {
        return {
            title: `${exact.title} | ACI`,
            description: exact.description ?? DEFAULT_DESCRIPTION,
            path: `/documents/${documentId}`,
            type: documentId.startsWith("blog/") ? "article" : "website",
        };
    }

    const prefix = `${documentId}/`;
    const hasNested = Object.keys(docs).some((key) => key.startsWith(prefix));
    if (hasNested) {
        const folderName = documentId.split("/").filter(Boolean).pop() ?? "Documents";
        return {
            title: `${formatSegment(folderName)} | ACI Docs`,
            description: folders[documentId] ?? DEFAULT_DESCRIPTION,
            path: `/documents/${documentId}`,
            type: "website",
        };
    }

    return null;
};

const setAttr = (html: string, identifier: RegExp, attr: string, value: string): string => {
    const re = new RegExp(`(<(?:meta|link)[^>]*${identifier.source}[^>]*${attr}=["'])[^"']*(["'])`, "i");
    return html.replace(re, `$1${value}$2`);
};

const injectMeta = (html: string, meta: Meta): string => {
    const url = `${SITE_URL}${meta.path}`;
    const title = escapeHtml(meta.title);
    const description = escapeHtml(meta.description);

    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    html = setAttr(html, /rel=["']canonical["']/, "href", url);
    html = setAttr(html, /name=["']description["']/, "content", description);
    html = setAttr(html, /property=["']og:title["']/, "content", title);
    html = setAttr(html, /property=["']og:description["']/, "content", description);
    html = setAttr(html, /property=["']og:type["']/, "content", meta.type);
    html = setAttr(html, /property=["']og:url["']/, "content", url);
    html = setAttr(html, /name=["']twitter:title["']/, "content", title);
    html = setAttr(html, /name=["']twitter:description["']/, "content", description);

    return html;
};

export default async function middleware(request: Request) {
    const url = new URL(request.url);
    const meta = resolveMeta(url.pathname);
    if (!meta) return next();

    const htmlResponse = await fetch(new URL("/index.html", url.origin));
    if (!htmlResponse.ok) return next();

    const html = await htmlResponse.text();

    return new Response(injectMeta(html, meta), {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
    });
}
