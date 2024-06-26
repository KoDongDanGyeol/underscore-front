import { useEffect } from "react"
import styled, { css } from "styled-components"
import useDropdown from "@/hooks/useDropdown"

export interface MenuGroupProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  isReady: boolean
}

const MenuGroup = (props: MenuGroupProps) => {
  const { isReady, className = "", children, ...restProps } = props

  const { dropdownStructure, onOpen, onFold } = useDropdown({
    defaultOpen: isReady,
    delayOpen: 50,
    delayClose: 200,
  })

  useEffect(() => {
    if (isReady === dropdownStructure.isOpened) return
    isReady ? onOpen() : onFold()
  }, [isReady])

  if (!children) {
    return null
  }

  return (
    <MenuGroupContainer
      className={`${className}`}
      $isPending={dropdownStructure.isPending}
      $isOpened={dropdownStructure.isOpened}
      {...restProps}
    >
      <ul>{children}</ul>
    </MenuGroupContainer>
  )
}

type StyledMenuGroup = {
  $isPending: boolean
  $isOpened: boolean
}

const MenuGroupContainer = styled.div<StyledMenuGroup>`
  position: relative;
  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
    border-radius: 8px;
  }
  ul & {
    display: none;
    transition-property: grid-template-rows, padding-top;
    transition-duration: 200ms;
    transition-timing-function: var(--motion-ease-out);
    transition-delay: 0s;
  }
  ul & ul {
    background: rgba(var(--color-neutral1300), 0.02);
  }
  ${(props) => {
    if (props.$isPending) {
      return css`
        && {
          display: grid;
          grid-template-rows: 0fr;
        }
      `
    } else if (props.$isOpened) {
      return css`
        && {
          display: grid;
          grid-template-rows: 1fr;
          &:not(:first-child) {
            padding-top: 4px;
          }
        }
      `
    }
  }}
`

export default MenuGroup
