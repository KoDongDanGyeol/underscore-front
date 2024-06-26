import { useState, useCallback, useRef } from "react"
import { Timer, setTimer, clearTimer } from "@/libs/timer"

type TypeOption<T> = {
  defaultOpen?: boolean
  defaultValue?: T
  delayOpen?: number
  delayClose?: number
}
type TypeStructure<T> = {
  isOpened: boolean
  isPending: boolean
  value?: T
}

const useDropdown = <T>(option?: TypeOption<T>) => {
  const timers = useRef<Timer>({ delay: null })
  const [structure, setStructure] = useState<TypeStructure<T>>({
    isOpened: option?.defaultOpen ?? false,
    isPending: false,
    value: option?.defaultValue,
  })

  const onInput = useCallback(async (value?: T) => {
    setStructure((prev) => ({ ...prev, value }))
  }, [])

  const onOpen = useCallback(async (value?: T) => {
    clearTimer(timers, { key: "delay" })
    setStructure((prev) => ({ ...prev, isPending: true, isOpened: false }))
    await setTimer(timers, { key: "delay", delay: option?.delayOpen ?? 0 })
    setStructure((prev) => ({ ...prev, isPending: false, isOpened: true, value: value ?? prev.value }))
    clearTimer(timers, { key: "delay" })
  }, [])

  const onFold = useCallback(async (value?: T) => {
    clearTimer(timers, { key: "delay" })
    setStructure((prev) => ({ ...prev, isPending: true, isOpened: true, value: value ?? prev.value }))
    await setTimer(timers, { key: "delay", delay: option?.delayClose ?? 0 })
    setStructure((prev) => ({ ...prev, isPending: false, isOpened: false }))
    clearTimer(timers, { key: "delay" })
  }, [])

  return {
    dropdownStructure: structure,
    onInput,
    onOpen,
    onFold,
  }
}

export default useDropdown
