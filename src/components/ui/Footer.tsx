import { Box, Flex, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
    return <Box as="footer" bg="#07101a" color="#f4f7fb" width="100%" py={{ base: 8, md: 10 }} borderTop="1px solid rgba(148, 163, 184, 0.12)">
        <Flex justify="space-between" align={{ base: "start", md: "center" }} direction={{ base: "column", md: "row" }} gap={5} px={{ base: 5, md: 10 }}>
            <Box>
                <Text fontSize="sm" textTransform="uppercase" letterSpacing="0.18em" color="#8cc7ff" mb={2}>
                    Automatic Case Investigator
                </Text>
                <Text color="rgba(244,247,251,0.64)" maxW="560px">
                    On-premise AI agents for structured SOC investigations, SIEM query execution, and evidence correlation.
                </Text>
            </Box>

            <Flex gap={{ base: 3, md: 6 }} direction={{ base: "column", md: "row" }}>
                <Text color="rgba(244,247,251,0.7)">
                    GitHub:
                    <Link href="https://github.com/Automatic-Case-Investigator" color="#8cc7ff" ml={2} textDecoration="underline">
                        Automatic-Case-Investigator
                    </Link>
                </Text>
                <Text color="rgba(244,247,251,0.7)">
                    Contact:
                    <Link href="mailto:lee4649@purdue.edu" color="#8cc7ff" ml={2} textDecoration="underline">
                        lee4649@purdue.edu
                    </Link>
                </Text>
            </Flex>
        </Flex>
    </Box>;
}