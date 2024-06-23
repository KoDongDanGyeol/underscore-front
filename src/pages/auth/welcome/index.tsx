import styled from "styled-components"
import useFetchUser from "@/queries/auth/useFetchUser"
import Auth from "@/components/layout/Auth"
import Link from "@/components/general/Link"
import Button from "@/components/general/Button"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  // TODO
  const fetchUser = useFetchUser(0, {})
  console.log("fetchUser", fetchUser)

  return (
    <PageContainer asTag="main">
      <Auth.Headline
        coreEl={(props: Record<string, unknown>) => <h2 {...props}>Welcome</h2>}
        detailEl={(props: Record<string, unknown>) => <p {...props}>{`UNDERSCORE에 오신 것을 환영합니다`}</p>}
      />
      <PageDirectLink>
        <Button as={Link} to="/map" variants="primary">
          지도페이지 바로가기
        </Button>
        <Button as={Link} to="/mypage" variants="secondary">
          마이페이지 바로가기
        </Button>
      </PageDirectLink>
    </PageContainer>
  )
}

const PageDirectLink = styled.div`
  &:not(:first-child) {
    margin-top: 32px;
  }
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const PageContainer = styled(Auth.Page)`
  /*  */
`

export default Page
