import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Common from "@/components/layout/Common"

export type MapMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const MapMain = <C extends React.ElementType = "div">(props: MapMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <MapMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <Common.Header />
      {children}
    </MapMainContainer>
  )
}

const MapMainContainer = styled.div`
  align-self: stretch;
  width: 100%;
  padding-top: 48px;
`

export default forwardRef(MapMain)
