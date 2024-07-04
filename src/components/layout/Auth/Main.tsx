import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Picture from "@/components/general/Picture"
import Link from "@/components/general/Link"

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
      <AuthMainHeader className={`${className}`} {...restProps}>
        <AuthMainLogo>
          <Link to="/">
            <Picture src="/logo-vertical.svg" alt={import.meta.env.VITE_SERVICE_NAME} ratio={[339, 252]} />
          </Link>
        </AuthMainLogo>
      </AuthMainHeader>
      {children}
    </AuthMainContainer>
  )
}

const AuthMainLogo = styled.h1`
  > :is(a, div) {
    margin: 0 auto;
    display: block;
    width: 96px;
  }
`

const AuthMainHeader = styled.header`
  /*  */
`

const AuthMainContainer = styled.div`
  align-self: center;
  margin: 0 auto;
  width: 100%;
  max-width: 360px;
  padding: 20px;
`

export default forwardRef(AuthMain)
