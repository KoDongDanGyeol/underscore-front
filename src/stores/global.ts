import { atom } from "recoil"
import { TypeScreenSizeKey } from "@/styles/theme/screen"

export type TypeBottomSheet = Map<string, TypeBottomSheetOption>
export type TypeBottomSheetOption = {
  isPending?: boolean
  isOpened?: boolean
  component?: React.ElementType
}

export type TypeGlobal = {
  logged: boolean
  screen: TypeScreenSizeKey[]
  bottomSheet: TypeBottomSheet
}

export const atomGlobal = atom<TypeGlobal>({
  key: "atomGlobal",
  default: {
    logged: false,
    screen: [],
    bottomSheet: new Map(),
  },
  effects: [],
})
