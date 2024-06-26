import RecoilProvider from "@/providers/RecoilProvider"
import QueryProvider from "@/providers/QueryProvider"
import StyledProvider from "@/providers/StyledProvider"
import LayoutProvider from "@/providers/LayoutProvider"
import BottomSheetProvider from "@/providers/BottomSheetProvider"
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
          <LayoutProvider>
            {children}
            <BottomSheetProvider />
          </LayoutProvider>
        </StyledProvider>
      </QueryProvider>
    </RecoilProvider>
  )
}

export default Layout
