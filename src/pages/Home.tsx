import { Box, Button, Flex, Grid, GridItem, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { landingPageColors as pageColors } from "@/themes/landingPageColors"

const problemPoints = [
    "One attacker can trigger a major incident, but response still scales with analyst hours.",
    "SOC teams spend significant time reviewing noisy logs before they reach a meaningful lead.",
    "Incident quality depends on whether the assigned analyst has the right specialization at the right time.",
]

const featureCards = [
    {
        eyebrow: "Plan generation",
        title: "Turn case context into an investigation procedure",
        description:
            "ACI ingests case details and produces structured investigation tasks so analysts do not start from a blank page during triage.",
    },
    {
        eyebrow: "Autonomous investigation",
        title: "Generate SIEM queries, run them, and evaluate IoCs iteratively",
        description:
            "The system loops through query generation, retrieval, and evidence assessment to surface the logs that matter faster than manual pivoting.",
    },
    {
        eyebrow: "Correlation intelligence",
        title: "Use LLM reasoning to connect investigation context and evidence",
        description:
            "Language models handle planning, query generation, and iterative evidence assessment so analysts can follow correlated findings across security events.",
    },
]

const workflowSteps = [
    "Ingest security case information from the incident workflow.",
    "Generate investigation objectives and concrete analysis tasks.",
    "Produce SIEM queries and collect matching telemetry.",
    "Evaluate candidate IoCs and correlate evidence across events.",
    "Return a traceable investigation trail for the human analyst.",
]

const proofItems = [
    "Reduce investigation setup time by turning case context into an actionable plan.",
    "Minimize manual log triage by automatically hunting for pertinent evidence in SIEM.",
    "Act as a persistent SOC knowledge layer that helps prevent missed evidence.",
]

export const Home = () => {
    return (
        <Box bg={pageColors.background} color={pageColors.text} overflow="hidden">
            <Navbar />
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
                                    Empowering security investigations with AI
                                </Heading>

                                <Text fontSize={{ base: "lg", md: "xl" }} color={pageColors.textSecondary} maxW="700px">
                                    Automatic Case Investigator (ACI) is an AI SOC analyst platform targeted at SIEMs. It ingests security cases, generates investigation plans, executes iterative SIEM investigations, and produces evidence-driven incident response reports.
                                </Text>

                                <HStack gap={4} flexWrap="wrap">
                                    <Button asChild size="lg" bg={pageColors.cta} color={pageColors.background} _hover={{ bg: pageColors.ctaHover }}>
                                        <a href="#features">Explore capabilities</a>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" borderColor={pageColors.borderButton} color={pageColors.text} _hover={{ bg: pageColors.surfaceHover }}>
                                        <a href="/documents/get_started">Read documentation</a>
                                    </Button>
                                </HStack>

                                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} w="100%" pt={4}>
                                    <Box p={5} borderRadius="2xl" bg={pageColors.surfaceGlass} border={`1px solid ${pageColors.borderPrimaryAccent}`}>
                                        <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.18em" color={pageColors.textPrimaryAccent} mb={2}>Deployment</Text>
                                        <Text fontSize="lg" fontWeight="600">On-premise by design</Text>
                                        <Text color={pageColors.textQuaternary}>Keep sensitive investigation data within your own environment.</Text>
                                    </Box>
                                    <Box p={5} borderRadius="2xl" bg={pageColors.surfaceGlass} border={`1px solid ${pageColors.borderSecondaryAccent}`}>
                                        <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.18em" color={pageColors.textSecondaryAccent} mb={2}>Core outcome</Text>
                                        <Text fontSize="lg" fontWeight="600">Lower analyst effort</Text>
                                        <Text color={pageColors.textQuaternary}>Reduce manual triage and repeated SIEM pivoting across cases.</Text>
                                    </Box>
                                    <Box p={5} borderRadius="2xl" bg={pageColors.surfaceGlass} border={`1px solid ${pageColors.borderLight}`}>
                                        <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.18em" color={pageColors.textHighlight} mb={2}>Model stack</Text>
                                        <Text fontSize="lg" fontWeight="600">LLM-driven investigation</Text>
                                        <Text color={pageColors.textQuaternary}>Reason over case context, generate SIEM queries, and evaluate evidence iteratively.</Text>
                                    </Box>
                                </SimpleGrid>
                            </VStack>
                        </GridItem>

                        <GridItem>
                            <Box position="relative" maxW="640px" mx="auto">
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
                                    borderRadius="32px"
                                    overflow="hidden"
                                    border={`1px solid ${pageColors.borderStrong}`}
                                    bg={pageColors.heroPanelBackground}
                                    boxShadow={pageColors.heroShadow}
                                >
                                    <Box px={6} py={5} borderBottom={`1px solid ${pageColors.borderMedium}`}>
                                        <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.24em" color={pageColors.textPrimaryAccent} mb={2}>Investigation loop</Text>
                                        <Heading size="lg">From case intake to evidence-backed findings</Heading>
                                    </Box>
                                    <Box p={4}>
                                        <Image src="/assets/images/cases.png" alt="Security case overview" borderRadius="24px" />
                                    </Box>
                                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} p={4} pt={0}>
                                        <Box p={4} borderRadius="24px" bg={pageColors.surfaceOverlay}>
                                            <Text fontSize="sm" color={pageColors.textPrimaryAccent} mb={2}>Case understanding</Text>
                                            <Text color={pageColors.textTertiary}>
                                                Extract goals, entities, and likely investigation paths from incoming alert context.
                                            </Text>
                                        </Box>
                                        <Box p={4} borderRadius="24px" bg={pageColors.surfaceOverlay}>
                                            <Text fontSize="sm" color={pageColors.textSecondaryAccent} mb={2}>Evidence correlation</Text>
                                            <Text color={pageColors.textTertiary}>
                                                Iterate through SIEM search results and rank suspicious leads for analyst review.
                                            </Text>
                                        </Box>
                                    </SimpleGrid>
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
                        <Heading size="2xl" mb={5} maxW="620px">SOC investigations are still bottlenecked by human attention.</Heading>
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
                        <Heading size="2xl" mb={5} maxW="600px">A system that investigates with your analysts instead of just assisting them.</Heading>
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
                    <Heading size="3xl" maxW="780px">Designed for investigation generation, autonomous SIEM exploration, and evidence correlation.</Heading>
                    <Text maxW="520px" color={pageColors.textTertiary}>
                        The platform focuses on the repetitive and cognitively expensive parts of incident investigation so analysts can spend more time validating conclusions and deciding response.
                    </Text>
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
                    <Heading size="2xl" mb={6}>How the investigation loop works</Heading>
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
                                <Image src="/assets/images/ACI_rev_shell_found.png" alt="Adding a SIEM integration" />
                            </Box>
                        </SimpleGrid>
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}
