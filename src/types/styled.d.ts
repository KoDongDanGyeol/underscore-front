import "styled-components"
import { EnumTheme } from "@/stores/theme"
import { TypeColor } from "@/styles/theme/color"
import { TypeScreenDevice, TypeScreenSize } from "@/styles/theme/screen"
import { TypeTypoLeading, TypeTypoSize } from "@/styles/theme/typo"

declare module "styled-components" {
  export interface DefaultTheme
    extends Record<"color", Record<EnumTheme, TypeColor>>,
      Record<"screen", Record<"device", TypeScreenDevice> & Record<"size", TypeScreenSize>>,
      Record<"typo", Record<"leading", TypeTypoLeading> & Record<"size", TypeTypoSize>> {}
}
