import Markdown, { Components } from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from "react";
import { Box, Heading, Link, Separator, Text, Code, Table, List } from "@chakra-ui/react";

export const Document = ({ documentPath }: { documentPath: string }) => {
    const [blogContent, setBlogContent] = useState<string>("");

    const components = {
        h1: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="3xl" fontWeight="bold" mt={8} mb={8}>{children}</Heading>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="2xl" fontWeight="bold" mt={6} mb={6}>{children}</Heading>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="xl" fontWeight="bold" mt={4} mb={4}>{children}</Heading>
        ),
        h4: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="large" fontWeight="bold" mt={2} mb={2}>{children}</Heading>
        ),
        h5: ({ children }: { children: React.ReactNode }) => (
            <Heading fontSize="medium" fontWeight="bold" mt={1} mb={1}>{children}</Heading>
        ),
        p: ({ children }: { children: React.ReactNode }) => (
            <Text mt={1} mb={2}>{children}</Text>
        ),
        a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
            <Link href={href} color="blue.500">{children}</Link>
        ),
        hr: () => <Separator mt={4} mb={4} />,
        code: ({ className, children }: { className?: string; children: React.ReactNode }) => {
            const language = className?.replace("language-", "") || "";
            return <Code bg="gray.800" fontSize="0.9rem" mb={2} lang={language}>{children}</Code>;
        },
        pre: ({ children }: { children: any }) => (
            <Box as="pre" p={4} mb={4} bg="gray.800" color="white" borderRadius="md" overflowX="auto">
                {children}
            </Box>
        ),
        table: ({ children }: { children: React.ReactNode }) => (
            <Table.Root mb={4}>
                {children}
            </Table.Root>
        ),
        thead: ({ children }: { children: React.ReactNode }) => (
            <Table.Header bg="gray.100">{children}</Table.Header>
        ),
        tbody: ({ children }: { children: React.ReactNode }) => <Table.Body>{children}</Table.Body>,
        tr: ({ children }: { children: React.ReactNode }) => <Table.Row>{children}</Table.Row>,
        th: ({ children }: { children: React.ReactNode }) => (
            <Table.Cell>{children}</Table.Cell>
        ),
        td: ({ children }: { children: React.ReactNode }) => <Table.Cell>{children}</Table.Cell>,
        ul: ({ children }: { children: React.ReactNode }) => (
            <List.Root>{children}</List.Root>
        ),
        ol: ({ children }: { children: React.ReactNode }) => (
            <List.Root>{children}</List.Root>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <List.Item>{children}</List.Item>
        ),
    };

    useEffect(() => {
        console.log(documentPath)
        fetch(documentPath)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch document");
                return response.text();
            })
            .then((text) => setBlogContent(text))
            .catch((err) => console.error(err));
    }, []);

    return <Box m={8} ml={24} mr={24}>
        <Markdown components={components as Components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {blogContent}
        </Markdown>
    </Box>
};
