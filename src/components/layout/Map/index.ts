import MapMain, { MapMainProps } from "@/components/layout/Map/Main"
import MapPage, { MapPageProps } from "@/components/layout/Map/Page"
import MapWorld, { MapWorldProps } from "@/components/layout/Map/World"
import { FallbackCoordinates } from "@/components/layout/Map/type"

export { FallbackCoordinates, type MapMainProps, type MapPageProps, type MapWorldProps }

export default Object.assign(MapMain, {
  Page: MapPage,
  World: MapWorld,
})
