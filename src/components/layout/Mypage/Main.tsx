import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type MypageMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const MypageMain = <C extends React.ElementType = "main">(props: MypageMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <MypageMainContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
      {children}
    </MypageMainContainer>
  )
}

const MypageMainContainer = styled.main`
  /*  */
`

export default forwardRef(MypageMain)
