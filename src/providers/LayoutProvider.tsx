import { useEffect, useMemo } from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import { atomGlobal } from "@/stores/global"
import useMount from "@/hooks/useMount"
import useResize from "@/hooks/useResize"
import { ObjectEntries, isEquals } from "@/libs/utils"
import { TypeScreenSizeKey, ScreenSize } from "@/styles/theme/screen"

export interface LayoutProviderProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const LayoutProvider = (props: LayoutProviderProps) => {
  const { className = "", children, ...restProps } = props

  const [global, setGlobal] = useRecoilState(atomGlobal)

  const { resizeStructure, onUpdate, onRemove } = useResize()

  const {} = useMount(() => {
    onUpdate()
    return () => {
      onRemove()
    }
  }, [])

  const currentScreen = useMemo<TypeScreenSizeKey[]>(() => {
    const result = [] as TypeScreenSizeKey[]
    const sizes = Object.entries(ScreenSize) as ObjectEntries<typeof ScreenSize>
    sizes.sort(([, a], [, b]) => parseInt(a) - parseInt(b))
    if (resizeStructure.windowInnerWidth === 0) {
      return result
    }
    for (const [key, value] of sizes) {
      result.push(key)
      if (resizeStructure.windowInnerWidth <= parseInt(value)) break
    }
    return result
  }, [resizeStructure.windowInnerWidth])

  useEffect(() => {
    if (isEquals(global.screen, currentScreen)) return
    setGlobal((prev) => ({ ...prev, screen: currentScreen }))
  }, [currentScreen, global.screen, setGlobal])

  return (
    <LayoutContainer className={`${className}`} {...restProps}>
      {children}
    </LayoutContainer>
  )
}

const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100svh;
`

export default LayoutProvider
