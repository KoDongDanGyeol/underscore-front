import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Auth from "@/components/layout/Auth"

export type AuthMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const AuthMain = <C extends React.ElementType = "div">(props: AuthMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <AuthMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <Auth.Header />
      {children}
      <Auth.Footer />
    </AuthMainContainer>
  )
}

const AuthMainContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 360px;
  padding: 20px;
`

export default forwardRef(AuthMain)
