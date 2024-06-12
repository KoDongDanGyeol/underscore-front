interface LayoutProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  //
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return <div>{children}</div>
}

export default Layout
