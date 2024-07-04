import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import useMount from "@/hooks/useMount"
import useMutationLogout from "@/queries/auth/useMutationLogout"
import { getRoute } from "@/providers/RouterProvider"
import Common from "@/components/layout/Common"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  const navigate = useNavigate()
  const { postLogoutAsync } = useMutationLogout({
    onSuccess: () => navigate("/"),
    onError: () => navigate("/"),
  })

  const {} = useMount(() => {
    ;(async () => {
      const route = getRoute("/")
      await route?.onPreload()
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
