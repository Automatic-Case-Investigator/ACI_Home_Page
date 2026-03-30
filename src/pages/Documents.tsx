import visible_documents from "@/data/visible_documents.json"
import { Navbar } from "@/components/ui/Navbar"
import { Box, Heading } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { Link } from "@chakra-ui/react"
import { Footer } from "@/components/ui/Footer"

export const Documents = () => {
    return <Box>
        <Navbar />
        <Box m={8} mt={20}>
            <Heading>Available documents</Heading>
            {
                Object.entries(visible_documents).map((value) => <><RouterLink to={`/documents/${value[0]}`}><Link>{value[1]["title"]}</Link></RouterLink><br /></>)
            }
        </Box>
        <Footer />
    </Box>
}