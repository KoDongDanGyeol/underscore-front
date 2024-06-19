import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type CommonMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const CommonMain = <C extends React.ElementType = "div">(props: CommonMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <CommonMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      {children}
    </CommonMainContainer>
  )
}

const CommonMainContainer = styled.div`
  /*  */
`

export default forwardRef(CommonMain)
