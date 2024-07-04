import styled from "styled-components"
import Mypage from "@/components/layout/Mypage"
import Join from "@/pages/mypage/membership/change/_join"
import Leave from "@/pages/mypage/membership/change/_leave"
import Breadcrumb from "@/components/navigation/Breadcrumb"
import Link from "@/components/general/Link"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  // TODO
  const isMember = false

  return (
    <PageContainer
      asTag="main"
      breadcrumbEl={(props: Record<string, unknown>) => (
        <Breadcrumb {...props}>
          <Link to="/mypage">마이페이지</Link>
          <Link to="/mypage/profile">회원정보</Link>
          <Link to="/mypage/membership/change">맴버십 변경</Link>
        </Breadcrumb>
      )}
    >
      {isMember ? <Leave /> : <Join />}
    </PageContainer>
  )
}

const PageContainer = styled(Mypage.Page)`
  /*  */
`

export default Page
