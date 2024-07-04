import styled from "styled-components"
import Mypage from "@/components/layout/Mypage"
import Breadcrumb from "@/components/navigation/Breadcrumb"
import Link from "@/components/general/Link"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  return (
    <PageContainer
      asTag="main"
      breadcrumbEl={(props: Record<string, unknown>) => (
        <Breadcrumb {...props}>
          <Link to="/mypage">마이페이지</Link>
          <Link to="/mypage/support">지원사업</Link>
        </Breadcrumb>
      )}
    >
      Mypage Support Index
    </PageContainer>
  )
}

const PageContainer = styled(Mypage.Page)`
  /*  */
`

export default Page
