export const EnumLabelNecessity = {
  Icon: "icon",
  Text: "text",
} as const

export type EnumLabelNecessity = (typeof EnumLabelNecessity)[keyof typeof EnumLabelNecessity]
