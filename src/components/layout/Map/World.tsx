import { useEffect } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import useMap from "@/hooks/useMap"
import useMount from "@/hooks/useMount"
import useGeolocation from "@/hooks/useGeolocation"
import { FallbackCoordinates } from "@/components/layout/Map"
import Button from "@/components/general/Button"
import Loading from "@/components/display/Loading"

export interface MapWorldProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const MapWorld = (props: MapWorldProps) => {
  const { className = "", ...restProps } = props

  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { mapRefs, mapStructure, onInit, onRemove } = useMap()
  const { geolocationStructure, onOverwrite } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1,
    maximumAge: 1000 * 3600 * 24,
  })

  const { mountStructure } = useMount(() => {
    if (!mountStructure.isMounted) return
    if (!geolocationStructure.isLoaded) return
    const params = Object.fromEntries(Array.from(searchParams.entries()))
    const center =
      params?.latitude && params?.longitude
        ? { latitude: parseFloat(params?.latitude), longitude: parseFloat(params?.longitude) }
        : geolocationStructure?.coordinates
          ? geolocationStructure?.coordinates
          : FallbackCoordinates
    onInit(parseFloat(params?.level ?? 3), [center.latitude, center.longitude])
    return () => {
      onRemove()
    }
  }, [geolocationStructure.isLoaded])

  useEffect(() => {
    if (!mountStructure.isMounted) return
    if (!mapStructure.isInitialized) return
    setSearchParams({
      level: mapStructure.level.toString(),
      latitude: mapStructure.center[0].toString(),
      longitude: mapStructure.center[1].toString(),
    })
  }, [mapStructure])

  useEffect(() => {
    if (!mountStructure.isMounted) return
    if (!mapStructure.isInitialized) return
    setSearchParams({
      level: mapStructure.level.toString(),
      latitude: mapStructure.center[0].toString(),
      longitude: mapStructure.center[1].toString(),
    })
  }, [pathname])

  if (!mountStructure.isMounted) {
    return (
      <MapWorldContainer $isPending={true}>
        <MapWorldSpinner />
        <strong>로딩중이에요</strong>
      </MapWorldContainer>
    )
  }

  if (!geolocationStructure.isLoaded) {
    return (
      <MapWorldContainer $isPending={true}>
        <MapWorldSpinner />
        <strong>위치정보 권한을 확인해주세요</strong>
        <Button type="button" shape="plain" variants="primary" onClick={() => onOverwrite(FallbackCoordinates)}>
          권한없이 시작하기
        </Button>
      </MapWorldContainer>
    )
  }

  return (
    <MapWorldContainer className={`${className}`} $isPending={!mapStructure.isInitialized} {...restProps}>
      {!mapStructure.isInitialized && <MapWorldSpinner />}
      <div id="world" ref={mapRefs.containerRef} />
    </MapWorldContainer>
  )
}

type StyledMapViewMain = {
  $isPending: boolean
}

const MapWorldSpinner = styled(Loading)`
  font-size: 24px;
  & + * {
    margin-top: 8px;
  }
`

const MapWorldContainer = styled.div<StyledMapViewMain>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  #world {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

export default MapWorld
