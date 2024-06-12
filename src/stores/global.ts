import { atom } from "recoil"
import { TypeScreenSizeKey } from "@/styles/theme/screen"

export type TypeGlobal = {
  screen: TypeScreenSizeKey[]
}

export const atomGlobal = atom<TypeGlobal>({
  key: "atomGlobal",
  default: {
    screen: [],
  },
  effects: [],
})
