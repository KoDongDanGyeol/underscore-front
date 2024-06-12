import { AtomEffect, atom } from "recoil"
import { checkAvailableClient } from "@/libs/utils"

export const EnumTheme = {
  Light: "light",
  Dark: "dark",
} as const

export type EnumTheme = (typeof EnumTheme)[keyof typeof EnumTheme]

const localStorageEffect = <T extends EnumTheme>(key: string): AtomEffect<T> => {
  return ({ setSelf, onSet }) => {
    if (!checkAvailableClient()) return
    const stored = localStorage.getItem(key)
    const initial = (
      stored
        ? stored
        : checkAvailableClient() && window?.matchMedia?.("(prefers-color-scheme: dark)")?.matches
          ? EnumTheme.Dark
          : EnumTheme.Light
    ) as T
    setSelf(initial)
    checkAvailableClient() && document?.documentElement?.setAttribute("data-theme", initial)
    onSet((value, _value, isReset) => {
      if (isReset) {
        localStorage.removeItem(key)
        checkAvailableClient() && document?.documentElement?.removeAttribute("data-theme")
      } else {
        localStorage.setItem(key, value ?? _value)
        checkAvailableClient() && document?.documentElement?.setAttribute("data-theme", value ?? _value)
      }
    })
  }
}

export const atomTheme = atom<EnumTheme>({
  key: "atomTheme",
  default: EnumTheme.Light,
  effects: [localStorageEffect<EnumTheme>("UNDERSCORE_ATOM_THEME")],
})
