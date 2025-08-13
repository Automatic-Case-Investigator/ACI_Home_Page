import { Document } from "@/components/ui/Document";
import { Navbar } from "@/components/ui/Navbar";
import visible_documents from "@/data/visible_documents.json"
import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DocumentPage = () => {
    const { documentId } = useParams();
    const [documentPath, setDocumentPath] = useState<string>("");

    useEffect(() => {
        if (documentId) {
            const path = visible_documents[documentId as keyof typeof visible_documents]["path"];
            if (typeof path === "string") {
                setDocumentPath(path);
            } else {
                console.warn(`Document with ID ${documentId} not found`);
            }
        }
    }, [documentId]);

    return <>
        <Navbar />
        <Box mt={40}>
            {
                documentPath.length > 0 ? (
                    <Document documentPath={documentPath} />
                ) : (
                    <Heading>Document not found</Heading>
                )
            }
        </Box>
    </>
}