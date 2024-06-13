import styled from "styled-components"
import { SPECIFIED_ROUTES } from "@/providers/RouterProvider"
import Link from "@/components/general/Link"
import Button from "@/components/general/Button"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  return (
    <PageContainer>
      <PageRoutes>
        {SPECIFIED_ROUTES.sort(({ path: prev }, { path: next }) => prev.localeCompare(next)).map(({ path }) => (
          <Button key={path} asTag={Link} to={path} shape="plain">
            {path}
          </Button>
        ))}
      </PageRoutes>
    </PageContainer>
  )
}

const PageRoutes = styled.section`
  display: flex;
  flex-direction: column;
`

const PageContainer = styled.div`
  /*  */
`

export default Page
