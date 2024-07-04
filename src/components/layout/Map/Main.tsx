import { forwardRef } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import { availableLocation } from "@/libs/map"
import useMap from "@/hooks/useMap"
import useMount from "@/hooks/useMount"
import useBottomSheet from "@/hooks/useBottomSheet"
import { getRoute } from "@/providers/RouterProvider"
import Common from "@/components/layout/Common"
import Map from "@/components/layout/Map"
import BottomSheet from "@/components/layout/BottomSheet"
import Button from "@/components/general/Button"
import Icon from "@/components/general/Icon"
import Alert from "@/components/feedback/Alert"

export type MapMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const MapMain = <C extends React.ElementType = "div">(props: MapMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  const { pathname } = useLocation()
  const { mapStructure, onCapture } = useMap()
  const { bottomSheetStructure, onMount } = useBottomSheet()
  const {} = useMount(() => {
    ;(async () => {
      if (!mapStructure.status?.isInitialized) return
      const route = getRoute(pathname)
      await route?.onPreload()
      onMount("LocationSheet", {})
    })()
  }, [mapStructure.status?.isInitialized])

  const hasLocationSheet = !!bottomSheetStructure.get("LocationSheet")
  const onRefetch = () => {
    onCapture((prev) => ({ ...prev, location: mapStructure.location }))
    if (!hasLocationSheet) onMount("LocationSheet", {})
  }

  return (
    <MapMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <Common.Header />
      <Map.World />
      {hasLocationSheet && (
        <MapMainSheet name="LocationSheet" hasTrap={false} hasDim={false} hasHandle={true}>
          {children}
        </MapMainSheet>
      )}
      {mapStructure.status?.isInitialized && (
        <MapMainCondition>
          {!availableLocation(mapStructure.location) && (
            <Map.Report asTag={Alert} statusCode="error" hasIcon={true}>
              검색 범위 초과
            </Map.Report>
          )}
          {/^\/map\/[^/]+$/.test(pathname) && mapStructure.capture.isModified && (
            <Map.Report asTag={Button} type="button" prefixEl={() => <Icon name="Reload" />} onClick={onRefetch}>
              현 지도에서 재검색
            </Map.Report>
          )}
        </MapMainCondition>
      )}
    </MapMainContainer>
  )
}

const MapMainCondition = styled.div`
  position: absolute;
  top: calc(4vh + 48px);
  top: calc(4svh + 48px);
  left: 50%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 8px;
  transform: translate(-50%, -50%);
  z-index: 100;
`

const MapMainSheet = styled(BottomSheet)`
  [role="dialog"] {
    left: auto;
    right: 0;
    max-width: 386px;
  }
  @media ${(props) => props.theme.screen.device.md} {
    [role="dialog"] {
      max-width: 100%;
    }
  }
`

const MapMainContainer = styled.div`
  align-self: stretch;
  width: 100%;
  padding-top: 48px;
  body:has(&) {
    overflow: hidden;
  }
`

export default forwardRef(MapMain)
