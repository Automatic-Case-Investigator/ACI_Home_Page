import { Box, Flex, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
    return <Box as="footer" bg="blue.900" color="white" width="100%" py={6} position="stick" bottom={0}>
        <Flex justify="center" align="center" gap={6} ml={8} mr={8}>
            <Text>
                Github:
                <Link href="https://github.com/Automatic-Case-Investigator" color="blue.500" ml={1}>
                    Automatic-Case-Investigator
                </Link>
            </Text>
            <Text>
                Contact:
                <Link href="mailto:lee4649@purdue.edu" color="blue.500" ml={1}>
                    lee4649@purdue.edu
                </Link>
            </Text>
        </Flex>
    </Box>;
}