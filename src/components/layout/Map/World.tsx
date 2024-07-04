import { useEffect } from "react"
import styled, { css } from "styled-components"
import useMap from "@/hooks/useMap"
import useMount from "@/hooks/useMount"
import useGeolocation from "@/hooks/useGeolocation"
import { isEquals } from "@/libs/utils"
import { FallbackCoordinates } from "@/components/layout/Map"
import Button from "@/components/general/Button"
import Loading from "@/components/display/Loading"

export interface MapWorldProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const MapWorld = (props: MapWorldProps) => {
  const { className = "", ...restProps } = props

  const { mapRefs, mapStructure, onInit, onRemove } = useMap()
  const { geolocationStructure, onOverwrite } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1,
    maximumAge: 1000 * 3600 * 24,
  })

  const { mountStructure } = useMount(() => {
    if (!geolocationStructure.isLoaded) return
    const center = !isEquals(mapStructure.location.center, [0, 0])
      ? { latitude: mapStructure.location.center[0], longitude: mapStructure.location.center[1] }
      : geolocationStructure?.coordinates ?? FallbackCoordinates
    onInit({ level: mapStructure.location.level || 3, center: [center.latitude, center.longitude] })
  }, [geolocationStructure.isLoaded])

  useEffect(() => {
    return () => {
      onRemove()
    }
  }, [])

  if (!mountStructure.isMounted) {
    return (
      <MapWorldContainer $isPending={true}>
        <MapWorldSpinner />
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
    <MapWorldContainer className={`${className}`} $isPending={false} {...restProps}>
      <div id="world" ref={mapRefs.containerRef} />
    </MapWorldContainer>
  )
}

type StyledMapViewMain = {
  $isPending: boolean
}

const MapWorldSpinner = styled(Loading)`
  font-size: 24px;
`

const MapWorldContainer = styled.div<StyledMapViewMain>`
  position: relative;
  height: 100%;
  #world {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    div:has(> .marker:hover),
    div:has(> .marker:focus),
    div:has(> .marker.marker-active) {
      z-index: 10 !important;
    }
  }
  .marker-pin {
    width: 32px;
    font-size: 32px;
    color: rgb(var(--color-red400));
    transform-origin: center bottom;
    &:hover,
    &:focus,
    &.marker-active {
      color: rgb(var(--color-red600));
      transform: scale(1.2);
    }
  }
  .overlay-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 16px;
    color: rgb(var(--color-neutral100));
    background: rgb(var(--color-red500));
    strong {
    }
    span {
      font-weight: 700;
    }
    &:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      display: block;
      border-left: 12px solid rgb(var(--color-red500));
      border-bottom: 12px solid transparent;
      transform: translateY(-2px);
    }
    &:hover,
    &:focus,
    &.active {
      transform: scale(1.2) translateY(-2px);
      transform-origin: left bottom;
      background: rgb(var(--color-red600));
      &:before {
        border-left-color: rgb(var(--color-red600));
      }
    }
  }
  ${(props) => {
    switch (props.$isPending) {
      case true:
        return css`
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          strong {
            margin-top: 12px;
          }
          :is(a, button) {
            margin-top: 2px;
          }
        `
      case false:
      default:
        return css`
          /*  */
        `
    }
  }}
`

export default MapWorld
