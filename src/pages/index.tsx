import Flag from "@/components/display/Flag"


interface PublicPageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const PublicPage = (props: PublicPageProps) => {
  const {} = props

  return (
    <div>
      PublicPage
      <Flag />
    </div>
  )
}

export default PublicPage
