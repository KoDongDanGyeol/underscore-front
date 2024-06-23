import styled from "styled-components"
import { useForm } from "react-hook-form"
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

  const onSubmit = (data: TypeJoin) => {
    window.location.replace(`${import.meta.env.VITE_BACKEND_API_URL}/oauth2/authorization/${data.authorization}`)
  }

  return (
    <PageContainer asTag="main">
      <Auth.Headline
        coreEl={(props: Record<string, unknown>) => <h2 {...props}>Join</h2>}
        detailEl={(props: Record<string, unknown>) => (
          <p {...props}>{`자주 사용하시는 아이디로 간편하게\nUNDERSCORE 서비스를 이용해보세요`}</p>
        )}
      />
      <PageForm data={join} onValid={onSubmit} />
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
