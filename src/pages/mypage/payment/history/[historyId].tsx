import { useParams } from "react-router-dom"
import styled from "styled-components"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

type TypeParams = {
  historyId: string
}

const Page = (props: PageProps) => {
  const {} = props

  const { historyId } = useParams<TypeParams>()

  return <PageContainer>Mypage Payment History {historyId}</PageContainer>
}

const PageContainer = styled.div`
  /*  */
`

export default Page
