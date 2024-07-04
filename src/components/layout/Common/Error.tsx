import styled from "styled-components"

export interface CommonErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  coreEl?: React.ElementType
  detailEl?: React.ElementType
  actionEl?: React.ElementType
}

const CommonError = (props: CommonErrorProps) => {
  const {
    coreEl: CoreEl = null,
    detailEl: DetailEl = null,
    actionEl: ActionEl = null,
    className = "",
    ...restProps
  } = props

  return (
    <CommonErrorContainer className={`${className}`} {...restProps}>
      {CoreEl && <CommonErrorCore as={CoreEl} />}
      {DetailEl && <CommonErrorDetail as={DetailEl} />}
      {ActionEl && <CommonErrorAction as={ActionEl} />}
    </CommonErrorContainer>
  )
}

const CommonErrorCore = styled.h1`
  text-align: center;
  font-size: ${(props) => props.theme.typo.size["base"]};
  line-height: ${(props) => props.theme.typo.leading["base"]};
  white-space: pre-line;
`

const CommonErrorDetail = styled.p`
  margin-top: 8px;
  text-align: center;
  white-space: pre-line;
`

const CommonErrorAction = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
`

const CommonErrorContainer = styled.div`
  &:empty {
    display: none;
  }
`

export default CommonError
