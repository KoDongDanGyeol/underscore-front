export type TypeScreenSize = typeof ScreenSize
export type TypeScreenSizeKey = keyof TypeScreenSize
export type TypeScreenDevice = typeof ScreenDevice
export type TypeScreenDeviceKey = keyof TypeScreenDevice

export const ScreenSize = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
}

export const ScreenDevice = {
  sm: `all and (max-width: ${ScreenSize.sm})`,
  md: `all and (max-width: ${ScreenSize.md})`,
  lg: `all and (max-width: ${ScreenSize.lg})`,
  xl: `all and (max-width: ${ScreenSize.xl})`,
}
