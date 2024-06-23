import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Common from "@/components/layout/Common"

export type PolicyMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const PolicyMain = <C extends React.ElementType = "div">(props: PolicyMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <PolicyMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <Common.Header />
      {children}
    </PolicyMainContainer>
  )
}

const PolicyMainContainer = styled.div`
  align-self: stretch;
  width: 100%;
  padding-top: 48px;
`

export default forwardRef(PolicyMain)
