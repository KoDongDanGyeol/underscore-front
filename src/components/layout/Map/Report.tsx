import { forwardRef } from "react"
import styled, { css } from "styled-components"
import useMount from "@/hooks/useMount"
import { PolymorphicRef, PolymorphicComponentPropWithRef } from "@/types/polymorphic"

export type MapReportProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const MapReport = <C extends React.ElementType = "label">(props: MapReportProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  const { mountStructure } = useMount()

  return (
    <MapReportContainer ref={ref} as={asTag} $isMounted={mountStructure.isMounted} {...restProps}>
      {children}
    </MapReportContainer>
  )
}

type StyledMapReport = {
  $isMounted: boolean
}

const MapReportContainer = styled.div<StyledMapReport>`
  transition: opacity 200ms;
  ${(props) => {
    switch (props.$isMounted) {
      case true:
        return css`
          opacity: 1;
        `
      case false:
      default:
        return css`
          opacity: 0;
        `
    }
  }}
`

export default forwardRef(MapReport)
