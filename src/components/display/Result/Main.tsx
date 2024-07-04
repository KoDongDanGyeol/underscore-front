import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type ResultMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const ResultMain = <C extends React.ElementType = "div">(props: ResultMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <ResultMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {children}
    </ResultMainContainer>
  )
}

const ResultMainContainer = styled.div`
  /*  */
`

export default forwardRef(ResultMain)
