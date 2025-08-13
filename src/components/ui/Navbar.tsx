import { Button, Container, Flex, Text, HStack, Spacer } from "@chakra-ui/react";

export const Navbar = () => {
    return (
        <>
            <Flex
                as="header"
                position="fixed"
                top={0}
                left={0}
                w="100%"
                h={16}
                px={4}
                align="center"
                backgroundColor="#0000ff10"
                backdropFilter="blur(8px)"
                zIndex={999}>

                <Text fontWeight="bold" fontSize="lg">
                    ACI
                </Text>

                <Spacer />

                <HStack display={{ base: "none", md: "flex" }}>
                    <Button variant="ghost">Details</Button>
                </HStack>
            </Flex>
        </>
    );
};
