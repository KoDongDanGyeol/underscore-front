import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type MapPageProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const MapPage = <C extends React.ElementType = "main">(props: MapPageProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <MapPageContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </MapPageContainer>
  )
}

const MapPageContainer = styled.main`
  /*  */
`

export default forwardRef(MapPage)
