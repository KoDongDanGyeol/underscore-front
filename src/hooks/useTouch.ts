import { useEffect, useRef, useState } from "react"

type TypeStructure = {
  isScrambled: boolean
  start: { touchX: number; touchY: number }
  moved: { movedX: number; movedY: number; directionX: -1 | 0 | 1; directionY: -1 | 0 | 1 }
}

const useTouch = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [structure, setStructure] = useState<TypeStructure>({
    isScrambled: false,
    start: { touchX: 0, touchY: 0 },
    moved: { movedX: 0, movedY: 0, directionX: 0, directionY: 0 },
  })

  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    if (!containerRef.current) return
    if (contentRef.current?.contains(e?.target as HTMLElement)) return
    if (e.cancelable) e.preventDefault()
    setStructure((prev) => {
      const currentTouch = e instanceof TouchEvent ? e.touches?.[0] : e
      const touchX = currentTouch.clientX
      const touchY = currentTouch.clientY
      return {
        ...prev,
        isScrambled: true,
        start: { touchX, touchY },
      }
    })
    document.addEventListener("mousemove", handleTouchMove)
    document.addEventListener("mouseup", handleTouchEnd, { once: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd, { once: true })
  }

  const handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (e.cancelable) e.preventDefault()
    if (!containerRef.current) return
    setStructure((prev) => {
      const currentTouch = e instanceof TouchEvent ? e.touches?.[0] : e
      const [prevX, prevY] = [prev?.start?.touchX || currentTouch.clientX, prev?.start?.touchY || currentTouch.clientY]
      const directionX = prevX > currentTouch.clientX ? -1 : 1
      const directionY = prevY > currentTouch.clientY ? -1 : 1
      const movedX = currentTouch.clientX - prevX
      const movedY = currentTouch.clientY - prevY
      return {
        ...prev,
        isScrambled: true,
        moved: { directionX, directionY, movedX, movedY },
      }
    })
  }

  const handleTouchEnd = (e: TouchEvent | MouseEvent) => {
    if (e.cancelable) e.preventDefault()
    if (!containerRef.current) return
    setStructure((prev) => {
      return {
        ...prev,
        isScrambled: false,
      }
    })
    document.removeEventListener("mousemove", handleTouchMove)
    document.removeEventListener("mouseup", handleTouchEnd)
    document.removeEventListener("touchmove", handleTouchMove)
    document.removeEventListener("touchend", handleTouchEnd)
  }

  const onInit = () => {
    if (!containerRef.current) return
    containerRef.current.addEventListener("touchstart", handleTouchStart, { passive: false })
    containerRef.current.addEventListener("mousedown", handleTouchStart)
  }

  const onRemove = () => {
    if (!containerRef.current) return
    containerRef.current.removeEventListener("touchstart", handleTouchStart)
    containerRef.current.removeEventListener("mousedown", handleTouchStart)
  }

  useEffect(() => {
    if (structure.isScrambled) return
    if (structure.moved.directionX === 0 && structure.moved.directionY === 0) return
    setStructure((prev) => {
      return {
        ...prev,
        isScrambled: false,
        start: { touchX: 0, touchY: 0 },
        moved: { movedX: 0, movedY: 0, directionX: 0, directionY: 0 },
      }
    })
  }, [structure])

  return {
    touchRefs: {
      containerRef,
      contentRef,
    },
    touchStructure: structure,
    onInit,
    onRemove,
  }
}

export default useTouch
