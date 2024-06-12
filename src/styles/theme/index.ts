import { DefaultTheme } from "styled-components"
import { ColorLight, ColorDark } from "@/styles/theme/color"
import { ScreenDevice, ScreenSize } from "@/styles/theme/screen"
import { TypoLeading, TypoSize } from "@/styles/theme/typo"

export const Theme: DefaultTheme = {
  color: { light: ColorLight, dark: ColorDark },
  screen: { device: ScreenDevice, size: ScreenSize },
  typo: { leading: TypoLeading, size: TypoSize },
}
