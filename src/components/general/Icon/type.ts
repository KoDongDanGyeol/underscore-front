export const EnumIconName = {
  ["CaretDown"]: "CaretDown",
  ["CaretUp"]: "CaretUp",
  ["Close"]: "Close",
  ["FundProjectionScreen"]: "FundProjectionScreen",
  ["Loading"]: "Loading",
  ["Menu"]: "Menu",
  ["Picture"]: "Picture",
} as const

export type EnumIconName = (typeof EnumIconName)[keyof typeof EnumIconName]
