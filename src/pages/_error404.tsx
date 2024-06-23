import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Common from "@/components/layout/Common"
import Button from "@/components/general/Button"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  const navigate = useNavigate()

  return (
    <PageContainer asTag="main">
      <Common.Error
        coreEl={(props: Record<string, unknown>) => <h1 {...props}>다시 한번 확인해주세요</h1>}
        detailEl={(props: Record<string, unknown>) => (
          <p {...props}>
            {`지금 입력하신 주소의 페이지는\n사라졌거나 다른 페이지로 변경되었습니다.\n주소를 다시 확인해주세요.`}
          </p>
        )}
        actionEl={(props: Record<string, unknown>) => (
          <div {...props}>
            <Button type="button" variants="secondary" isActive={true} onClick={() => navigate(-1)}>
              이전 페이지
            </Button>
            <Button type="button" variants="secondary" isActive={true} onClick={() => navigate("/auth/welcome")}>
              웰컴 페이지
            </Button>
          </div>
        )}
      />
    </PageContainer>
  )
}

const PageContainer = styled(Common.Page)`
  /*  */
`

export default Page
