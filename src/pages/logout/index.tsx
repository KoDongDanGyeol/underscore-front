import styled from "styled-components"
import useMount from "@/hooks/useMount"
import useMutationLogout from "@/queries/auth/useMutationLogout"
import { onLogout } from "@/businesses/common"
import Common from "@/components/layout/Common"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  const { postLogoutAsync } = useMutationLogout({
    onFinish: onLogout,
  })

  const {} = useMount(() => {
    ;(async () => {
      await postLogoutAsync({})
    })()
  }, [])

  return (
    <PageContainer asTag="main">
      <></>
    </PageContainer>
  )
}

const PageContainer = styled(Common.Page)`
  /*  */
`

export default Page
