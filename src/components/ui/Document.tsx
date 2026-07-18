
import { Box, Heading, Link, Separator, Text, Table, List } from "@chakra-ui/react";
import { landingPageColors as pageColors } from "@/themes/landingPageColors"
import { Mermaid } from "@/components/ui/Mermaid"
import { Highlight, themes } from "prism-react-renderer"
import Markdown, { Components } from "react-markdown";
import { useEffect, useState } from "react";
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

// Offsets an anchored heading below the fixed navbar so scrollIntoView doesn't hide it underneath.
const ANCHOR_SCROLL_MARGIN = "100px";

export const Document = ({ documentPath }: { documentPath: string }) => {
    const [blogContent, setBlogContent] = useState<string>("");

    const components = {
        h1: ({ id, children }: { id?: string; children: React.ReactNode }) => (
            <Heading id={id} scrollMarginTop={ANCHOR_SCROLL_MARGIN} fontSize="3xl" fontWeight="bold" mt={8} mb={8}>
                {children}
            </Heading>
        ),
        h2: ({ id, children }: { id?: string; children: React.ReactNode }) => (
            <Heading id={id} scrollMarginTop={ANCHOR_SCROLL_MARGIN} fontSize="2xl" fontWeight="bold" mt={6} mb={6}>
                {children}
            </Heading>
        ),
        h3: ({ id, children }: { id?: string; children: React.ReactNode }) => (
            <Heading id={id} scrollMarginTop={ANCHOR_SCROLL_MARGIN} fontSize="xl" fontWeight="bold" mt={4} mb={4}>
                {children}
            </Heading>
        ),
        h4: ({ id, children }: { id?: string; children: React.ReactNode }) => (
            <Heading id={id} scrollMarginTop={ANCHOR_SCROLL_MARGIN} fontSize="large" fontWeight="bold" mt={2} mb={2}>
                {children}
            </Heading>
        ),
        h5: ({ id, children }: { id?: string; children: React.ReactNode }) => (
            <Heading id={id} scrollMarginTop={ANCHOR_SCROLL_MARGIN} fontSize="medium" fontWeight="bold" mt={1} mb={1}>
                {children}
            </Heading>
        ),
        p: ({ children }: { children: React.ReactNode }) => (
            <Text mt={1} mb={2}>
                {children}
            </Text>
        ),
        a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
            <Link href={href} target="_blank" color="blue.500">
                {children}
            </Link>
        ),
        hr: () => <Separator mt={4} mb={4} />,

        code: ({
            className,
            children,
        }: {
            className?: string;
            children: React.ReactNode;
        }) => {
            const language = className?.replace("language-", "") || "";

            if (language === "mermaid") {
                return <Mermaid chart={String(children).trim()} />;
            }

            if (language) {
                return (
                    <Highlight
                        code={String(children).trim()}
                        language={language as any}
                        theme={themes.palenight}
                    >
                        {({ tokens, getLineProps, getTokenProps }) => (
                            <Box
                                as="pre"
                                p={4}
                                mb={4}
                                borderRadius="md"
                                overflowX="auto"
                                bg={pageColors.backgroundSection}
                                color={pageColors.text}
                                border={`1px solid ${pageColors.borderSoft}`}
                            >
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                        ))}
                                    </div>
                                ))}
                            </Box>
                        )}
                    </Highlight>
                );
            }

            return (
                <Box
                    as="code"
                    px={1.5}
                    py={0.5}
                    borderRadius="4px"
                    bg={pageColors.backgroundSection}
                    color={pageColors.textHighlight}
                    fontSize="0.9em"
                >
                    {children}
                </Box>
            );
        },

        pre: ({ children }: { children: any }) => <>{children}</>,

        table: ({ children }: { children: React.ReactNode }) => (
            <Table.Root mb={4} border={`1px solid ${pageColors.borderSoft}`} borderRadius="12px" overflow="hidden">{children}</Table.Root>
        ),
        thead: ({ children }: { children: React.ReactNode }) => (
            <Table.Header bg={pageColors.backgroundSection} color={pageColors.text}>{children}</Table.Header>
        ),
        tbody: ({ children }: { children: React.ReactNode }) => (
            <Table.Body>{children}</Table.Body>
        ),
        tr: ({ children }: { children: React.ReactNode }) => (
            <Table.Row bg="transparent">{children}</Table.Row>
        ),
        th: ({ children }: { children: React.ReactNode }) => (
            <Table.Cell borderColor={pageColors.borderSoft} color={pageColors.text} fontWeight="600">{children}</Table.Cell>
        ),
        td: ({ children }: { children: React.ReactNode }) => (
            <Table.Cell borderColor={pageColors.borderSoft} color={pageColors.textSoft}>{children}</Table.Cell>
        ),
        ul: ({ children }: { children: React.ReactNode }) => (
            <List.Root>{children}</List.Root>
        ),
        ol: ({ children }: { children: React.ReactNode }) => (
            <List.Root>{children}</List.Root>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <List.Item ml={4} mb={2}>{children}</List.Item>
        ),

        details: ({ id, children }: { id?: string; children: React.ReactNode }) => (
            <Box
                id={id}
                scrollMarginTop={ANCHOR_SCROLL_MARGIN}
                as="details"
                mb={4}
                borderRadius="12px"
                border={`1px solid ${pageColors.borderSoft}`}
                bg={pageColors.backgroundSection}
                px={4}
                py={2}
                css={{ "& > summary": { listStyle: "none" }, "& > summary::-webkit-details-marker": { display: "none" } }}
            >
                {children}
            </Box>
        ),
        summary: ({ children }: { children: React.ReactNode }) => (
            <Box
                as="summary"
                cursor="pointer"
                py={2}
                fontWeight="600"
                color={pageColors.textHighlight}
                _hover={{ color: pageColors.textPrimaryAccent }}
                display="flex"
                alignItems="center"
                gap={2}
                _before={{ content: '"▸"', display: "inline-block", transition: "transform 0.15s ease" }}
                css={{ "details[open] > &::before": { transform: "rotate(90deg)" } }}
            >
                {children}
            </Box>
        ),
    };


    useEffect(() => {
        fetch(documentPath)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch document");
                return response.text();
            })
            .then((text) => setBlogContent(text))
            .catch((err) => console.error(err));
    }, [documentPath]);

    // Content loads asynchronously, so the browser's own initial anchor-scroll (which
    // runs before this fetch resolves) misses the target. Scroll to it manually once
    // the heading/anchor ids exist in the DOM. Mermaid diagrams and images render in
    // afterward and can shift the layout, so re-scroll once more after they settle.
    useEffect(() => {
        if (!blogContent) return;
        const hash = window.location.hash.slice(1);
        if (!hash) return;

        const scrollToHash = () => {
            document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
        };

        scrollToHash();
        const retries = [100, 300, 600, 1000].map((delay) => setTimeout(scrollToHash, delay));
        return () => retries.forEach(clearTimeout);
    }, [blogContent]);

    return (
        <Box>
            <Markdown components={components as Components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug]}>
                {blogContent}
            </Markdown>
        </Box>
    );

};
