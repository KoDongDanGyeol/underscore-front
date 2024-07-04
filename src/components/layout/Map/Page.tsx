import { Fragment, forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Common from "@/components/layout/Common"

export type MapPageProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    headlineEl?: React.ElementType
  }
>

const MapPage = <C extends React.ElementType = "main">(props: MapPageProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, headlineEl: HeadlineEl = null, className = "", children, ...restProps } = props

  return (
    <Fragment>
      {HeadlineEl && <MapPageHeadline as={HeadlineEl} />}
      <MapPageContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
        {children}
      </MapPageContainer>
      <MapPageFooter />
    </Fragment>
  )
}

const MapPageHeadline = styled.header`
  /*  */
`

const MapPageFooter = styled(Common.Footer)`
  margin-top: 12px;
`

const MapPageContainer = styled.main`
  /*  */
`

export default forwardRef(MapPage)
