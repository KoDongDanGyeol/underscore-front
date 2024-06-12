import Flag from "@/components/display/Flag"
import Theme from "@/components/display/Theme"

interface PublicPageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const PublicPage = (props: PublicPageProps) => {
  const {} = props

  return (
    <div>
      PublicPage
      <Flag />
      <Theme />
    </div>
  )
}

export default PublicPage
