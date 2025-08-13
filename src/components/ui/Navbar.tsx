import { Button, Flex, HStack, Spacer, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"

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

                <Link href="/">
                    <RouterLink to="/"><img src="/assets/icons/ACI_small.svg" alt="icon" width={30}/></RouterLink>
                </Link>

                <Spacer />

                <HStack display={{ base: "none", md: "flex" }}>
                    <RouterLink to="/documents/get_started"><Button variant="ghost">Get Started</Button></RouterLink>
                    <RouterLink to="/documents"><Button variant="ghost">Details</Button></RouterLink>
                </HStack>
            </Flex>
        </>
    );
};
