import { useParams } from "react-router-dom"
import styled from "styled-components"
import Map from "@/components/layout/Map"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

type TypeParams = {
  analysisId: string
}

const Page = (props: PageProps) => {
  const {} = props

  const { analysisId } = useParams<TypeParams>()

  return <PageContainer asTag="main">Map Analysis {analysisId}</PageContainer>
}

const PageContainer = styled(Map.Page)`
  /*  */
`

export default Page
