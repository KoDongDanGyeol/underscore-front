import { useRef } from "react"
import { useRecoilState } from "recoil"
import { atomGlobal, TypeBottomSheet } from "@/stores/global"
import { Timer, setTimer, clearTimer } from "@/libs/timer"

type TypeName = Parameters<TypeBottomSheet["set"]>[0]
type TypeOptions = Parameters<TypeBottomSheet["set"]>[1]

const useBottomSheet = () => {
  const timers = useRef<Timer>({ delay: null })
  const [global, setGlobal] = useRecoilState(atomGlobal)

  const onInput = (name: TypeName, options: Partial<Omit<TypeOptions, "component">>) => {
    setGlobal((global) => {
      const bottomSheet = new Map(global.bottomSheet)
      const prevSheet = bottomSheet.get(name)
      if (bottomSheet.has(name)) bottomSheet.delete(name)
      if (prevSheet) bottomSheet.set(name, { ...prevSheet, ...options })
      return { ...global, bottomSheet }
    })
  }

  const onMount = async (name: TypeName, options: TypeOptions) => {
    setGlobal((global) => {
      const bottomSheet = new Map(global.bottomSheet)
      const prevSheet = bottomSheet.get(name)
      if (bottomSheet.has(name)) bottomSheet.delete(name)
      bottomSheet.set(name, { ...prevSheet, ...options })
      return { ...global, bottomSheet }
    })
  }

  const onUnmount = async (name: TypeName) => {
    await onFold(name)
    setGlobal((global) => {
      const bottomSheet = new Map(global.bottomSheet)
      if (bottomSheet.has(name)) bottomSheet.delete(name)
      return { ...global, bottomSheet }
    })
  }

  const onOpen = async (name: TypeName) => {
    if (timers.current.delay) return
    onInput(name, { isPending: true, isOpened: false })
    await setTimer(timers, { key: "delay", delay: 50 })
    onInput(name, { isPending: false, isOpened: true })
    clearTimer(timers, { key: "delay" })
  }

  const onFold = async (name: TypeName) => {
    if (timers.current.delay) return
    onInput(name, { isPending: true, isOpened: true })
    await setTimer(timers, { key: "delay", delay: 200 })
    onInput(name, { isPending: false, isOpened: false })
    clearTimer(timers, { key: "delay" })
  }

  return {
    bottomSheetStructure: global.bottomSheet,
    onInput,
    onMount,
    onUnmount,
    onOpen,
    onFold,
  }
}

export default useBottomSheet
