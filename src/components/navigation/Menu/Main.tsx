import { useState } from "react"
import styled from "styled-components"
import { isEquals } from "@/libs/utils"
import Menu, { TyepMenuItem } from "@/components/navigation/Menu"

export interface MenuMainProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TyepMenuItem[]
  defaultOpened?: TyepMenuItem["key"][]
  defaultSelected?: TyepMenuItem["key"][]
  onNavigated?: () => void
}

type TypeStructure = {
  opened: TyepMenuItem["key"][]
  selected: TyepMenuItem["key"][]
}

const MenuMain = (props: MenuMainProps) => {
  const { items = [], defaultOpened = [], defaultSelected = [], className = "", onNavigated, ...restProps } = props

  const [structure, setStructure] = useState<TypeStructure>({
    opened: defaultOpened,
    selected: defaultSelected,
  })

  const findPath = (
    items: TyepMenuItem[],
    targetItem: TyepMenuItem,
    currentPath: TyepMenuItem[] = [],
  ): TyepMenuItem[] | null => {
    for (const item of items) {
      const newPath = [...currentPath, item]
      if (item.key === targetItem.key) return newPath
      if (item.items && item.items.length > 0) {
        const foundPath = findPath(item.items, targetItem, newPath)
        if (foundPath) return foundPath
      }
    }
    return null
  }

  const findParent = (items: TyepMenuItem[], targetItems: TyepMenuItem[]): TyepMenuItem | null => {
    for (const item of items) {
      if (isEquals(item?.items ?? [], targetItems)) return item
      if (item.items && item.items.length > 0) {
        const foundPath = findParent(item.items, targetItems)
        if (foundPath) return foundPath
      }
    }
    return null
  }

  const onOpen = (origin: TyepMenuItem) => {
    setStructure((prev) => {
      const isOpened = prev.opened.includes(origin.key)
      const otherKeys = prev.opened.filter((openKey) => openKey !== origin.key)
      return { ...prev, opened: !isOpened ? [...otherKeys, origin.key] : [...otherKeys] }
    })
    return true
  }

  const onChoose = (origin: TyepMenuItem) => {
    onNavigated?.()
    setStructure((prev) => {
      const foundPath = findPath(items, origin) ?? []
      const foundKey = foundPath.map((item) => item.key)
      return { ...prev, opened: foundKey.slice(0, foundKey.length - 1), selected: foundKey }
    })
    return true
  }

  const render = (renderItems: TyepMenuItem[], depth: number) => {
    return (
      <Menu.Group isReady={depth === 0 ? true : structure.opened.includes(findParent(items, renderItems)?.key ?? "")}>
        {renderItems.map((renderItem) => (
          <Menu.Item
            key={renderItem.key}
            origin={renderItem}
            depth={depth}
            isOpened={structure.opened.includes(renderItem.key)}
            isSelected={structure.selected.includes(renderItem.key)}
            onOpen={onOpen}
            onChoose={onChoose}
          >
            {renderItem.items && Boolean(renderItem?.items?.length) && render(renderItem.items, depth + 1)}
          </Menu.Item>
        ))}
      </Menu.Group>
    )
  }

  return (
    <MenuMainContainer className={`${className}`} {...restProps}>
      {render(items, 0)}
    </MenuMainContainer>
  )
}

const MenuMainContainer = styled.div`
  /*  */
`

export default MenuMain
