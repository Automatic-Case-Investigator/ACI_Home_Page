import { Box, Heading, Text, Link, Flex } from "@chakra-ui/react"
import { Hero } from "@/components/home/Hero"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"

export const Home = () => {
    return (
        <Box>
            <Navbar />
            <Hero />

            <Box m={8}>
                <Heading size="3xl" mb={6}>Features</Heading>

                <Box mb={8}>
                    <Heading size="lg" mb={2}>Seamless Integration</Heading>
                    <Text>
                        Connect effortlessly with TheHive and Wazuh to streamline your security operations.
                        Our platform eliminates the complexity of manual setup, enabling your team to
                        start investigating incidents without time-consuming configuration.
                        Integration is fast, reliable, and designed to work right out of the box.
                    </Text>
                </Box>

                <Box mb={8}>
                    <Heading size="lg" mb={2}>Investigation Plan Generation</Heading>
                    <Text>
                        Automatically transform security case data into an investigation plan, reducing the burden
                        on analysts and ensuring a consistent, high-quality incident response.
                    </Text>
                </Box>

                <Box mb={8}>
                    <Heading size="lg" mb={2}>Automatic Investigation</Heading>
                    <Text>
                        Leverage Large Language Models (LLMs) to generate SIEM queries for investigation.
                        The system runs these queries and assesses the relevance of search results through a BERT-based classifier, minimizing manual searching.
                        By acting as a built-in knowledge base for SOC analysts, it helps uncover overlooked evidence and accelerates incident resolution.
                    </Text>
                </Box>

                <Heading size="3xl" mb={4}>Demo</Heading>
                <Text fontStyle="italic" color="gray.400">Demonstration coming soon!</Text>
            </Box>

            <Footer />
        </Box>
    )
}
