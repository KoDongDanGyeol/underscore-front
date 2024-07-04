export const EnumIconName = {
  ["CaretDown"]: "CaretDown",
  ["CaretUp"]: "CaretUp",
  ["CheckCircleFilled"]: "CheckCircleFilled",
  ["Close"]: "Close",
  ["CloseCircleFilled"]: "CloseCircleFilled",
  ["EnvironmentFilled"]: "EnvironmentFilled",
  ["ExclamationCircleFilled"]: "ExclamationCircleFilled",
  ["FundProjectionScreen"]: "FundProjectionScreen",
  ["InfoCircleFilled"]: "InfoCircleFilled",
  ["Left"]: "Left",
  ["Loading"]: "Loading",
  ["Menu"]: "Menu",
  ["Picture"]: "Picture",
  ["Reload"]: "Reload",
  ["Right"]: "Right",
  ["Search"]: "Search",
} as const

export type EnumIconName = (typeof EnumIconName)[keyof typeof EnumIconName]
