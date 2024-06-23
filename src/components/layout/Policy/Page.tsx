import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type PolicyPageProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const PolicyPage = <C extends React.ElementType = "main">(props: PolicyPageProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <PolicyPageContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </PolicyPageContainer>
  )
}

const PolicyPageContainer = styled.main`
  /*  */
`

export default forwardRef(PolicyPage)
