import { useEffect, useMemo, useRef, useState } from "react"
import { isEquals } from "@/libs/utils"
import { Timer, setTimer, clearTimer } from "@/libs/timer"

type TypeCleanup = undefined | void | (() => void)
type TypeCallback = () => TypeCleanup
type TypeDependencies = unknown[]
type TypeStructure = {
  isMounted: boolean
  cleanup?: TypeCleanup
}
type TypeOptions = {
  delay?: number
}

const useMount = (callback?: TypeCallback, deps?: TypeDependencies, options?: TypeOptions) => {
  const [structure, setStructure] = useState<TypeStructure>({
    isMounted: false,
    cleanup: undefined,
  })

  const timers = useRef<Timer>({ delay: null })
  const dependencies = useMemo<TypeDependencies>(() => deps ?? [], [deps])
  const dependenciesRef = useRef<TypeDependencies>(dependencies)

  useEffect(() => {
    ;(async () => {
      setStructure((prev) => ({ ...prev, isMounted: true }))
      clearTimer(timers, { key: "delay" })
      await setTimer(timers, { key: "delay", delay: options?.delay ?? 0 })
      const cleanup = callback?.()
      setStructure((prev) => ({ ...prev, cleanup }))
    })()
    return () => {
      structure?.cleanup?.()
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!structure.isMounted) return
      if (isEquals(dependenciesRef.current ?? [], dependencies)) return
      clearTimer(timers, { key: "delay" })
      await setTimer(timers, { key: "delay", delay: options?.delay ?? 0 })
      dependenciesRef.current = dependencies
      const cleanup = callback?.()
      setStructure((prev) => ({ ...prev, cleanup }))
    })()
  }, [dependencies])

  return {
    mountStructure: structure,
  }
}

export default useMount
