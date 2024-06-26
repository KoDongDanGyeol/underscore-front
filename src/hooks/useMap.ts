import { useRef } from "react"
import { useRecoilState } from "recoil"
import { atomMap, TypeMap } from "@/stores/map"

const useMap = () => {
  const [map, setMap] = useRecoilState(atomMap)

  const setupRef = useRef<Partial<TypeMap>>({})
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const onLoad = () => {
    window.kakao.maps.load(() => {
      const { level, center = [0, 0] } = setupRef.current
      const options = { center: new window.kakao.maps.LatLng(center[0], center[1]), level: level }
      window.kakaoMap = new window.kakao.maps.Map(containerRef.current, options)
      window.kakao.maps.event.addListener(window.kakaoMap, "idle", onChange)
      setMap((prev) => ({ ...prev, isInitialized: true }))
      onChange()
    })
  }

  const onInit = (level: TypeMap["level"], center: TypeMap["center"]) => {
    if (map.isInitialized) return
    if (scriptRef.current) return
    if (!containerRef.current) return
    setupRef.current = { level, center }
    scriptRef.current = document.createElement("script")
    scriptRef.current.async = true
    scriptRef.current.src = import.meta.env.VITE_KAKAO_API_URL
    scriptRef.current.setAttribute("strategy", "beforeInteractive")
    document.head.appendChild(scriptRef.current)
    scriptRef.current.addEventListener("load", onLoad)
  }

  const onRemove = () => {
    setMap((prev) => ({ ...prev, isInitialized: false, center: [0, 0], bounds: [0, 0, 0, 0] }))
    if (scriptRef.current) scriptRef.current.removeEventListener("load", onLoad)
    if (window.kakaoMap) window.kakao.maps.event.addListener(window.kakaoMap, "idle", onChange)
  }

  const onChange = () => {
    const level = window.kakaoMap.getLevel()
    const center = window.kakaoMap.getCenter().toString()
    const bounds = window.kakaoMap.getBounds().toString()
    setMap((prev) => ({
      ...prev,
      level: level,
      center: center.match(/(\d+(.)?\d+)/g).map(parseFloat) as TypeMap["center"],
      bounds: bounds.match(/(\d+(.)?\d+)/g).map(parseFloat) as TypeMap["bounds"],
    }))
  }

  return {
    mapRefs: {
      containerRef,
    },
    mapStructure: map,
    onInit,
    onRemove,
  }
}

export default useMap
