import { formatSegment } from "@/components/ui/DocumentTree"
import { landingPageColors as pageColors } from "@/themes/landingPageColors"
import { HStack, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

interface BreadcrumbsProps {
    /** Full "/"-joined key of the current doc or folder, e.g. "architecture/runtime". */
    documentId: string;
    /** Display label for the final (current) segment — usually the doc's real title. */
    currentLabel: string;
}

export const Breadcrumbs = ({ documentId, currentLabel }: BreadcrumbsProps) => {
    const parts = documentId.split("/").filter(Boolean)
    const ancestors = parts.slice(0, -1)

    return (
        <HStack gap={2} mb={6} fontSize="sm" color={pageColors.textTertiary} flexWrap="wrap">
            <Link asChild color={pageColors.textTertiary} _hover={{ color: pageColors.textPrimaryAccent }}>
                <RouterLink to="/documents">Documents</RouterLink>
            </Link>
            {ancestors.map((_, index) => {
                const path = parts.slice(0, index + 1).join("/")
                return (
                    <HStack key={path} gap={2}>
                        <Text color={pageColors.textQuaternary}>/</Text>
                        <Link asChild color={pageColors.textTertiary} _hover={{ color: pageColors.textPrimaryAccent }}>
                            <RouterLink to={`/documents/${path}`}>{formatSegment(parts[index])}</RouterLink>
                        </Link>
                    </HStack>
                )
            })}
            <Text color={pageColors.textQuaternary}>/</Text>
            <Text color={pageColors.text} fontWeight="600">{currentLabel}</Text>
        </HStack>
    )
}
