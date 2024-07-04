import styled from "styled-components"
import Map from "@/components/layout/Map"
import Link from "@/components/general/Link"
import Button from "@/components/general/Button"
import Icon from "@/components/general/Icon"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  return (
    <PageContainer
      asTag="main"
      headlineEl={(props: Record<string, unknown>) => (
        <Map.Headline
          prefixEl={(props: Record<string, unknown>) => (
            <div {...props}>
              <Button
                asTag={Link}
                to="/map/analysis"
                shape="plain"
                size="base"
                variants="secondary"
                prefixEl={(props: Record<string, unknown>) => <Icon name="Left" label="상권분석" {...props} />}
              />
            </div>
          )}
          suffixEl={(props: Record<string, unknown>) => (
            <div {...props}>
              <Button asTag={Link} to="/map/category" shape="plain" size="sm" variants="primary">
                주변정보
              </Button>
              <Button
                type="button"
                shape="plain"
                size="base"
                variants="secondary"
                prefixEl={(props: Record<string, unknown>) => <Icon name="Search" label="검색" {...props} />}
              />
            </div>
          )}
          {...props}
        />
      )}
    >
      Map Analysis Index
    </PageContainer>
  )
}

const PageContainer = styled(Map.Page)`
  /*  */
`

export default Page
