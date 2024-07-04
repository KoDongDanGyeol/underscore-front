export const EnumHelperVariants = {
  Default: "default",
  Error: "error",
} as const

export type EnumHelperVariants = (typeof EnumHelperVariants)[keyof typeof EnumHelperVariants]
