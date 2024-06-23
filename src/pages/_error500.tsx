import { useNavigate } from "react-router-dom"
import { FallbackProps } from "react-error-boundary"
import styled from "styled-components"
import Common from "@/components/layout/Common"
import Button from "@/components/general/Button"

interface PageProps extends FallbackProps, React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const { resetErrorBoundary } = props

  const navigate = useNavigate()

  return (
    <PageContainer asTag="main">
      <Common.Error
        coreEl={(props: Record<string, unknown>) => <h1 {...props}>잠시후 다시 시도해주세요</h1>}
        detailEl={(props: Record<string, unknown>) => (
          <p {...props}>
            {`요청을 처리하는 동안 문제가 발생했습니다.\n잠시 후 다시 시도하시거나\n페이지를 새로고침해 주세요.`}
          </p>
        )}
        actionEl={(props: Record<string, unknown>) => (
          <div {...props}>
            <Button type="button" variants="secondary" isActive={true} onClick={() => resetErrorBoundary()}>
              다시시도
            </Button>
            <Button type="button" variants="secondary" isActive={true} onClick={() => navigate(0)}>
              새로고침
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
