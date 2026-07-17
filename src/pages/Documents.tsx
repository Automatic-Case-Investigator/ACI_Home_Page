import visible_documents from "@/data/visible_documents.json"
import { DocsLayout } from "@/components/ui/DocsLayout"
import { DocsFolderOverview } from "@/components/ui/DocsFolderOverview"
import { getImmediateChildren } from "@/components/ui/DocumentTree"
import { landingPageColors as pageColors } from "@/themes/landingPageColors"
import { Heading, Text } from "@chakra-ui/react"

export const Documents = () => {
    const children = getImmediateChildren(visible_documents, "")

    return (
        <DocsLayout>
            <Heading mb={2}>Documentation</Heading>
            <Text color={pageColors.textTertiary} mb={6}>Browse the full set below, or use the sidebar to jump straight to a topic.</Text>
            <DocsFolderOverview>{children}</DocsFolderOverview>
        </DocsLayout>
    )
}
