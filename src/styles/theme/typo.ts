export type TypeTypoSize = typeof TypoSize
export type TypeTypoSizeKey = keyof TypeTypoSize
export type TypeTypoLeading = typeof TypoLeading
export type TypeTypoLeadingKey = keyof TypeTypoLeading

export const TypoSize = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "60px",
  "7xl": "72px",
  "8xl": "96px",
}

export const TypoLeading = {
  xs: 1.33,
  sm: 1.42,
  base: 1.5,
  lg: 1.55,
  xl: 1.4,
  "2xl": 1.33,
  "3xl": 1.2,
  "4xl": 1.11,
  "5xl": 1,
  "6xl": 1,
  "7xl": 1,
  "8xl": 1,
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
}
