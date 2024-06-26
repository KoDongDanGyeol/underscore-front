import { forwardRef, useRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import useMap from "@/hooks/useMap"
import useMount from "@/hooks/useMount"
import useBottomSheet from "@/hooks/useBottomSheet"
import { Timer, setTimer, clearTimer } from "@/libs/timer"
import Common from "@/components/layout/Common"
import Map from "@/components/layout/Map"
import BottomSheet from "@/components/layout/BottomSheet"

export type MapMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    //
  }
>

const MapMain = <C extends React.ElementType = "div">(props: MapMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, className = "", children, ...restProps } = props

  const timers = useRef<Timer>({ delay: null })
  const { mapStructure } = useMap()
  const { bottomSheetStructure, onMount } = useBottomSheet()
  const {} = useMount(() => {
    ;(async () => {
      if (!mapStructure.isInitialized) return
      await setTimer(timers, { key: "delay", delay: 50 })
      clearTimer(timers, { key: "delay" })
      onMount("LocationSheet", {})
    })()
  }, [mapStructure.isInitialized])

  return (
    <MapMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <Common.Header />
      <Map.World />
      {!!bottomSheetStructure.get("LocationSheet") && (
        <MapMainSheet name="LocationSheet" spreadable={true} hasTrap={false} hasDim={false} hasHandle={true}>
          LocationSheet
          {bottomSheetStructure.get("LocationSheet")?.isSpread && children}
        </MapMainSheet>
      )}
    </MapMainContainer>
  )
}

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
`

export default forwardRef(MapMain)
