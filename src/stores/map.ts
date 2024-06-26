"use client"

import { atom } from "recoil"

export type TypeMap = {
  isInitialized: boolean
  level: number
  center: [number, number]
  bounds: [number, number, number, number]
}

export const atomMap = atom<TypeMap>({
  key: "atomMap",
  default: {
    isInitialized: false,
    level: 3,
    center: [0, 0],
    bounds: [0, 0, 0, 0],
  },
  effects: [],
})
