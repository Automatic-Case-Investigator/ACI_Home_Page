import { Box, Heading, Image, Link, Text } from "@chakra-ui/react"
import { HiHeart } from "react-icons/hi"
import { Icon } from "@chakra-ui/react"

export const Hero = () => {
    return (
        <Box m={24}>
            <Box display="flex" justifyContent="center">
                <Box flex={1} m={2}>
                    <Heading size="5xl" mb={4}>Empowering security investigations with AI</Heading>
                    <Heading size="3xl" mb={4}>Automatic Case Investigator (ACI) is an AI SOC analyst platform targeted at SIEMs</Heading>
                    <Text>Built by <Link href="https://acezxn.me" color="blue.500">acezxn</Link> with <Icon color="red.500"><HiHeart /></Icon></Text>
                </Box>
                <Box flex={1} m={2} h="50%" display={{ base: "none", md: "flex" }}>
                    <Image src="/assets/images/cases.png" alt="cases" borderRadius="sm" />
                </Box>
            </Box>
            <Box flex={1} m={2} w="100%" display={{ base: "flex", md: "none" }}>
                <Image src="/assets/images/cases.png" alt="cases" borderRadius="sm" />
            </Box>
        </Box>
    )
}