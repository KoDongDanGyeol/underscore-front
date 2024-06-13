import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type CommonMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const CommonMain = <C extends React.ElementType = "main">(props: CommonMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <CommonMainContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </CommonMainContainer>
  )
}

const CommonMainContainer = styled.main`
  /*  */
`

export default forwardRef(CommonMain)
