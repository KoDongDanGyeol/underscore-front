import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type AuthMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const AuthMain = <C extends React.ElementType = "main">(props: AuthMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <AuthMainContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </AuthMainContainer>
  )
}

const AuthMainContainer = styled.main`
  /*  */
`

export default forwardRef(AuthMain)
