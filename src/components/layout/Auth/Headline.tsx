import styled from "styled-components"

export interface AuthHeadlineProps extends React.HTMLAttributes<HTMLDivElement> {
  coreEl?: React.ElementType
  detailEl?: React.ElementType
}

const AuthHeadline = (props: AuthHeadlineProps) => {
  const { coreEl: CoreEl = null, detailEl: DetailEl = null, className = "", ...restProps } = props

  return (
    <AuthHeadlineContainer className={`${className}`} {...restProps}>
      {CoreEl && <AuthHeadlineCore as={CoreEl} />}
      {DetailEl && <AuthHeadlineDetail as={DetailEl} />}
    </AuthHeadlineContainer>
  )
}

const AuthHeadlineCore = styled.h2`
  display: block;
  text-align: center;
  font-size: ${(props) => props.theme.typo.size["2xl"]};
  line-height: ${(props) => props.theme.typo.leading["2xl"]};
  font-weight: 500;
  white-space: pre-line;
`

const AuthHeadlineDetail = styled.p`
  margin-top: 8px;
  display: block;
  text-align: center;
  white-space: pre-line;
`

const AuthHeadlineContainer = styled.div`
  &:empty {
    display: none;
  }
`

export default AuthHeadline
