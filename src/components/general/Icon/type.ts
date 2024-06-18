export const EnumIconName = {
  ["Loading"]: "Loading",
  ["Picture"]: "Picture",
} as const

export type EnumIconName = (typeof EnumIconName)[keyof typeof EnumIconName]
