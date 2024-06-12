export const IconName = {
  ["Loading"]: "Loading",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
