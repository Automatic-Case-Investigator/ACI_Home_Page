import { useEffect } from "react";

export const SITE_URL = "https://aci.acezxn.me";
export const DEFAULT_DESCRIPTION =
    "Automatic Case Investigator (ACI) is an on-premise software stack aimed to automate common SOC investigation tasks with AI agents, specifically by performing automated investigations in Security Information and Event Management (SIEM) systems.";
export const DEFAULT_IMAGE = `${SITE_URL}/assets/images/social_preview/main.png`;

interface PageMetaOptions {
    title: string;
    description?: string;
    path?: string;
    type?: "website" | "article";
    image?: string;
}

const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
};

const setLinkTag = (rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
};

// Updates document.title and OG/Twitter meta tags on route change. Note this only
// affects clients that execute JS (browser tabs, bookmarks, JS-aware crawlers like
// Googlebot) — link unfurlers that fetch static HTML (Slack, Twitter, Discord) will
// only ever see the defaults baked into public/index.html, since this app has no
// server-side rendering or static prerendering per route.
export const usePageMeta = ({
    title,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    type = "website",
    image = DEFAULT_IMAGE,
}: PageMetaOptions) => {
    useEffect(() => {
        const url = `${SITE_URL}${path}`;

        document.title = title;
        setMetaTag("name", "description", description);

        setMetaTag("property", "og:site_name", "ACI");
        setMetaTag("property", "og:title", title);
        setMetaTag("property", "og:description", description);
        setMetaTag("property", "og:type", type);
        setMetaTag("property", "og:url", url);
        setMetaTag("property", "og:image", image);

        setMetaTag("name", "twitter:card", "summary_large_image");
        setMetaTag("name", "twitter:title", title);
        setMetaTag("name", "twitter:description", description);
        setMetaTag("name", "twitter:image", image);

        setLinkTag("canonical", url);
    }, [title, description, path, type, image]);
};
