import { Box, Heading, Link, Text } from "@chakra-ui/react"
import { HiHeart } from "react-icons/hi"
import { Icon } from "@chakra-ui/react"

export const Hero = () => {
    return (
        <>
            <Box display="flex" justifyContent="center" m={16}>
                <Box flex={1} m={2}>
                    <Heading size="5xl" mb={4}>Empowering security investigations with AI</Heading>
                    <Heading size="3xl" mb={4}>Automatic Case Investigator (ACI) is an AI SOC analyst platform targeted at SIEMs</Heading>
                    <Text>Built by <Link href="https://acezxn.me">acezxn</Link> with <Icon color="red.500"><HiHeart /></Icon></Text>
                </Box>
                <Box flex={1} m={2} h="50%" bgColor="blue.800">
                    <Heading>SVG here</Heading>
                </Box>
            </Box>
        </>
    )
}