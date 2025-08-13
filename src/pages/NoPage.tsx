import { Box, Heading, Link } from "@chakra-ui/react"

export const NoPage = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Heading size="4xl" textAlign="center">Page Not Found</Heading>
            <Heading size="2xl" textAlign="center">The page you are looking for does not exist</Heading>
            <Link href="/">Return to Home</Link>
        </Box>
    )
}