import styled from "styled-components"
import Copyright from "@/components/navigation/Copyright"

export interface CommonFooterProps extends React.HTMLAttributes<HTMLElement> {
  //
}

const CommonFooter = (props: CommonFooterProps) => {
  const { className = "", ...restProps } = props

  return (
    <CommonFooterContainer className={`${className}`} {...restProps}>
      <Copyright />
    </CommonFooterContainer>
  )
}

const CommonFooterContainer = styled.footer`
  /*  */
`

export default CommonFooter
