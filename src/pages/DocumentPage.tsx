import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Document } from "@/components/ui/Document";
import { DocsFolderOverview } from "@/components/ui/DocsFolderOverview";
import { DocsLayout } from "@/components/ui/DocsLayout";
import { formatSegment, getImmediateChildren } from "@/components/ui/DocumentTree";
import visible_documents from "@/data/visible_documents.json"
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
            return { type: "leaf" as const, path: exact.path, title: exact.title };
        }

        const prefix = `${documentId}/`;
        const hasNested = Object.keys(visible_documents).some((key) => key.startsWith(prefix));
        if (hasNested) {
            return { type: "folder" as const };
        }

        return { type: "notfound" as const };
    }, [documentId]);

    if (resolved.type === "notfound") {
        return <NoPage />
    }

    if (resolved.type === "folder") {
        const folderName = documentId.split("/").filter(Boolean).pop() ?? "Documents";
        const children = getImmediateChildren(visible_documents, `${documentId}/`);

        return (
            <DocsLayout expandValue={documentId}>
                <Breadcrumbs documentId={documentId} currentLabel={formatSegment(folderName)} />
                <Heading mb={6}>{formatSegment(folderName)}</Heading>
                <DocsFolderOverview>{children}</DocsFolderOverview>
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
