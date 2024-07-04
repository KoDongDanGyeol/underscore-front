import { Fragment, Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { useRecoilValue } from "recoil"
import { atomGlobal } from "@/stores/global"
import { PolymorphicComponentProp } from "@/types/polymorphic"
import Common from "@/components/layout/Common"
import Service from "@/components/layout/Service"
import Map from "@/components/layout/Map"
import Mypage from "@/components/layout/Mypage"
import Auth from "@/components/layout/Auth"
import Policy from "@/components/layout/Policy"

type TypeElement = () => React.ReactElement
type TypeModule = { default: TypeElement; Pending: TypeElement; Failure: TypeElement }

export interface RouterProviderProps {
  //
}

export interface RouterElementProps {
  layoutEl: React.ForwardRefExoticComponent<PolymorphicComponentProp<"main" | "div">>
  componentEl: React.LazyExoticComponent<TypeElement> | TypeElement
  errorEl: React.ElementType
}

export const getRoute = (path: string) => {
  return SPECIFIED_ROUTES.find((route) => path.match(new RegExp(route.path.replace(/:\w+|\*/g, ".*")))?.[0] === path)
}

export const getLayout = (path: string) => {
  if (/^\/$/.test(path)) return Service
  if (/^\/map/.test(path)) return Map
  if (/^\/auth/.test(path)) return Auth
  if (/^\/mypage/.test(path)) return Mypage
  if (/^\/policy/.test(path)) return Policy
  return Common
}

export const PRESERVED = import.meta.glob<TypeModule>("/src/pages/(_error404|_error500).tsx", { eager: true })
export const PRESERVED_ROUTES: Partial<Record<string, TypeElement>> = Object.keys(PRESERVED).reduce((routes, route) => {
  const path = route.replace(/\/src\/pages\/|\.tsx$/g, "")
  return { ...routes, [path]: PRESERVED[route].default }
}, {})

export const SPECIFIED = import.meta.glob<TypeModule>("/src/pages/**/[@?a-z[]*.tsx", { eager: false })
export const SPECIFIED_ROUTES = Object.keys(SPECIFIED).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[([^\]]+)\]/g, ":$1")
    .replace(/(.+)(\/)$/, "$1")
  return {
    path,
    isPublic: !/^\/mypage/.test(path),
    layoutEl: getLayout(path),
    componentEl: lazy(SPECIFIED[route]),
    onPreload: SPECIFIED[route],
  }
})

const RouterElement = (props: RouterElementProps) => {
  const { layoutEl: Layout, componentEl: Component, errorEl: Error } = props

  return (
    <ErrorBoundary FallbackComponent={(props) => <Error {...props} />}>
      <Suspense fallback={<Common.Loading />}>
        <Fragment>
          <Layout>
            <Component />
          </Layout>
        </Fragment>
      </Suspense>
    </ErrorBoundary>
  )
}

const RouterProvider = (props: RouterProviderProps) => {
  const {} = props

  const global = useRecoilValue(atomGlobal)
  const Error404 = PRESERVED_ROUTES?.["_error404"] || (() => <div>Error404</div>)
  const Error500 = PRESERVED_ROUTES?.["_error500"] || (() => <div>Error500</div>)

  return (
    <Routes>
      {SPECIFIED_ROUTES.map(({ path, isPublic, layoutEl, componentEl }) => {
        if (!isPublic && !global.logged) {
          return <Route key={path} path={path} element={<Navigate to="/auth/join" replace={true} />} />
        }
        const element = <RouterElement layoutEl={layoutEl} componentEl={componentEl} errorEl={Error500} />
        return <Route key={path} path={path} element={element} />
      })}
      <Route path="/map" element={<Navigate to="/map/category" replace={true} />} />
      <Route path="/auth" element={<Navigate to="/auth/join" replace={true} />} />
      <Route path="/mypage" element={<Navigate to="/mypage/profile" replace={true} />} />
      <Route path="/policy" element={<Navigate to="/map/category" replace={true} />} />
      <Route path="*" element={<RouterElement layoutEl={Common} componentEl={Error404} errorEl={Error500} />} />
    </Routes>
  )
}

export default RouterProvider
