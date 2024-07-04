import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { parseLocation } from "@/libs/map"
import useBottomSheet from "@/hooks/useBottomSheet"
import { atomMap, atomMapCapture, TypeMap } from "@/stores/map"
import { getRoute } from "@/providers/RouterProvider"
import { BoundNECoordinates, BoundSWCoordinates } from "@/components/layout/Map"

type TypeMarker = {
  center: TypeMap["location"]["center"]
  anchor: [number, number]
  content: string
}

const useMap = () => {
  const [map, setMap] = useRecoilState(atomMap)
  const [mapCapture, setMapCapture] = useRecoilState(atomMapCapture)

  const navigate = useNavigate()
  const { bottomSheetStructure, onMount } = useBottomSheet()

  const setupRef = useRef<Partial<TypeMap["location"]>>({})
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const onLoad = () => {
    window.kakao.maps.load(() => {
      const { level, center = [0, 0] } = setupRef.current
      const options = { center: new window.kakao.maps.LatLng(center[0], center[1]), level: level }
      window.kakaoMap = new window.kakao.maps.Map(containerRef.current, options)
      window.kakaoMap.custom = {}
      window.kakaoMap.custom.bounds = new window.kakao.maps.LatLngBounds(
        new window.kakao.maps.LatLng(BoundSWCoordinates.latitude, BoundSWCoordinates.longitude),
        new window.kakao.maps.LatLng(BoundNECoordinates.latitude, BoundNECoordinates.longitude),
      )
      window.kakao.maps.event.addListener(window.kakaoMap, "idle", onBounds)
      window.kakao.maps.event.addListener(window.kakaoMap, "idle", onIdle)
      const location = onIdle()
      setMap((prev) => ({ ...prev, status: { ...prev.status, isInitialized: true } }))
      setMapCapture((prev) => ({ ...prev, location }))
    })
  }

  const onInit = (options: { level: TypeMap["location"]["level"]; center: TypeMap["location"]["center"] }) => {
    if (map.status?.isInitialized) return
    if (scriptRef.current) return
    if (!containerRef.current) return
    setupRef.current = options
    scriptRef.current = document.createElement("script")
    scriptRef.current.async = true
    scriptRef.current.src = `${import.meta.env.VITE_KAKAO_API_URL}/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_SDK_KEY}&autoload=false`
    scriptRef.current.setAttribute("strategy", "beforeInteractive")
    document.head.appendChild(scriptRef.current)
    scriptRef.current.addEventListener("load", onLoad)
    containerRef.current.addEventListener("click", onClick)
  }

  const onBounds = () => {
    const center = window.kakaoMap.getCenter()
    if (window.kakaoMap.custom.bounds.contain(center)) return
    const sw = window.kakaoMap.custom.bounds.getSouthWest()
    const ne = window.kakaoMap.custom.bounds.getNorthEast()
    const clipLat = Math.min(Math.max(center.getLat(), sw.getLat()), ne.getLat())
    const clipLng = Math.min(Math.max(center.getLng(), sw.getLng()), ne.getLng())
    window.kakaoMap.setCenter(new window.kakao.maps.LatLng(clipLat, clipLng))
  }

  const onIdle = () => {
    const level = window.kakaoMap.getLevel()
    const center = parseLocation<TypeMap["location"]["center"]>(window.kakaoMap.getCenter().toString())
    const bounds = parseLocation<TypeMap["location"]["bounds"]>(window.kakaoMap.getBounds().toString())
    setMap((prev) => ({ ...prev, location: { ...prev.location, level, center, bounds } }))
    return { level, center, bounds }
  }

  const onClick = async (event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) return
    if (!event.target.classList.contains("marker")) return
    const route = getRoute(event.target.dataset.navigate ?? "")
    await route?.onPreload()
    navigate(event.target.dataset.navigate ?? "")
    if (!bottomSheetStructure.get("LocationSheet")) onMount("LocationSheet", {})
  }

  const onMove = (options: { level?: TypeMap["location"]["level"]; center: TypeMap["location"]["center"] }) => {
    const moveLatLon = new window.kakao.maps.LatLng(options.center[0], options.center[1])
    if (options?.level) window.kakaoMap.setLevel(options?.level)
    window.kakaoMap.panTo(moveLatLon)
    const location = onIdle()
    setMapCapture((prev) => ({ ...prev, location }))
  }

  const onOverlay = (markers: TypeMarker[]) => {
    if (window.kakaoOverlay) window.kakaoOverlay.forEach((overlay) => overlay.setMap(null))
    const overlay = markers.map(({ center, anchor: [xAnchor, yAnchor], content }) => {
      const options = { position: new window.kakao.maps.LatLng(center[0], center[1]), xAnchor, yAnchor, content }
      const marker = new window.kakao.maps.CustomOverlay({ clickable: true, ...options })
      marker.setMap(window.kakaoMap)
      return marker
    })
    window.kakaoOverlay = overlay
  }

  const onRemove = () => {
    setMap((prev) => ({ ...prev, status: { ...prev.status, isInitialized: false } }))
    if (scriptRef.current) scriptRef.current.removeEventListener("load", onLoad)
    if (scriptRef.current) scriptRef.current.remove()
    if (containerRef.current) containerRef.current.removeEventListener("click", onClick)
    if (window.kakaoOverlay) window.kakaoOverlay.forEach((overlay) => overlay.setMap(null))
    if (window.kakaoMap) window?.kakao?.maps?.event?.removeEventListener?.(window.kakaoMap, "idle", onIdle)
  }

  return {
    mapRefs: {
      containerRef,
    },
    mapStructure: { ...map, capture: mapCapture },
    onInit,
    onCapture: setMapCapture,
    onMove,
    onOverlay,
    onRemove,
  }
}

export default useMap
