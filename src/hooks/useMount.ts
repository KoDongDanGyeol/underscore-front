import { useEffect, useMemo, useRef, useState } from "react"
import { isEquals } from "@/libs/utils"

type TypeCleanup = undefined | void | (() => void)
type TypeCallback = () => TypeCleanup
type TypeDependencies = unknown[]
type TypeStructure = {
  isMounted: boolean
  cleanup: TypeCleanup
}

const useMount = (callback?: TypeCallback, deps?: TypeDependencies) => {
  const [structure, setStructure] = useState<TypeStructure>({
    isMounted: false,
    cleanup: () => {},
  })

  const dependencies = useMemo<TypeDependencies>(() => deps ?? [], [deps])
  const dependenciesRef = useRef<TypeDependencies>(dependencies)

  useEffect(() => {
    const cleanup = callback?.()
    setStructure((prev) => ({
      ...prev,
      isMounted: true,
      cleanup,
    }))
    return () => {
      structure?.cleanup?.()
    }
  }, [])

  useEffect(() => {
    if (!structure.isMounted) return
    if (isEquals(dependenciesRef.current, dependencies)) return
    const cleanup = callback?.()
    setStructure((prev) => ({
      ...prev,
      cleanup,
    }))
  }, [dependencies])

  return {
    mountStructure: structure,
  }
}

export default useMount
