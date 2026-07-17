import { DocumentTree } from "@/components/ui/DocumentTree"
import { Footer } from "@/components/ui/Footer"
import { Navbar } from "@/components/ui/Navbar"
import visible_documents from "@/data/visible_documents.json"
import { landingPageColors as pageColors } from "@/themes/landingPageColors"
import { Box, Heading } from "@chakra-ui/react"

interface DocsLayoutProps {
    /** Full key of the doc currently open, if any — highlights it in the sidebar. */
    activeValue?: string;
    /** Full key/prefix to reveal in the sidebar on first render (defaults to activeValue). */
    expandValue?: string;
    children: React.ReactNode;
}

export const DocsLayout = ({ activeValue, expandValue, children }: DocsLayoutProps) => {
    return (
        <Box color={pageColors.text} minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1" display="flex" alignItems="stretch" pt={20}>
                <Box
                    as="nav"
                    w="280px"
                    flexShrink={0}
                    display={{ base: "none", md: "block" }}
                    borderRight={`1px solid ${pageColors.borderSoft}`}
                    py={8}
                    px={4}
                >
                    <Heading size="sm" mb={4} px={2} color={pageColors.textTertiary} textTransform="uppercase" letterSpacing="0.12em" fontSize="xs">
                        Documentation
                    </Heading>
                    <DocumentTree docs={visible_documents} activeValue={activeValue} expandValue={expandValue} />
                </Box>

                <Box flex="1" minW={0} px={{ base: 6, md: 12 }} py={8}>
                    <Box maxW="760px">
                        {children}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}
