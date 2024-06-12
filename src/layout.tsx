import RecoilProvider from "@/providers/RecoilProvider"
import QueryProvider from "@/providers/QueryProvider"
import StyledProvider from "@/providers/StyledProvider"
import LayoutProvider from "@/providers/LayoutProvider"
import "@/styles/reset.css"

interface LayoutProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  //
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <RecoilProvider flag={false}>
      <QueryProvider>
        <StyledProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </StyledProvider>
      </QueryProvider>
    </RecoilProvider>
  )
}

export default Layout
