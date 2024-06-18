export const EnumPictureRounded = {
  None: "none",
  Full: "full",
} as const

export type EnumPictureRounded = (typeof EnumPictureRounded)[keyof typeof EnumPictureRounded]
