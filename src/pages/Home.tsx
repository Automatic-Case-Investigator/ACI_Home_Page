import { Box, Button, Flex, Grid, GridItem, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { landingPageColors as pageColors } from "@/themes/landingPageColors"

const problemPoints = [
    "Most AI SOC tools optimize for speed across the entire alert lifecycle, trading investigation depth for triage throughput.",
    "Alerts are often diagnosed individually with limited awareness to a broader activity context.",
    "Findings get asserted as narrative summaries with no path back to the log events that actually support them.",
    "Investigation quality still depends on which analyst is free and how much SIEM pivoting they have time for.",
]

const featureCards = [
    {
        eyebrow: "Quick alert / case triage",
        title: "Evidence-backed triage in seconds",
        description:
            "A 12-step agent reads the case's SIEM evidence and returns a triage report with a prioritized investigation plan, instead of a ticket sitting in an analyst queue.",
    },
    {
        eyebrow: "Deep investigation",
        title: "Findings grounded in real evidence",
        description:
            "A 40-step budget loops through seed, claim, think, tool-use, and pivot steps, generating and running SIEM queries until each task's findings are grounded in retrieved evidence, not just asserted.",
    },
    {
        eyebrow: "Autonomous workflow",
        title: "No manual kickoff required",
        description:
            "Wazuh and TheHive webhooks trigger the pipeline on new case and new alert events, moving a case from intake to a published verdict without anyone kicking off a run by hand.",
    },
]

const workflowSteps = [
    "Wazuh and TheHive alerts arrive through webhook integrations.",
    "The orchestrator agent routes each alert or case to the triage agent for an initial read against SIEM evidence.",
    "Verified cases hand off to the investigation agent, which executes the investigation plan to retrieve more evidences.",
    "Analysts watch the full reasoning trace and evidence trail live on the live dashboard.",
]

const proofItems = [
    "Task-driven investigation: investigations are decomposed into discrete, prioritized tasks worked one at a time, keeping them focused and auditable.",
    "Evidence-anchored findings: confirmed facts, working hypotheses, and extracted artifacts are tracked and reasoned across tasks.",
    "Real-time reasoning visibility: every tool call and decision streams to the dashboard as it happens.",
    "MCP tool ecosystem: Scalable integrations with SIEM, SOAR, workspace, and memory providers via Model Context Protocol",
]

export const Home = () => {
    return (
        <Box color={pageColors.text} overflow="hidden" display="flex" flexDirection="column" minH="100vh">
            <Navbar />
            <Box flex="1">
            <Box position="relative" pt={{ base: 28, md: 36 }}>
                <Box
                    position="absolute"
                    insetX={0}
                    top={0}
                    h="780px"
                    bg={pageColors.heroBackground}
                />

                <Box position="relative" px={{ base: 5, md: 10 }} pb={{ base: 14, md: 24 }}>
                    <Grid templateColumns={{ base: "1fr", xl: "1.1fr 0.9fr" }} gap={{ base: 12, xl: 10 }} alignItems="center">
                        <GridItem>
                            <VStack align="start" gap={6} maxW="760px">
                                <Heading
                                    fontSize={{ base: "4xl", md: "6xl", xl: "7xl" }}
                                    lineHeight={{ base: 1.03, md: 0.98 }}
                                    letterSpacing="-0.04em"
                                    maxW="920px"
                                >
                                    Empowering Security Investigations with AI
                                </Heading>

                                <Text fontSize={{ base: "lg", md: "xl" }} color={pageColors.textSecondary} maxW="700px">
                                    Automatic Case Investigator (ACI) is an on-premise multi-step security investigation platform built with Agentic AI. It triages and investigates alerts and cases and produces evidence-backed incident reports.
                                </Text>

                                <HStack gap={4} flexWrap="wrap">
                                    <Button asChild size="lg" bg={pageColors.cta} color={pageColors.background} _hover={{ bg: pageColors.ctaHover }}>
                                        <a href="/documents/docs/getting-started">Get Started</a>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" borderColor={pageColors.borderButton} color={pageColors.text} _hover={{ bg: pageColors.surfaceHover }}>
                                        <a href="/documents/blog/performing-multi-step-attack-analysis-with-agentic-ai">See How It Works</a>
                                    </Button>
                                </HStack>

                                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} w="100%" pt={4}>
                                    <Box p={5} borderRadius="2xl" bg={pageColors.surfaceGlass} border={`1px solid ${pageColors.borderSecondaryAccent}`}>
                                        <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.18em" color={pageColors.textSecondaryAccent} mb={2}>Core outcome</Text>
                                        <Text fontSize="lg" fontWeight="600">Evidence over narrative</Text>
                                        <Text color={pageColors.textQuaternary}>Every finding is tied to a retrieved log event, not an unconfirmed summary.</Text>
                                    </Box>
                                    <Box p={5} borderRadius="2xl" bg={pageColors.surfaceGlass} border={`1px solid ${pageColors.borderPrimaryAccent}`}>
                                        <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.18em" color={pageColors.textPrimaryAccent} mb={2}>Deployment</Text>
                                        <Text fontSize="lg" fontWeight="600">On-premise by design</Text>
                                        <Text color={pageColors.textQuaternary}>Runs on your own infrastructure with local inference support, ensuring no sensitive security data leaves your environment.</Text>
                                    </Box>
                                </SimpleGrid>
                            </VStack>
                        </GridItem>

                        <GridItem justifySelf={{ base: "stretch", xl: "end" }}>
                            <Box position="relative" w={{ base: "100%", xl: "50vw" }} maxW="none" mx="auto">
                                <Box
                                    position="absolute"
                                    top="-28px"
                                    right="-28px"
                                    w="180px"
                                    h="180px"
                                    bg={pageColors.heroGlow}
                                    filter="blur(36px)"
                                    borderRadius="full"
                                />
                                <Box
                                    position="relative"
                                    borderRadius="0px"
                                    overflow="hidden"
                                    border={`1px solid ${pageColors.borderStrong}`}
                                    bg={pageColors.heroPanelBackground}
                                    boxShadow={pageColors.heroShadow}
                                >
                                    <Box p={4}>
                                        <Image w="100%" src="/assets/images/example_conversation.png" alt="Example conversation" />
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
            </Box>

            <Box px={{ base: 5, md: 10 }} pb={{ base: 14, md: 18 }}>
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
                    <Box p={{ base: 6, md: 8 }} borderRadius="32px" bg={pageColors.backgroundSectionAlt} border={`1px solid ${pageColors.borderSoft}`}>
                        <Text textTransform="uppercase" letterSpacing="0.22em" fontSize="xs" color={pageColors.textPrimaryAccent} mb={4}>The problem</Text>
                        <Heading size="2xl" mb={5} maxW="620px">Conventional AI SOC tools optimize for speed, not depth.</Heading>
                        <VStack align="stretch" gap={4}>
                            {problemPoints.map((point) => (
                                <Box key={point} p={4} borderRadius="24px" bg={pageColors.surfaceOverlay}>
                                    <Text color={pageColors.textSoft}>{point}</Text>
                                </Box>
                            ))}
                        </VStack>
                    </Box>

                    <Box p={{ base: 6, md: 8 }} borderRadius="32px" bg={pageColors.whyBackground} border={`1px solid ${pageColors.borderMedium}`}>
                        <Text textTransform="uppercase" letterSpacing="0.22em" fontSize="xs" color={pageColors.textHighlight} mb={4}>Why ACI</Text>
                        <Heading size="2xl" mb={5} maxW="600px">ACI prioritizes thorough investigation before reaching conclusions.</Heading>
                        <VStack align="stretch" gap={4}>
                            {proofItems.map((item) => (
                                <Flex key={item} gap={4} align="start" p={4} borderRadius="24px" bg={pageColors.surfaceOverlayMuted}>
                                    <Box mt={2} w={2.5} h={2.5} borderRadius="full" bg={pageColors.textSecondaryAccent} flexShrink={0} />
                                    <Text color={pageColors.textMuted}>{item}</Text>
                                </Flex>
                            ))}
                        </VStack>
                    </Box>
                </SimpleGrid>
            </Box>

            <Box id="features" px={{ base: 5, md: 10 }} py={{ base: 14, md: 18 }} bg={pageColors.sectionTint}>
                <Text textTransform="uppercase" letterSpacing="0.22em" fontSize="xs" color={pageColors.textPrimaryAccent} mb={4}>Capabilities</Text>
                <Flex justify="space-between" gap={6} align={{ base: "start", lg: "end" }} direction={{ base: "column", lg: "row" }} mb={8}>
                    <Heading size="3xl" maxW="780px">What ACI Can Do</Heading>
                </Flex>

                <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
                    {featureCards.map((card) => (
                        <Box key={card.title} p={{ base: 6, md: 7 }} borderRadius="32px" bg={pageColors.backgroundSection} border={`1px solid ${pageColors.borderSoft}`}>
                            <Text textTransform="uppercase" letterSpacing="0.18em" fontSize="xs" color={pageColors.textPrimaryAccent} mb={4}>{card.eyebrow}</Text>
                            <Heading size="xl" mb={4}>{card.title}</Heading>
                            <Text color={pageColors.textTertiary}>{card.description}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            <Box px={{ base: 5, md: 10 }} py={{ base: 14, md: 18 }}>
                <Box p={{ base: 6, md: 8 }} borderRadius="32px" bg={pageColors.backgroundSection} border={`1px solid ${pageColors.borderSoft}`}>
                    <Text textTransform="uppercase" letterSpacing="0.22em" fontSize="xs" color={pageColors.textPrimaryAccent} mb={4}>Workflow</Text>
                    <Heading size="2xl" mb={6}>How ACI works</Heading>
                    <Grid templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }} gap={8} alignItems="start">
                        <VStack align="stretch" gap={4}>
                            {workflowSteps.map((step, index) => (
                                <Flex key={step} gap={4} align="start">
                                    <Flex align="center" justify="center" minW={10} h={10} borderRadius="full" bg={pageColors.stepBadge} color={pageColors.textPrimaryAccent} fontWeight="700">
                                        0{index + 1}
                                    </Flex>
                                    <Box pt={2}>
                                        <Text color={pageColors.textSoft}>{step}</Text>
                                    </Box>
                                </Flex>
                            ))}
                        </VStack>

                        <SimpleGrid columns={{ base: 1, md: 2, lg: 1 }} gap={4}>
                            <Box borderRadius="24px" overflow="hidden" bg={pageColors.surfaceOverlay}>
                                <Image src="/assets/images/example_investigation.png" alt="Example investigation page" />
                            </Box>
                        </SimpleGrid>
                    </Grid>
                </Box>
            </Box>
            </Box>
            <Footer />
        </Box>
    )
}
