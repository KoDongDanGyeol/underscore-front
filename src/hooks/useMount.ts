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
    setStructure((prev) => ({
      ...prev,
      isMounted: true,
      cleanup: callback?.(),
    }))
    return () => {
      structure?.cleanup?.()
    }
  }, [])

  useEffect(() => {
    if (!structure.isMounted) return
    if (isEquals(dependenciesRef.current ?? [], dependencies)) return
    dependenciesRef.current = dependencies
    setStructure((prev) => ({
      ...prev,
      cleanup: callback?.(),
    }))
  }, [dependencies])

  return {
    mountStructure: structure,
  }
}

export default useMount
