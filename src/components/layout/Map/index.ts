import MapMain, { MapMainProps } from "@/components/layout/Map/Main"
import MapPage, { MapPageProps } from "@/components/layout/Map/Page"

export { type MapMainProps, type MapPageProps }

export default Object.assign(MapMain, {
  Page: MapPage,
})
