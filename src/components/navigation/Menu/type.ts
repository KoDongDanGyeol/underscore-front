export type TyepMenuItem = {
  key: string
  label: string | null
  href?: string
  items?: TyepMenuItem[]
  onClick?: () => void
}
