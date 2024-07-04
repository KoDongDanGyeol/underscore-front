import { forwardRef } from "react"
import styled, { css, keyframes } from "styled-components"
import { NonUndefined } from "@/libs/utils"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import { EnumSkeletonShape } from "@/components/display/Skeleton"

export type SkeletonMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    shape?: EnumSkeletonShape
    ratio?: [number, number]
  }
>

const SkeletonMain = <C extends React.ElementType = "span">(props: SkeletonMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, shape = EnumSkeletonShape.Plain, ratio = [1, 1], className = "", children, ...restProps } = props

  return (
    <SkeletonMainContainer
      ref={ref}
      as={asTag ?? "span"}
      className={`${className}`}
      $ratio={ratio}
      $shape={shape}
      {...restProps}
    >
      {children}
    </SkeletonMainContainer>
  )
}

interface SkeletonMainContainerStyled<C extends React.ElementType = "span"> {
  $ratio: NonUndefined<SkeletonMainProps<C>["ratio"]>
  $shape: NonUndefined<SkeletonMainProps<C>["shape"]>
}

const SkeletonMainFade = keyframes`
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.4;
  }
`

const SkeletonMainContainer = styled.span<SkeletonMainContainerStyled>`
  display: block;
  background: rgb(var(--color-neutral500));
  animation-name: ${SkeletonMainFade};
  animation-duration: 1.2s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  ${(props) => {
    switch (props.$shape) {
      case EnumSkeletonShape.Square:
        return css`
          padding-top: ${(props.$ratio[1] / props.$ratio[0]) * 100}%;
        `
      case EnumSkeletonShape.Plain:
      default:
        return css`
          transform: scaleY(0.88);
          border-radius: 4px;
          &:before {
            content: "";
            padding-left: 100%;
          }
        `
    }
  }}
`

export default forwardRef(SkeletonMain)
