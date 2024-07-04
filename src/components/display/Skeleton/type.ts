export const EnumSkeletonShape = {
  Square: "square",
  Plain: "plain",
} as const

export type EnumSkeletonShape = (typeof EnumSkeletonShape)[keyof typeof EnumSkeletonShape]
