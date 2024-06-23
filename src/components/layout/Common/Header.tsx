import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Link from "@/components/general/Link"
import Picture from "@/components/general/Picture"

export interface CommonHeaderProps extends React.HTMLAttributes<HTMLElement> {
  //
}

const CommonHeader = (props: CommonHeaderProps) => {
  const { className = "", ...restProps } = props

  const { pathname } = useLocation()
  const domain = pathname.replace(/(\/[^/]+).*/, "$1")

  return (
    <CommonHeaderContainer className={`${className}`} {...restProps}>
      <CommonHeaderLogo>
        <Link to={domain}>
          <Picture src="/logo.svg" alt={import.meta.env.VITE_SERVICE_NAME} ratio={[429, 85]} />
        </Link>
      </CommonHeaderLogo>
    </CommonHeaderContainer>
  )
}

const CommonHeaderLogo = styled.h1`
  a {
    margin: 0 auto;
    display: block;
    width: 136px;
    padding: 8px;
  }
`

const CommonHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 20px 0 12px;
  background: rgb(var(--color-neutral100));
  box-shadow: 0px 2px 8px 0px rgba(var(--color-neutral1300), 0.15);
  z-index: 1000;
  ${CommonHeaderLogo} {
    order: 1;
  }
`

export default CommonHeader
