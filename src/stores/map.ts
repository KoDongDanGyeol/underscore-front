import { AtomEffect, DefaultValue, atom, selector } from "recoil"
import { EnumCategoryCode } from "@/queries/map"
import { availableClient, isEquals } from "@/libs/utils"

export type TypeMap = {
  status: {
    isInitialized: boolean
  }
  location: {
    level: number
    center: [number, number]
    bounds: [number, number, number, number]
  }
  capture: {
    categoryCode: EnumCategoryCode
    location: TypeMap["location"]
  }
}

export type TypeMapCapture = TypeMap["capture"] & {
  isModified: boolean
}

const checkStored = <T>(origin: T | string): T | null => {
  try {
    const value = typeof origin === "string" ? JSON.parse(origin) : origin
    if (!availableClient()) return null
    if (!(value instanceof Object)) return null
    if (!("location" in value)) return null
    if (!("capture" in value)) return null
    return { ...value, status: undefined }
  } catch (error) {
    return null
  }
}

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const stored = checkStored<T>(localStorage.getItem(key) ?? "")
    if (stored) setSelf(stored)
    onSet((value, _value, isReset) => {
      if (isReset) return localStorage.removeItem(key)
      const stored = checkStored(value ?? _value)
      if (stored) localStorage.setItem(key, JSON.stringify(stored))
    })
  }

export const atomMap = atom<TypeMap>({
  key: "atomMap",
  default: {
    status: {
      isInitialized: false,
    },
    location: {
      level: 0,
      center: [0, 0],
      bounds: [0, 0, 0, 0],
    },
    capture: {
      categoryCode: EnumCategoryCode.FD6,
      location: {
        level: 0,
        center: [0, 0],
        bounds: [0, 0, 0, 0],
      },
    },
  },
  effects: [localStorageEffect<TypeMap>("UNDERSCORE_ATOM_MAP")],
})

export const atomMapCapture = selector<TypeMapCapture>({
  key: "atomMapCapture",
  get: ({ get }) => {
    const map = get(atomMap)
    return {
      ...map.capture,
      isModified: !isEquals(Object.entries(map.location), Object.entries(map.capture.location)),
    }
  },
  set: ({ get, set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) return reset(atomMap)
    const map = get(atomMap)
    return set(atomMap, {
      ...map,
      location: {
        ...map.location,
        ...newValue.location,
      },
      capture: {
        ...map.capture,
        ...newValue,
      },
    })
  },
})
