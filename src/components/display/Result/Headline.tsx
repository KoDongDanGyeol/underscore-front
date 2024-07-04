import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type ResultHeadlineProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    coreEl?: React.ElementType
    detailEl?: React.ElementType
  }
>

const ResultHeadline = <C extends React.ElementType = "div">(
  props: ResultHeadlineProps<C>,
  ref?: PolymorphicRef<C>,
) => {
  const { asTag, coreEl: CoreEl = null, detailEl: DetailEl = null, className = "", ...restProps } = props

  return (
    <ResultHeadlineContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {CoreEl && <ResultHeadlineCore as={CoreEl} />}
      {DetailEl && <ResultHeadlineDetail as={DetailEl} />}
    </ResultHeadlineContainer>
  )
}

const ResultHeadlineCore = styled.strong`
  flex: none;
`

const ResultHeadlineDetail = styled.span`
  color: rgb(var(--color-neutral700));
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ResultHeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  &:empty {
    display: none;
  }
`

export default forwardRef(ResultHeadline)
