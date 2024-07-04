import MapMain, { MapMainProps } from "@/components/layout/Map/Main"
import MapPage, { MapPageProps } from "@/components/layout/Map/Page"
import MapWorld, { MapWorldProps } from "@/components/layout/Map/World"
import MapHeadline, { MapHeadlineProps } from "@/components/layout/Map/Headline"
import MapReport, { MapReportProps } from "@/components/layout/Map/Report"
import { FallbackCoordinates, BoundSWCoordinates, BoundNECoordinates } from "@/components/layout/Map/type"

export {
  FallbackCoordinates,
  BoundSWCoordinates,
  BoundNECoordinates,
  type MapMainProps,
  type MapPageProps,
  type MapWorldProps,
  type MapHeadlineProps,
  type MapReportProps,
}

export default Object.assign(MapMain, {
  Page: MapPage,
  World: MapWorld,
  Headline: MapHeadline,
  Report: MapReport,
})
