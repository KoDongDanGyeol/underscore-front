import styled, { css } from "styled-components"
import { NonUndefined } from "@/libs/utils"
import { TyepMenuItem } from "@/components/navigation/Menu"
import Link from "@/components/general/Link"
import Icon from "@/components/general/Icon"

export interface MenuItemProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLLIElement>> {
  depth: number
  origin: TyepMenuItem
  isOpened: boolean
  isSelected: boolean
  onOpen?: (origin: TyepMenuItem) => boolean
  onChoose?: (origin: TyepMenuItem) => boolean
}

const MenuItem = (props: MenuItemProps) => {
  const { depth, origin, isOpened, isSelected, className = "", children, onOpen, onChoose, ...restProps } = props

  if (!origin?.label) {
    return null
  }

  if (children) {
    return (
      <MenuItemContainer
        className={`${className}`}
        aria-expanded={isOpened}
        $depth={depth}
        $isOpened={isOpened}
        $isSelected={isSelected}
        $hasChildren={true}
        {...restProps}
      >
        <MenuItemLabel as="button" type="button" onClick={() => onOpen?.(origin)}>
          {origin.label}
          <Icon name="CaretDown" label={`${isOpened ? "닫기" : "열기"} ${isSelected ? "(선택됨)" : ""}`} />
        </MenuItemLabel>
        {children}
      </MenuItemContainer>
    )
  }

  return (
    <MenuItemContainer
      className={`${className}`}
      $depth={depth}
      $isOpened={isOpened}
      $isSelected={isSelected}
      $hasChildren={false}
      {...restProps}
    >
      {origin?.href ? (
        <MenuItemLabel as={Link} to={origin?.href} onClick={() => onChoose?.(origin)}>
          {origin.label}
        </MenuItemLabel>
      ) : origin?.onClick ? (
        <MenuItemLabel as="button" type="button" onClick={() => onChoose?.(origin) && origin?.onClick?.()}>
          {origin.label}
        </MenuItemLabel>
      ) : (
        <MenuItemLabel as="span">{origin.label}</MenuItemLabel>
      )}
    </MenuItemContainer>
  )
}

type StyledMenuItem = {
  $depth: NonUndefined<MenuItemProps["depth"]>
  $isOpened: NonUndefined<MenuItemProps["isOpened"]>
  $isSelected: NonUndefined<MenuItemProps["isSelected"]>
  $hasChildren: boolean
}

const MenuItemLabel = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  transition-property: color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  transition-delay: 0s;
  white-space: pre-line;
  &:is(span) {
    color: rgb(var(--color-neutral800));
  }
  &:is(a, button):hover {
    background-color: rgba(var(--color-neutral1300), 0.06);
  }
  &:is(a, button):focus-visible {
    outline: none;
    border-color: rgb(var(--color-primary300));
  }
  svg {
    position: absolute;
    top: 50%;
    right: 16px;
    font-size: 10px;
    transform: translateY(-50%);
  }
`

const MenuItemContainer = styled.li<StyledMenuItem>`
  > ${MenuItemLabel} {
    padding-left: ${(props) => `${(props.$depth + 1) * 16}px`};
    padding-right: ${(props) => (props.$hasChildren ? "34px" : "16px")};
  }
  ${(props) => {
    if (props.$isOpened) {
      return css`
        > ${MenuItemLabel} {
          svg {
            transform: translateY(-50%) rotate(180deg);
          }
        }
      `
    }
  }}
  ${(props) => {
    if (props.$isSelected) {
      return css`
        > ${MenuItemLabel} {
          color: rgb(var(--color-primary600));
          background-color: ${!props.$hasChildren ? "rgb(var(--color-primary100))" : ""};
        }
      `
    }
  }}
`

export default MenuItem
