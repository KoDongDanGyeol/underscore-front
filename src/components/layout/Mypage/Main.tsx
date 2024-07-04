import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Common from "@/components/layout/Common"

export type MypageMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const MypageMain = <C extends React.ElementType = "div">(props: MypageMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <MypageMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <Common.Header />
      {children}
    </MypageMainContainer>
  )
}

const MypageMainContainer = styled.div`
  align-self: stretch;
  width: 100%;
  padding-top: 48px;
  padding-left: 50px;
  padding-right: 50px;
  body:has(&) {
    background: rgb(var(--color-neutral300));
  }
  @media ${(props) => props.theme.screen.device.md} {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export default forwardRef(MypageMain)
