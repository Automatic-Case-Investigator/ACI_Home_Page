import { Box, Button, Flex, HStack, IconButton, Menu, Portal } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"
import { RxHamburgerMenu } from "react-icons/rx";

export const Navbar = () => {
    interface MenuLink {
        label: string;
        to: string;
        isExternal?: boolean;
    }

    const navbarItems: MenuLink[] = [
        { label: "Capabilities", to: "/#features", isExternal: true },
        { label: "Get Started", to: "/documents/get_started" },
        { label: "Architecture", to: "/documents/project_structure" }
    ];

    return (
        <Flex
            as="header"
            position="fixed"
            top={0}
            left={0}
            w="100%"
            h={20}
            px={{ base: 4, md: 8 }}
            align="center"
            justify="space-between"
            background="rgba(8, 17, 29, 0.56)"
            borderBottom="1px solid rgba(148, 163, 184, 0.12)"
            backdropFilter="blur(18px)"
            zIndex={999}
        >
            <RouterLink to="/">
                <HStack gap={3}>
                    <img src="/assets/icons/ACI_small.svg" alt="ACI logo" width={34} />
                    <Box display={{ base: "none", sm: "block" }}>
                        <Box color="#f4f7fb" fontSize="sm" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase">
                            Automatic Case Investigator
                        </Box>
                        <Box color="rgba(244,247,251,0.56)" fontSize="xs">
                            Evidence-driven SOC investigation stack
                        </Box>
                    </Box>
                </HStack>
            </RouterLink>

            <HStack display={{ base: "none", md: "flex" }} gap={2}>
                {navbarItems.map((navbarItem) => (
                    <Button
                        key={navbarItem.label}
                        asChild
                        variant="ghost"
                        color="#dbeafe"
                        _hover={{ bg: "rgba(255,255,255,0.07)", color: "#ffffff" }}
                    >
                        {navbarItem.isExternal ? <a href={navbarItem.to}>{navbarItem.label}</a> : <RouterLink to={navbarItem.to}>{navbarItem.label}</RouterLink>}
                    </Button>
                ))}
            </HStack>

            <Menu.Root>
                <Menu.Trigger asChild>
                    <IconButton
                        aria-label="Open Menu"
                        display={{ base: "flex", md: "none" }}
                        variant="ghost"
                        color="#dbeafe"
                        _hover={{ bg: "rgba(255,255,255,0.07)" }}
                    >
                        <RxHamburgerMenu />
                    </IconButton>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content bg="#0d1828" border="1px solid rgba(148, 163, 184, 0.14)">
                            {navbarItems.map((navbarItem) => (
                                <Menu.Item key={navbarItem.label} value={navbarItem.label} asChild>
                                    {navbarItem.isExternal ? <a href={navbarItem.to}>{navbarItem.label}</a> : <RouterLink to={navbarItem.to}>{navbarItem.label}</RouterLink>}
                                </Menu.Item>
                            ))}
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Flex>
    );
};
