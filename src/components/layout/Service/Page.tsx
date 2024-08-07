import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type ServicePageProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const ServicePage = <C extends React.ElementType = "main">(props: ServicePageProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <ServicePageContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </ServicePageContainer>
  )
}

const ServicePageContainer = styled.main`
  /*  */
`

export default forwardRef(ServicePage)
