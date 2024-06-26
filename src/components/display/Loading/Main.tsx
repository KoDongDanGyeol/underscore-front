import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Icon from "@/components/general/Icon"

export type LoadingMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const LoadingMain = <C extends React.ElementType = "div">(props: LoadingMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  return (
    <LoadingMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <Icon name="Loading" label="Loading" />
    </LoadingMainContainer>
  )
}

const LoadingMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-primary600));
`

export default forwardRef(LoadingMain)
