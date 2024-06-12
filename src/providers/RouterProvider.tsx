import { Suspense, Fragment, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import Loading from "@/components/display/Loading"

type TypeElement = () => React.ReactElement
type TypeModule = { default: TypeElement; Pending: TypeElement; Failure: TypeElement }

export interface RouterProviderProps {
  //
}

export const PRESERVED = import.meta.glob<TypeModule>("/src/pages/_error.tsx", { eager: true })
export const PRESERVED_ROUTES: Partial<Record<string, TypeElement>> = Object.keys(PRESERVED).reduce((routes, route) => {
  const path = route.replace(/\/src\/pages\/|\.tsx$/g, "")
  return { ...routes, [path]: PRESERVED[route].default }
}, {})

export const SPECIFIED = import.meta.glob<TypeModule>("/src/pages/**/[a-z[]*.tsx", { eager: false })
export const SPECIFIED_ROUTES = Object.keys(SPECIFIED).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1")
  return { path, component: lazy(SPECIFIED[route]), preload: SPECIFIED[route] }
})

const RouterProvider = (props: RouterProviderProps) => {
  const {} = props

  const Error = PRESERVED_ROUTES?.["_error"] || Fragment

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {SPECIFIED_ROUTES.map(({ path, component: Component = Fragment }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  )
}

export default RouterProvider
