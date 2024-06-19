import styled from "styled-components"
import Picture from "@/components/general/Picture"

export interface AuthHeaderProps extends React.HTMLAttributes<HTMLElement> {
  //
}

const AuthHeader = (props: AuthHeaderProps) => {
  const { className = "", ...restProps } = props

  return (
    <AuthHeaderContainer className={`${className}`} {...restProps}>
      <AuthHeaderLogo>
        <Picture src="/logo-vertical.svg" alt="logo" ratio={[339, 252]} />
      </AuthHeaderLogo>
    </AuthHeaderContainer>
  )
}

const AuthHeaderLogo = styled.h1`
  margin: 0 auto;
  display: block;
  width: 96px;
`

const AuthHeaderContainer = styled.header`
  /*  */
`

export default AuthHeader
