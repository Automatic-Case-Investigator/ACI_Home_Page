import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Document } from "@/components/ui/Document";
import { DocsFolderOverview } from "@/components/ui/DocsFolderOverview";
import { DocsLayout } from "@/components/ui/DocsLayout";
import { formatSegment, getImmediateChildren } from "@/components/ui/DocumentTree";
import visible_documents from "@/data/visible_documents.json"
import folder_descriptions from "@/data/folder_descriptions.json"
import { usePageMeta } from "@/hooks/usePageMeta";
import { Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { NoPage } from "./NoPage";

export const DocumentPage = () => {
    const params = useParams();
    const documentId = params["*"] ?? "";

    const resolved = useMemo(() => {
        const exact = visible_documents[documentId as keyof typeof visible_documents];
        if (exact && typeof exact.path === "string") {
            return { type: "leaf" as const, path: exact.path, title: exact.title, description: exact.description };
        }

        const prefix = `${documentId}/`;
        const hasNested = Object.keys(visible_documents).some((key) => key.startsWith(prefix));
        if (hasNested) {
            return { type: "folder" as const };
        }

        return { type: "notfound" as const };
    }, [documentId]);

    const folderName = documentId.split("/").filter(Boolean).pop() ?? "Documents";
    const isBlogPost = documentId.startsWith("blog/");

    usePageMeta({
        title:
            resolved.type === "leaf"
                ? `${resolved.title} | ACI`
                : resolved.type === "folder"
                    ? `${formatSegment(folderName)} | ACI Docs`
                    : "Page Not Found | ACI",
        description:
            resolved.type === "leaf"
                ? resolved.description
                : resolved.type === "folder"
                    ? folder_descriptions[documentId as keyof typeof folder_descriptions]
                    : undefined,
        path: `/documents/${documentId}`,
        type: isBlogPost ? "article" : "website",
    });

    if (resolved.type === "notfound") {
        return <NoPage />
    }

    if (resolved.type === "folder") {
        const children = getImmediateChildren(visible_documents, `${documentId}/`);

        return (
            <DocsLayout expandValue={documentId}>
                <Breadcrumbs documentId={documentId} currentLabel={formatSegment(folderName)} />
                <Heading mb={6}>{formatSegment(folderName)}</Heading>
                <DocsFolderOverview description={folder_descriptions[documentId as keyof typeof folder_descriptions]}>{children}</DocsFolderOverview>
            </DocsLayout>
        )
    }

    return (
        <DocsLayout activeValue={documentId}>
            <Breadcrumbs documentId={documentId} currentLabel={resolved.title} />
            <Document documentPath={resolved.path} />
        </DocsLayout>
    )
}
