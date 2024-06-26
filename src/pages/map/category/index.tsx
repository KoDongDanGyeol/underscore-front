import styled from "styled-components"
import Map from "@/components/layout/Map"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  return <PageContainer asTag="main">Map Category Index</PageContainer>
}

const PageContainer = styled(Map.Page)`
  /*  */
`

export default Page
