import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type AuthPageProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const AuthPage = <C extends React.ElementType = "main">(props: AuthPageProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <AuthPageContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </AuthPageContainer>
  )
}

const AuthPageContainer = styled.main`
  margin-top: 32px;
`

export default forwardRef(AuthPage)
