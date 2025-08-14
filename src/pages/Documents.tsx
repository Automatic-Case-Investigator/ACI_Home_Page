import visible_documents from "@/data/visible_documents.json"
import { Navbar } from "@/components/ui/Navbar"
import { Box, Heading } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Footer } from "@/components/ui/Footer"

export const Documents = () => {
    return <Box>
        <Navbar />
        <Box m={8} mt={20}>
            <Heading>Available documents</Heading>
            {
                Object.entries(visible_documents).map((value) => <Link to={`/documents/${value[0]}`}>{value[1]["title"]}</Link>)
            }
        </Box>
        <Footer />
    </Box>
}