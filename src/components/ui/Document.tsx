
import { Box, Heading, Link, Separator, Text, Table, List } from "@chakra-ui/react";
import { Highlight, themes } from "prism-react-renderer"
import Markdown, { Components } from "react-markdown";
import { useEffect, useState } from "react";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export const Document = ({ documentPath }: { documentPath: string }) => {
    const [blogContent, setBlogContent] = useState<string>("");

    const components = {
        h1: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="3xl" fontWeight="bold" mt={8} mb={8}>
                {children}
            </Heading>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="2xl" fontWeight="bold" mt={6} mb={6}>
                {children}
            </Heading>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="xl" fontWeight="bold" mt={4} mb={4}>
                {children}
            </Heading>
        ),
        h4: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="large" fontWeight="bold" mt={2} mb={2}>
                {children}
            </Heading>
        ),
        h5: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="medium" fontWeight="bold" mt={1} mb={1}>
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

            if (language) {
                return (
                    <Highlight
                        code={String(children).trim()}
                        language={language as any}
                        theme={themes.palenight}
                    >
                        {({ style, tokens, getLineProps, getTokenProps }) => (
                            <Box
                                as="pre"
                                p={4}
                                mb={4}
                                borderRadius="md"
                                overflowX="auto"
                                bg="gray.800"
                                color="white"
                                style={style}
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
                <Highlight
                    code={String(children).trim()}
                    language={"text"}
                    theme={themes.palenight}
                >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre style={{ ...style, display: "inline-block", borderRadius: 4, paddingLeft: 4, paddingRight: 4 }}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            );
        },

        pre: ({ children }: { children: any }) => <>{children}</>,

        table: ({ children }: { children: React.ReactNode }) => (
            <Table.Root mb={4}>{children}</Table.Root>
        ),
        thead: ({ children }: { children: React.ReactNode }) => (
            <Table.Header bg="gray.100">{children}</Table.Header>
        ),
        tbody: ({ children }: { children: React.ReactNode }) => (
            <Table.Body>{children}</Table.Body>
        ),
        tr: ({ children }: { children: React.ReactNode }) => (
            <Table.Row>{children}</Table.Row>
        ),
        th: ({ children }: { children: React.ReactNode }) => (
            <Table.Cell>{children}</Table.Cell>
        ),
        td: ({ children }: { children: React.ReactNode }) => (
            <Table.Cell>{children}</Table.Cell>
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

    return (
        <Box mx={{ base: 8, md: 32 }} my={8}>
            <Markdown components={components as Components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {blogContent}
            </Markdown>
        </Box>
    );

};
