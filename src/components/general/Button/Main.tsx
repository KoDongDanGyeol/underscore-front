import { forwardRef } from "react"
import styled, { css } from "styled-components"
import { NonUndefined } from "@/libs/utils"
import { PolymorphicRef, PolymorphicComponentPropWithRef } from "@/types/polymorphic"
import { EnumButtonShape, EnumButtonSize, EnumButtonVariants } from "@/components/general/Button"

export type ButtonMainProps<C extends React.ElementType = "button"> = PolymorphicComponentPropWithRef<
  C,
  {
    shape?: EnumButtonShape
    size?: EnumButtonSize
    variants?: EnumButtonVariants
    isDanger?: boolean
    isActive?: boolean
    prefixEl?: React.ElementType
    suffixEl?: React.ElementType
  }
>

const ButtonMain = <C extends React.ElementType = "button">(props: ButtonMainProps<C>, ref?: PolymorphicRef<C>) => {
  const {
    asTag,
    shape = EnumButtonShape.Square,
    size = EnumButtonSize.BASE,
    variants = EnumButtonVariants.Primary,
    isDanger = false,
    isActive = false,
    prefixEl: PrefixEl = null,
    suffixEl: SuffixEl = null,
    className = "",
    children,
    ...restProps
  } = props

  return (
    <ButtonMainContainer
      ref={ref}
      as={asTag ?? "button"}
      $shape={shape}
      $size={size}
      $variants={variants}
      $isDanger={isDanger}
      $isActive={isActive}
      $onlyIcon={Boolean((PrefixEl || SuffixEl) && !children)}
      className={`${className}`}
      {...restProps}
    >
      {PrefixEl && <ButtonMainIcon as={PrefixEl} />}
      {children}
      {SuffixEl && <ButtonMainIcon as={SuffixEl} />}
    </ButtonMainContainer>
  )
}

type StyledButtonMain<C extends React.ElementType = "button"> = {
  $shape: NonUndefined<ButtonMainProps<C>["shape"]>
  $size: NonUndefined<ButtonMainProps<C>["size"]>
  $variants: NonUndefined<ButtonMainProps<C>["variants"]>
  $isDanger: NonUndefined<ButtonMainProps<C>["isDanger"]>
  $isActive: NonUndefined<ButtonMainProps<C>["isActive"]>
  $onlyIcon: boolean
}

const ButtonSquare = css<StyledButtonMain>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 400;
  color: rgb(var(--color-neutral1100));
  border: 1px solid transparent;
  outline: none;
  /* size */
  ${(props) => {
    switch (props.$size) {
      case EnumButtonSize.SM:
        return css`
          padding: 0 7px;
          font-size: ${(props) => props.theme.typo.size.sm};
          line-height: ${(props) => props.theme.typo.leading.sm};
          border-radius: 4px;
        `
      case EnumButtonSize.LG:
        return css`
          padding: 7px 15px;
          font-size: ${(props) => props.theme.typo.size.base};
          line-height: ${(props) => props.theme.typo.leading.base};
          border-radius: 8px;
        `
      case EnumButtonSize.BASE:
      default:
        return css`
          padding: 4px 15px;
          font-size: ${(props) => props.theme.typo.size.sm};
          line-height: ${(props) => props.theme.typo.leading.sm};
          border-radius: 6px;
        `
    }
  }}
`

const ButtonSquarePrimary = css<StyledButtonMain>`
  &&:disabled {
    color: rgb(var(--color-neutral800));
    background: rgb(var(--color-neutral300));
    border-color: rgb(var(--color-neutral500));
  }
  ${(props) => {
    switch (props.$isDanger) {
      case true:
        return css`
          color: rgb(var(--color-neutral100));
          background: rgb(var(--color-red500));
          border-color: rgb(var(--color-red500));
          &:not(:disabled):hover {
            color: rgb(var(--color-neutral100));
            background: rgb(var(--color-red400));
            border-color: rgb(var(--color-red400));
          }
          &:not(:disabled):focus-visible {
            outline: 4px solid rgb(var(--color-red300));
            outline-offset: 1px;
          }
          &:not(:disabled):active {
            color: rgb(var(--color-neutral100));
            background: rgb(var(--color-red600));
            border-color: rgb(var(--color-red600));
          }
          ${props.$isActive &&
          css`
            &:not(:disabled) {
              color: rgb(var(--color-neutral100));
              background: rgb(var(--color-red600));
              border-color: rgb(var(--color-red600));
            }
          `}
        `
      case false:
      default:
        return css`
          color: rgb(var(--color-neutral100));
          background: rgb(var(--color-primary600));
          border-color: rgb(var(--color-primary600));
          &:not(:disabled):hover {
            color: rgb(var(--color-neutral100));
            background: rgb(var(--color-primary500));
            border-color: rgb(var(--color-primary500));
          }
          &:not(:disabled):focus-visible {
            outline: 4px solid rgb(var(--color-primary300));
            outline-offset: 1px;
          }
          &:not(:disabled):active {
            color: rgb(var(--color-neutral100));
            background: rgb(var(--color-primary700));
            border-color: rgb(var(--color-primary700));
          }
          ${props.$isActive &&
          css`
            &:not(:disabled) {
              color: rgb(var(--color-neutral100));
              background: rgb(var(--color-primary700));
              border-color: rgb(var(--color-primary700));
            }
          `}
        `
    }
  }}
`

const ButtonSquareSecondary = css<StyledButtonMain>`
  &&:disabled {
    color: rgb(var(--color-neutral800));
    background: rgb(var(--color-neutral300));
    border-color: rgb(var(--color-neutral500));
  }
  ${(props) => {
    switch (props.$isDanger) {
      case true:
        return css`
          color: rgb(var(--color-red500));
          background: rgb(var(--color-neutral100));
          border-color: rgb(var(--color-red500));
          &:not(:disabled):hover {
            color: rgb(var(--color-red400));
            background: rgb(var(--color-neutral100));
            border-color: rgb(var(--color-red400));
          }
          &:not(:disabled):focus-visible {
            outline: 4px solid rgb(var(--color-red300));
            outline-offset: 1px;
          }
          &:not(:disabled):active {
            color: rgb(var(--color-red600));
            background: rgb(var(--color-neutral100));
            border-color: rgb(var(--color-red600));
          }
          ${props.$isActive &&
          css`
            &:not(:disabled) {
              color: rgb(var(--color-red600));
              background: rgb(var(--color-neutral100));
              border-color: rgb(var(--color-red600));
            }
          `}
        `
      case false:
      default:
        return css`
          color: rgb(var(--color-neutral1100));
          background: rgb(var(--color-neutral100));
          border-color: rgb(var(--color-neutral500));
          &:not(:disabled):hover {
            color: rgb(var(--color-primary500));
            background: rgb(var(--color-neutral100));
            border-color: rgb(var(--color-primary500));
          }
          &:not(:disabled):focus-visible {
            outline: 4px solid rgb(var(--color-primary300));
            outline-offset: 1px;
          }
          &:not(:disabled):active {
            color: rgb(var(--color-primary700));
            background: rgb(var(--color-neutral100));
            border-color: rgb(var(--color-primary700));
          }
          ${props.$isActive &&
          css`
            &:not(:disabled) {
              color: rgb(var(--color-primary700));
              background: rgb(var(--color-neutral100));
              border-color: rgb(var(--color-primary700));
            }
          `}
        `
    }
  }}
`

const ButtonPlain = css<StyledButtonMain>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 400;
  color: rgb(var(--color-neutral1100));
  /* size */
  ${(props) => {
    switch (props.$size) {
      case EnumButtonSize.SM:
        return css`
          font-size: ${(props) => props.theme.typo.size.sm};
          line-height: ${(props) => props.theme.typo.leading.sm};
        `
      case EnumButtonSize.LG:
        return css`
          font-size: ${(props) => props.theme.typo.size.base};
          line-height: ${(props) => props.theme.typo.leading.base};
        `
      case EnumButtonSize.BASE:
      default:
        return css`
          font-size: ${(props) => props.theme.typo.size.sm};
          line-height: ${(props) => props.theme.typo.leading.sm};
        `
    }
  }}
`

const ButtonPlainPrimary = css<StyledButtonMain>`
  &&:disabled {
    color: rgb(var(--color-neutral800));
  }
  ${(props) => {
    switch (props.$isDanger) {
      case true:
        return css`
          color: rgb(var(--color-red500));
          &:not(:disabled):hover {
            color: rgb(var(--color-red400));
          }
          &:not(:disabled):active {
            color: rgb(var(--color-red600));
          }
          ${props.$isActive &&
          css`
            &:not(:disabled) {
              color: rgb(var(--color-red600));
            }
          `}
        `
      case false:
      default:
        return css`
          color: rgb(var(--color-primary600));
          &:not(:disabled):hover {
            color: rgb(var(--color-primary500));
          }
          &:not(:disabled):active {
            color: rgb(var(--color-primary700));
          }
          ${props.$isActive &&
          css`
            &:not(:disabled) {
              color: rgb(var(--color-primary700));
            }
          `}
        `
    }
  }}
`

const ButtonPlainSecondary = css<StyledButtonMain>`
  &&:disabled {
    color: rgb(var(--color-neutral800));
  }
  ${(props) => {
    switch (props.$isDanger) {
      case true:
        return css`
          color: rgb(var(--color-red500));
          &:not(:disabled):hover {
            color: rgb(var(--color-red400));
          }
          &:not(:disabled):active {
            color: rgb(var(--color-red600));
          }
          ${props.$isActive &&
          css`
            &:not(:disabled) {
              color: rgb(var(--color-red600));
            }
          `}
        `
      case false:
      default:
        return css`
          color: rgb(var(--color-neutral1100));
          &:not(:disabled):hover {
            color: rgb(var(--color-neutral700));
          }
          &:not(:disabled):active {
            color: rgb(var(--color-neutral1300));
          }
          ${props.$isActive &&
          css`
            &:not(:disabled) {
              color: rgb(var(--color-neutral1300));
            }
          `}
        `
    }
  }}
`

const ButtonMainIcon = styled.svg`
  flex: none;
  margin: 0.23em 0;
`

const ButtonMainContainer = styled.button<StyledButtonMain>`
  transition-property: border-color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: var(--motion-ease-in-out);
  transition-delay: 0s;
  ${(props) => {
    switch (props.$shape) {
      case EnumButtonShape.Plain:
        switch (props.$variants) {
          case EnumButtonVariants.Secondary:
            return [ButtonPlain, ButtonPlainSecondary]
          case EnumButtonVariants.Primary:
          default:
            return [ButtonPlain, ButtonPlainPrimary]
        }
      case EnumButtonShape.Square:
      default:
        switch (props.$variants) {
          case EnumButtonVariants.Secondary:
            return [ButtonSquare, ButtonSquareSecondary]
          case EnumButtonVariants.Primary:
          default:
            return [ButtonSquare, ButtonSquarePrimary]
        }
    }
  }}
  ${(props) => {
    switch (props.$onlyIcon) {
      case true:
        return css`
          padding: 0;
        `
      case false:
      default:
        return css`
          ${ButtonMainIcon} {
            transform: scale(0.9);
          }
        `
    }
  }}
  &:disabled {
    opacity: 0.8;
  }
`

export default forwardRef(ButtonMain)
