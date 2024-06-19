import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type CommonPageProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const CommonPage = <C extends React.ElementType = "main">(props: CommonPageProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <CommonPageContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </CommonPageContainer>
  )
}

const CommonPageContainer = styled.main`
  /*  */
`

export default forwardRef(CommonPage)
