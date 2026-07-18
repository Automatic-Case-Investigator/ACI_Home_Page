import { ImmediateChild } from "@/components/ui/DocumentTree"
import { landingPageColors as pageColors } from "@/themes/landingPageColors"
import { Box, SimpleGrid, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { RxFileText } from "react-icons/rx"
import { FaRegFolder } from "react-icons/fa"

interface DocsFolderOverviewProps {
    description?: string;
    children: ImmediateChild[];
}

export const DocsFolderOverview = ({ description, children }: DocsFolderOverviewProps) => {
    const navigate = useNavigate()

    return (
        <>
            {description && (
                <Text color={pageColors.textTertiary} mb={6}>{description}</Text>
            )}
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                {children.map((child) => (
                    <Box
                        key={child.key}
                        as="button"
                        textAlign="left"
                        onClick={() => navigate(`/documents/${child.key}`)}
                        p={4}
                        borderRadius="16px"
                        bg={pageColors.backgroundSection}
                        border={`1px solid ${pageColors.borderSoft}`}
                        cursor="pointer"
                        _hover={{ borderColor: pageColors.borderPrimaryAccent, bg: pageColors.surfaceHover }}
                        display="flex"
                        alignItems="center"
                        gap={3}
                    >
                        <Box color={child.isFolder ? pageColors.textPrimaryAccent : pageColors.textTertiary} fontSize="lg">
                            {child.isFolder ? <FaRegFolder /> : <RxFileText />}
                        </Box>
                        <Text fontWeight="600">{child.label}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </>
    )
}
