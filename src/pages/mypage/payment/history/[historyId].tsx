import { useParams } from "react-router-dom"
import styled from "styled-components"
import Mypage from "@/components/layout/Mypage"
import Breadcrumb from "@/components/navigation/Breadcrumb"
import Link from "@/components/general/Link"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

type TypeParams = {
  historyId: string
}

const Page = (props: PageProps) => {
  const {} = props

  const { historyId } = useParams<TypeParams>()

  return (
    <PageContainer
      asTag="main"
      breadcrumbEl={(props: Record<string, unknown>) => (
        <Breadcrumb {...props}>
          <Link to="/mypage">마이페이지</Link>
          <Link to="/mypage/profile">회원정보</Link>
          <Link to="/mypage/payment/history">결제내역</Link>
          <Link to={`mypage/payment/history/${historyId}`}>{historyId}</Link>
        </Breadcrumb>
      )}
    >
      Mypage Payment History {historyId}
    </PageContainer>
  )
}

const PageContainer = styled(Mypage.Page)`
  /*  */
`

export default Page
