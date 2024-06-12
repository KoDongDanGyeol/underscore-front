import RecoilProvider from "@/providers/RecoilProvider"


interface LayoutProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  //
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return  <RecoilProvider flag={false}>{children}</RecoilProvider>
}

export default Layout
