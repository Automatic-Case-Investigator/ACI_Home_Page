import { Document } from "@/components/ui/Document";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import visible_documents from "@/data/visible_documents.json"
import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NoPage } from "./NoPage";

export const DocumentPage = () => {
    const { documentId } = useParams();
    const [documentPath, setDocumentPath] = useState<string>("");

    useEffect(() => {
        if (documentId) {
            if (!visible_documents[documentId as keyof typeof visible_documents]) {
                console.warn(`Document with ID ${documentId} not found`);
                return;
            }

            const path = visible_documents[documentId as keyof typeof visible_documents]["path"];
            if (typeof path === "string") {
                setDocumentPath(path);
            } else {
                console.warn(`Document with ID ${documentId} not found`);
            }
        }
    }, [documentId]);

    return <>
        {
            documentPath.length > 0 ? (
                <>
                    <Navbar />
                    <Box mt={40}>
                        <Document documentPath={documentPath} />
                    </Box>
                    <Footer />
                </>
            ) : (
                <NoPage />
            )
        }
    </>
}