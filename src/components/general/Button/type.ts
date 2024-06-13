export const EnumButtonShape = {
  Square: "square",
  Plain: "plain",
} as const

export type EnumButtonShape = (typeof EnumButtonShape)[keyof typeof EnumButtonShape]

export const EnumButtonSize = {
  SM: "sm",
  BASE: "base",
  LG: "lg",
} as const

export type EnumButtonSize = (typeof EnumButtonSize)[keyof typeof EnumButtonSize]

export const EnumButtonVariants = {
  Primary: "primary",
  Secondary: "secondary",
} as const

export type EnumButtonVariants = (typeof EnumButtonVariants)[keyof typeof EnumButtonVariants]
