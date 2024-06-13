import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type MapMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const MapMain = <C extends React.ElementType = "main">(props: MapMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <MapMainContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </MapMainContainer>
  )
}

const MapMainContainer = styled.main`
  /*  */
`

export default forwardRef(MapMain)
