import MenuMain, { MenuMainProps } from "@/components/navigation/Menu/Main"
import MenuGroup, { MenuGroupProps } from "@/components/navigation/Menu/Group"
import MenuItem, { MenuItemProps } from "@/components/navigation/Menu/Item"
import { TyepMenuItem } from "@/components/navigation/Menu/type"

export { type MenuMainProps, type MenuGroupProps, type MenuItemProps, type TyepMenuItem }

export default Object.assign(MenuMain, {
  Group: MenuGroup,
  Item: MenuItem,
})
