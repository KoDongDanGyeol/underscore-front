import styled from "styled-components"
import Copyright from "@/components/navigation/Copyright"

export interface AuthFooterProps extends React.HTMLAttributes<HTMLElement> {
  //
}

const AuthFooter = (props: AuthFooterProps) => {
  const { className = "", ...restProps } = props

  return (
    <AuthFooterContainer className={`${className}`} {...restProps}>
      <Copyright />
    </AuthFooterContainer>
  )
}

const AuthFooterContainer = styled.footer`
  margin-top: 56px;
`

export default AuthFooter
