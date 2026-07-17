import { landingPageColors as pageColors } from "@/themes/landingPageColors"
import { Box, Text } from "@chakra-ui/react"
import mermaid from "mermaid"
import { useEffect, useId, useState } from "react"

mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: {
        background: pageColors.backgroundSection,
        primaryColor: pageColors.backgroundSectionAlt,
        primaryTextColor: pageColors.text,
        primaryBorderColor: pageColors.borderStrong,
        lineColor: pageColors.textQuaternary,
        secondaryColor: pageColors.surfaceOverlay,
        tertiaryColor: pageColors.backgroundDeep,
        fontFamily: "'IBM Plex Sans', sans-serif",
        textColor: pageColors.text,
        nodeTextColor: pageColors.text,
        edgeLabelBackground: pageColors.backgroundSection,
        clusterBkg: pageColors.backgroundSectionAlt,
        clusterBorder: pageColors.borderStrong,
    },
    securityLevel: "strict",
})

export const Mermaid = ({ chart }: { chart: string }) => {
    const id = useId().replace(/:/g, "")
    const [svg, setSvg] = useState<string>("")
    const [error, setError] = useState<string>("")

    useEffect(() => {
        let cancelled = false

        mermaid
            .render(`mermaid-${id}`, chart)
            .then(({ svg }) => {
                if (!cancelled) setSvg(svg)
            })
            .catch((err) => {
                if (!cancelled) setError(err instanceof Error ? err.message : String(err))
            })

        return () => {
            cancelled = true
        }
    }, [chart, id])

    if (error) {
        return (
            <Box
                p={4}
                mb={4}
                borderRadius="md"
                bg={pageColors.backgroundSection}
                border={`1px solid ${pageColors.borderSoft}`}
            >
                <Text color={pageColors.textQuaternary} fontSize="sm">Failed to render diagram: {error}</Text>
            </Box>
        )
    }

    return (
        <Box
            p={4}
            mb={4}
            borderRadius="md"
            overflowX="auto"
            bg={pageColors.backgroundSection}
            border={`1px solid ${pageColors.borderSoft}`}
            display="flex"
            justifyContent="center"
            dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
        />
    )
}
