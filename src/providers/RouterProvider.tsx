import { Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { checkAuthenticated } from "@/libs/utils"
import { PolymorphicComponentProp } from "@/types/polymorphic"
import Common from "@/components/layout/Common"
import Map from "@/components/layout/Map"
import Mypage from "@/components/layout/Mypage"
import Auth from "@/components/layout/Auth"
import Loading from "@/components/display/Loading"

type TypeElement = () => React.ReactElement
type TypeModule = { default: TypeElement; Pending: TypeElement; Failure: TypeElement }

export interface RouterProviderProps {
  //
}

export interface RouterElementProps {
  layoutEl: React.ForwardRefExoticComponent<PolymorphicComponentProp<"main" | "div">>
  componentEl: React.LazyExoticComponent<TypeElement> | TypeElement
}

export const PRESERVED = import.meta.glob<TypeModule>("/src/pages/_error.tsx", { eager: true })
export const PRESERVED_ROUTES: Partial<Record<string, TypeElement>> = Object.keys(PRESERVED).reduce((routes, route) => {
  const path = route.replace(/\/src\/pages\/|\.tsx$/g, "")
  return { ...routes, [path]: PRESERVED[route].default }
}, {})

export const SPECIFIED = import.meta.glob<TypeModule>("/src/pages/**/[@?a-z[]*.tsx", { eager: false })
export const SPECIFIED_ROUTES = Object.keys(SPECIFIED).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1")
    .replace(/(.+)(\/)$/, "$1")
  const isPublic = !/^\/mypage/.test(path)
  return {
    path,
    isPublic,
    layoutEl: /^\/map/.test(path) ? Map : /^\/auth/.test(path) ? Auth : /^\/mypage/.test(path) ? Mypage : Common,
    componentEl: lazy(SPECIFIED[route]),
    onPreload: SPECIFIED[route],
  }
})

const RouterElement = (props: RouterElementProps) => {
  const { layoutEl: Layout, componentEl: Component } = props

  return (
    <Layout>
      <Component />
    </Layout>
  )
}

const RouterProvider = (props: RouterProviderProps) => {
  const {} = props

  const Error = PRESERVED_ROUTES?.["_error"] || (() => <div>Error</div>)

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {SPECIFIED_ROUTES.map(({ path, isPublic, layoutEl, componentEl }) => {
          if (!isPublic && !checkAuthenticated()) {
            return <Route key={path} path={path} element={<Navigate to="/auth/join" replace={true} />} />
          }
          return (
            <Route key={path} path={path} element={<RouterElement layoutEl={layoutEl} componentEl={componentEl} />} />
          )
        })}
        <Route path="/map" element={<Navigate to="/map/category" replace={true} />} />
        <Route path="/mypage" element={<Navigate to="/mypage/profile" replace={true} />} />
        <Route path="*" element={<RouterElement layoutEl={Common} componentEl={Error} />} />
      </Routes>
    </Suspense>
  )
}

export default RouterProvider
