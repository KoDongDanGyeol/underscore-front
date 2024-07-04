import { atom } from "recoil"

export type TypeFlag = boolean

export const atomFlag = atom<TypeFlag>({
  key: "atomFlag",
  default: false,
})
