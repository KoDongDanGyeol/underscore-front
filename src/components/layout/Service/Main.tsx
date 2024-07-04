import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Common from "@/components/layout/Common"

export type ServiceMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const ServiceMain = <C extends React.ElementType = "div">(props: ServiceMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <ServiceMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <Common.Header />
      {children}
    </ServiceMainContainer>
  )
}

const ServiceMainContainer = styled.div`
  align-self: stretch;
  width: 100%;
  padding-top: 48px;
`

export default forwardRef(ServiceMain)
