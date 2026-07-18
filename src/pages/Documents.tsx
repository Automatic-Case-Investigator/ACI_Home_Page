import visible_documents from "@/data/visible_documents.json"
import folder_descriptions from "@/data/folder_descriptions.json"
import { DocsLayout } from "@/components/ui/DocsLayout"
import { DocsFolderOverview } from "@/components/ui/DocsFolderOverview"
import { getImmediateChildren } from "@/components/ui/DocumentTree"
import { usePageMeta } from "@/hooks/usePageMeta"
import { Heading } from "@chakra-ui/react"

export const Documents = () => {
    const children = getImmediateChildren(visible_documents, "")

    usePageMeta({
        title: "Documentation | ACI",
        description: "Guides, architecture references, and reference material for Automatic Case Investigator (ACI).",
        path: "/documents",
    });

    return (
        <DocsLayout>
            <Heading mb={2}>Documentation</Heading>
            <DocsFolderOverview description={folder_descriptions[""]}>{children}</DocsFolderOverview>
        </DocsLayout>
    )
}
