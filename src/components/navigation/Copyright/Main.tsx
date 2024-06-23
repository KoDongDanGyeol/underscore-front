import styled from "styled-components"
import { convertDateToString } from "@/libs/utils"
import Link from "@/components/general/Link"
import Button from "@/components/general/Button"

export interface CopyrightMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const CopyrightMain = (props: CopyrightMainProps) => {
  const { className = "", ...restProps } = props

  return (
    <CopyrightMainContainer className={`${className}`} {...restProps}>
      <CopyrightMainPolicy>
        <Button asTag={Link} to="/policy/service" shape="plain" variants="secondary">
          이용약관
        </Button>
        <Button asTag={Link} to="/policy/privacy" shape="plain" variants="secondary">
          개인정보처리방침
        </Button>
      </CopyrightMainPolicy>
      <CopyrightMainReference>
        <span>&copy;{`${convertDateToString(new Date(), "YYYY")} ${import.meta.env.VITE_SERVICE_NAME}`}</span>
      </CopyrightMainReference>
    </CopyrightMainContainer>
  )
}

const CopyrightMainPolicy = styled.div`
  text-align: center;
  a {
    padding: 2px 8px;
  }
`

const CopyrightMainReference = styled.div`
  margin-top: 4px;
  text-align: center;
  span {
    display: block;
    padding: 0 8px;
    color: rgb(var(--color-neutral800));
  }
`

const CopyrightMainContainer = styled.div`
  /*  */
`

export default CopyrightMain
