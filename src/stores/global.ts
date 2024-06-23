import { atom } from "recoil"
import { TypeScreenSizeKey } from "@/styles/theme/screen"

export type TypeGlobal = {
  logged: boolean
  screen: TypeScreenSizeKey[]
}

export const atomGlobal = atom<TypeGlobal>({
  key: "atomGlobal",
  default: {
    logged: false,
    screen: [],
  },
  effects: [],
})
