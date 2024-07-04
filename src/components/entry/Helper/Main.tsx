import styled, { css } from "styled-components"
import { NonUndefined } from "@/libs/utils"
import { EnumHelperVariants } from "@/components/entry/Helper"

export interface HelperMainProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  variants?: EnumHelperVariants
}

const HelperMain = (props: HelperMainProps) => {
  const { variants = EnumHelperVariants.Default, className = "", children, ...restProps } = props

  if (!children) return null

  return (
    <HelperMainContainer className={`${className}`} $variants={variants} {...restProps}>
      {children}
    </HelperMainContainer>
  )
}

interface HelperMainStyled {
  $variants: NonUndefined<HelperMainProps["variants"]>
}

const HelperMainContainer = styled.div<HelperMainStyled>`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.typo.size.xs};
  line-height: ${({ theme }) => theme.typo.leading.xs};
  white-space: pre-wrap;
  /* color */
  ${(props) => {
    switch (props.$variants) {
      case EnumHelperVariants.Error:
        return css`
          color: rgb(var(--color-red500));
        `
      case EnumHelperVariants.Default:
      default:
        return css`
          color: rgb(var(--color-neutral700));
        `
    }
  }}
`

export default HelperMain
