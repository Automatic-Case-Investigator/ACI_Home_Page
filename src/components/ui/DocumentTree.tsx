import { landingPageColors as pageColors } from "@/themes/landingPageColors"
import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RxChevronRight, RxFileText } from "react-icons/rx"
import { FaRegFolder } from "react-icons/fa"

export interface DocEntry {
    title: string;
    path: string;
}

export interface ImmediateChild {
    key: string;
    label: string;
    isFolder: boolean;
}

interface DocNode {
    value: string;
    label: string;
    children?: DocNode[];
}

export const formatSegment = (segment: string) =>
    segment
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

/** Immediate children of `prefix` (e.g. "" for the root, or "architecture/" for a folder). */
export const getImmediateChildren = (docs: Record<string, DocEntry>, prefix: string): ImmediateChild[] => {
    const seen = new Map<string, ImmediateChild>()

    Object.entries(docs).forEach(([key, doc]) => {
        if (!key.startsWith(prefix)) return
        const rest = key.slice(prefix.length)
        const [first, ...restParts] = rest.split("/")
        const isFolder = restParts.length > 0

        if (!seen.has(first)) {
            seen.set(first, {
                key: `${prefix}${first}`,
                label: isFolder ? formatSegment(first) : doc.title,
                isFolder,
            })
        }
    })

    return Array.from(seen.values())
}

const buildDocumentTree = (docs: Record<string, DocEntry>): DocNode => {
    const root: DocNode = { value: "ROOT", label: "", children: [] }

    Object.entries(docs).forEach(([key, doc]) => {
        const parts = key.split("/")
        let current = root

        parts.forEach((part, index) => {
            const value = parts.slice(0, index + 1).join("/")
            const isLeaf = index === parts.length - 1
            let child = current.children?.find((node) => node.value === value)

            if (!child) {
                child = {
                    value,
                    label: isLeaf ? doc.title : formatSegment(part),
                    children: isLeaf ? undefined : [],
                }
                current.children = current.children ?? []
                current.children.push(child)
            }

            current = child
        })
    })

    return root
}

const ancestorsOf = (path?: string): string[] => {
    if (!path) return []
    const parts = path.split("/")
    const chain: string[] = []
    for (let i = 1; i <= parts.length; i++) {
        chain.push(parts.slice(0, i).join("/"))
    }
    return chain
}

export const DocumentTree = ({
    docs,
    basePath = "/documents",
    activeValue,
    expandValue,
}: {
    docs: Record<string, DocEntry>;
    basePath?: string;
    /** Full key of the doc currently open, if any — highlights it in the tree. */
    activeValue?: string;
    /** Full key/prefix to reveal on first render (defaults to activeValue). */
    expandValue?: string;
}) => {
    const navigate = useNavigate()

    const collection = useMemo(
        () =>
            createTreeCollection<DocNode>({
                rootNode: buildDocumentTree(docs),
                nodeToValue: (node) => node.value,
                nodeToString: (node) => node.label,
                nodeToChildren: (node) => node.children,
            }),
        [docs]
    )

    const revealTarget = expandValue ?? activeValue
    const [expandedValue, setExpandedValue] = useState<string[]>(() => ancestorsOf(revealTarget))

    // Reveal the active/expand target's ancestor chain whenever navigation changes it,
    // without collapsing branches the user already opened manually.
    useEffect(() => {
        const required = ancestorsOf(revealTarget)
        setExpandedValue((prev) => Array.from(new Set([...prev, ...required])))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revealTarget])

    return (
        <TreeView.Root
            collection={collection}
            selectionMode="single"
            selectedValue={activeValue ? [activeValue] : []}
            expandedValue={expandedValue}
            onExpandedChange={(details) => setExpandedValue(details.expandedValue)}
            onSelectionChange={(details) => {
                const node = details.selectedNodes[0]
                if (node && !node.children) {
                    navigate(`${basePath}/${node.value}`)
                }
            }}
        >
            <TreeView.Tree>
                <TreeView.Node
                    render={({ node, nodeState }) =>
                        nodeState.isBranch ? (
                            <TreeView.BranchControl cursor="pointer" _hover={{ bg: pageColors.surfaceHover }}>
                                <TreeView.BranchIndicator>
                                    <RxChevronRight />
                                </TreeView.BranchIndicator>
                                <FaRegFolder />
                                <TreeView.BranchText>{node.label}</TreeView.BranchText>
                            </TreeView.BranchControl>
                        ) : (
                            <TreeView.Item
                                cursor="pointer"
                                bg={nodeState.selected ? pageColors.surfaceHover : undefined}
                                color={nodeState.selected ? pageColors.textPrimaryAccent : undefined}
                                _hover={{ bg: pageColors.surfaceHover }}
                            >
                                <RxFileText />
                                <TreeView.ItemText>{node.label}</TreeView.ItemText>
                            </TreeView.Item>
                        )
                    }
                />
            </TreeView.Tree>
        </TreeView.Root>
    )
}
