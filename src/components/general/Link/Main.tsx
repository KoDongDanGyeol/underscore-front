import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, LinkProps } from "react-router-dom"
import { SPECIFIED_ROUTES } from "@/providers/RouterProvider"
import useOnScreen from "@/hooks/useOnScreen"

export interface LinkMainProps extends LinkProps {
  prefetch?: boolean
}

type TypeStructure = {
  isPrefetched: boolean
}

const getRoute = (path: string) => {
  return SPECIFIED_ROUTES.find((route) => path.match(new RegExp(route.path.replace(/:\w+|\*/g, ".*")))?.[0] === path)
}

const LinkMain = (props: LinkMainProps) => {
  const { children, to, prefetch = true, ...restProps } = props

  const [structure, setStructure] = useState<TypeStructure>({
    isPrefetched: false,
  })
  const { onScreenStructure, onScreenRefs } = useOnScreen<HTMLAnchorElement>({
    rootMargin: "100px",
  })

  const route = useMemo(() => getRoute(to as string), [to])
  const prefetchable = Boolean(route && !structure.isPrefetched)
  const preload = useCallback(() => {
    route?.onPreload()
    setStructure((prev) => ({ ...prev, isPrefetched: true }))
  }, [route])

  useEffect(() => {
    if (!prefetch) return
    if (!prefetchable) return
    if (!onScreenStructure.isVisible) return
    preload()
  }, [onScreenStructure.isVisible, prefetch, prefetchable, preload])

  const onMouseEnter = () => {
    if (!prefetchable) return
    preload()
  }

  return (
    <Link ref={onScreenRefs.containerRef} to={to} onMouseEnter={onMouseEnter} {...restProps}>
      {children}
    </Link>
  )
}

export default LinkMain
