import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type ResultEmptyProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    coreEl?: React.ElementType
    detailEl?: React.ElementType
    actionEl?: React.ElementType
  }
>

const ResultEmpty = <C extends React.ElementType = "div">(props: ResultEmptyProps<C>, ref?: PolymorphicRef<C>) => {
  const {
    asTag,
    coreEl: CoreEl = null,
    detailEl: DetailEl = null,
    actionEl: ActionEl = null,
    className = "",
    ...restProps
  } = props

  return (
    <ResultEmptyContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {CoreEl && <ResultEmptyCore as={CoreEl} />}
      {DetailEl && <ResultEmptyDetail as={DetailEl} />}
      {ActionEl && <ResultEmptyAction as={ActionEl} />}
    </ResultEmptyContainer>
  )
}

const ResultEmptyCore = styled.strong`
  display: block;
  text-align: center;
  font-size: ${(props) => props.theme.typo.size["base"]};
  line-height: ${(props) => props.theme.typo.leading["base"]};
  font-weight: 500;
  white-space: pre-line;
`

const ResultEmptyDetail = styled.p`
  margin-top: 4px;
  display: block;
  text-align: center;
  color: rgb(var(--color-neutral700));
  white-space: pre-line;
`

const ResultEmptyAction = styled.div`
  margin-top: 8px;
  display: block;
  text-align: center;
  :is(a, button) {
    padding: 0 8px;
  }
`

const ResultEmptyContainer = styled.div`
  &:empty {
    display: none;
  }
`

export default forwardRef(ResultEmpty)
