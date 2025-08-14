import { Button, Flex, HStack, Spacer, Link, IconButton, Menu, Portal } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"
import { RxHamburgerMenu } from "react-icons/rx";

export const Navbar = () => {
    interface MenuLink {
        label: string;
        to: string;
    }

    const navbarItems: MenuLink[] = [
        { label: "Get Started", to: "/documents/get_started" },
        { label: "Details", to: "/documents/project_structure" }
    ];

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
                    <RouterLink to="/"><img src="/assets/icons/ACI_small.svg" alt="icon" width={30} /></RouterLink>
                </Link>

                <Spacer />

                <HStack display={{ base: "none", md: "flex" }}>
                    {
                        navbarItems.map((navbarItem, index) => (
                            <RouterLink to={navbarItem["to"]}><Button variant="ghost" colorScheme="blue">{navbarItem["label"]}</Button></RouterLink>
                        ))
                    }
                </HStack>

                <Menu.Root>
                    <Menu.Trigger asChild>
                        <IconButton
                            aria-label="Open Menu"
                            display={{ base: "flex", md: "none" }}
                            variant="ghost"
                            colorScheme="blue">
                            <RxHamburgerMenu />
                        </IconButton>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                {
                                    navbarItems.map((navbarItem, index) => (
                                        <RouterLink to={navbarItem["to"]}>
                                            <Menu.Item value={navbarItem["label"]}>
                                                {navbarItem["label"]}
                                            </Menu.Item>
                                        </RouterLink>
                                    ))
                                }
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </Flex>
        </>
    );
};
