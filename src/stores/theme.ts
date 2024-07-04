import { AtomEffect, atom } from "recoil"
import { availableClient } from "@/libs/utils"

export const EnumTheme = {
  Light: "light",
  Dark: "dark",
} as const

export type EnumTheme = (typeof EnumTheme)[keyof typeof EnumTheme]

const checkStored = <T>(origin: T | string): T | null => {
  try {
    if (!availableClient()) return null
    if ((Object.values(EnumTheme) as T[]).includes(origin as T)) return origin as T
    if (window?.matchMedia?.("(prefers-color-scheme: dark)")?.matches) return EnumTheme.Dark as T
    return EnumTheme.Light as T
  } catch (error) {
    return null
  }
}

const localStorageEffect =
  <T extends EnumTheme>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const stored = checkStored<T>(localStorage.getItem(key) ?? "")
    if (stored) setSelf(stored)
    if (stored) document?.documentElement?.setAttribute("data-theme", stored)
    onSet((value, _value, isReset) => {
      if (isReset) {
        localStorage.removeItem(key)
        document?.documentElement?.removeAttribute("data-theme")
      } else {
        const stored = checkStored(value ?? _value)
        if (stored) localStorage.setItem(key, JSON.stringify(stored))
        if (stored) document?.documentElement?.setAttribute("data-theme", value ?? _value)
      }
    })
  }

export const atomTheme = atom<EnumTheme>({
  key: "atomTheme",
  default: EnumTheme.Light,
  effects: [localStorageEffect<EnumTheme>("UNDERSCORE_ATOM_THEME")],
})
