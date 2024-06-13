import { useParams } from "react-router-dom"
import styled from "styled-components"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

type TypeParams = {
  analysisId: string
}

const Page = (props: PageProps) => {
  const {} = props

  const { analysisId } = useParams<TypeParams>()

  return <PageContainer>Map Analysis {analysisId}</PageContainer>
}

const PageContainer = styled.div`
  /*  */
`

export default Page
