import styled from "styled-components"
import { useForm } from "react-hook-form"
import useMount from "@/hooks/useMount"
import useMutationLogout from "@/queries/auth/useMutationLogout"
import Auth from "@/components/layout/Auth"
import Join, { TypeJoin } from "@/components/form/Join"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  const join = useForm<TypeJoin>({
    defaultValues: {
      authorization: undefined,
    },
  })

  const { postLogoutAsync, postLogoutStatus } = useMutationLogout()
  const {} = useMount(() => {
    ;(async () => {
      await postLogoutAsync({})
    })()
  }, [])

  const onSubmit = (data: TypeJoin) => {
    window.location.href = `https://api.underscore.or.kr/oauth2/authorization/${data.authorization}`
  }

  return (
    <PageContainer asTag="main">
      <Auth.Headline
        coreEl={(props) => <h2 {...props}>Join</h2>}
        detailEl={(props) => <p {...props}>{`자주 사용하시는 아이디로 간편하게\nUNDERSCORE 서비스를 이용해보세요`}</p>}
      />
      <PageForm data={join} onValid={onSubmit} isLoading={!["success", "error"].includes(postLogoutStatus)} />
    </PageContainer>
  )
}

const PageForm = styled(Join)`
  &:not(:first-child) {
    margin-top: 32px;
  }
`

const PageContainer = styled(Auth.Page)`
  /*  */
`

export default Page
