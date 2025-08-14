import { Footer } from "@/components/ui/Footer"
import { Navbar } from "@/components/ui/Navbar"
import { Box, Heading, Link } from "@chakra-ui/react"

export const NoPage = () => {
    return (
        <>
            <Navbar />
            <Box display="flex" flexDirection="column" alignItems="center" mt={20}>
                <Heading size="4xl" textAlign="center">Page Not Found</Heading>
                <Box mb={4} />
                <Heading size="2xl" textAlign="center">The page you are looking for does not exist</Heading>
                <Box mb={4} />
                <Link href="/">Return to Home</Link>
            </Box>
        </>
    )
}