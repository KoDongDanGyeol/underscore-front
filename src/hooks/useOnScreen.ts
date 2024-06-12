import { useState, useEffect, useRef } from "react"

type TypeOption = {
  rootMargin: string
}
type TypeStructure = {
  isVisible: boolean
}

const useOnScreen = <C extends HTMLElement>(option?: TypeOption) => {
  const [structure, setStructure] = useState<TypeStructure>({
    isVisible: false,
  })

  const observerRef = useRef<IntersectionObserver | null>(null)
  const containerRef = useRef<C | null>(null)

  const onReset = () => {
    setStructure(() => ({ isVisible: false }))
  }

  const updateObserver = () => {
    if (!containerRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setStructure((prev) => ({ ...prev, isVisible: entry.isIntersecting }))
      },
      { rootMargin: option?.rootMargin ?? "50px" },
    )
    io.observe(containerRef.current)
    observerRef.current = io
  }

  const removeObserver = () => {
    if (!observerRef.current) return
    observerRef.current.disconnect()
    onReset()
  }

  useEffect(() => {
    updateObserver()
    return () => {
      removeObserver()
    }
  }, [])

  return {
    onScreenStructure: structure,
    onScreenRefs: {
      containerRef,
    },
    onReset,
  }
}

export default useOnScreen
