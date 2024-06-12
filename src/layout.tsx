import RecoilProvider from "@/providers/RecoilProvider"
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
      <StyledProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </StyledProvider>
    </RecoilProvider>
  )
}

export default Layout
