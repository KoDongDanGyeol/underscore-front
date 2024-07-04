import styled from "styled-components"
import Policy from "@/components/layout/Policy"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  return <PageContainer asTag="main">Policy Service</PageContainer>
}

const PageContainer = styled(Policy.Page)`
  /*  */
`

export default Page
