import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"
import { atomGlobal } from "@/stores/global"
import useFetchUser from "@/queries/auth/useFetchUser"
import { SPECIFIED_ROUTES } from "@/providers/RouterProvider"
import { CommonNavigationTree } from "@/components/layout/Common"
import Menu, { TyepMenuItem } from "@/components/navigation/Menu"
import Icon from "@/components/general/Icon"
import Picture from "@/components/general/Picture"
import useFocusTrap from "@/hooks/useFocusTrap"

export interface CommonNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpened: boolean
  isPending: boolean
  onClose: () => void
}

const CommonNavigation = (props: CommonNavigationProps) => {
  const { isOpened, isPending, className = "", onClose, ...restProps } = props

  const { pathname } = useLocation()
  const global = useRecoilValue(atomGlobal)
  const currentPath = pathname.split("/").filter(Boolean)

  const { focusTrapRefs, onActivate, onDeactivate } = useFocusTrap()

  // TODO
  const fetchUser = useFetchUser(0, {})
  console.log("fetchUser", fetchUser)

  const checkTree = (items: TyepMenuItem[]): TyepMenuItem[] => {
    return items.map((item) => {
      const isPubilc = SPECIFIED_ROUTES.find((route) => route.path === item.href)?.isPublic
      const href = item?.href && !isPubilc && !global.logged ? "/auth/join" : item?.href
      const newItem: TyepMenuItem = { ...item, href }
      if (item.items) newItem.items = checkTree(item.items)
      return newItem
    })
  }

  useEffect(() => {
    if (isOpened && !isPending) {
      document.body.classList.add("open-navigation")
      onActivate()
    } else {
      document.body.classList.remove("open-navigation")
      onDeactivate()
    }
  }, [isOpened, isPending])

  if (!isOpened && !isPending) {
    return null
  }

  return (
    <CommonNavigationContainer
      ref={focusTrapRefs.containerRef}
      className={`${className}`}
      $isPending={isPending}
      $isOpened={isOpened}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        event?.target === focusTrapRefs?.containerRef?.current && onClose()
      }}
      {...restProps}
    >
      <CommonNavigationPanel tabIndex={0}>
        <CommonNavigationHeader>
          <CommonNavigationLogo>
            <Picture src="/logo.svg" alt="logo" ratio={[429, 85]} />
          </CommonNavigationLogo>
        </CommonNavigationHeader>
        <CommonNavigationMenu>
          <Menu
            items={checkTree(CommonNavigationTree)}
            defaultOpened={currentPath.slice(0, currentPath.length - 1)}
            defaultSelected={currentPath}
            onNavigated={onClose}
          />
          <Menu
            items={[
              global.logged
                ? { key: "action", label: "로그아웃", href: "/logout" }
                : { key: "action", label: "로그인", href: "/auth/join" },
            ]}
            onNavigated={onClose}
          />
        </CommonNavigationMenu>
        <CommonNavigationClose type="button" onClick={onClose}>
          <Icon name="Close" label="메뉴 (닫기)" />
        </CommonNavigationClose>
      </CommonNavigationPanel>
    </CommonNavigationContainer>
  )
}

type StyledLayoutNavigation = {
  $isPending: boolean
  $isOpened: boolean
}

const CommonNavigationLogo = styled.strong`
  display: block;
  width: 120px;
`

const CommonNavigationHeader = styled.div`
  padding: 24px 54px 0 20px;
`

const CommonNavigationMenu = styled.nav`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
`

const CommonNavigationClose = styled.button`
  position: absolute;
  top: 24px;
  right: 20px;
  padding: 4px;
  font-size: 16px;
`

const CommonNavigationPanel = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 296px;
  height: 100%;
  background-color: rgb(var(--color-neutral100));
  transform: translateX(-100%);
  transition: transform 200ms;
  overflow-y: auto;
  box-shadow: 0px 2px 8px 0px rgba(var(--color-neutral1300), 0.15);
`

const CommonNavigationContainer = styled.div<StyledLayoutNavigation>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  background-color: rgba(var(--color-neutral1300), 0);
  transition: background-color 200ms;
  z-index: 1000;
  ${(props) => {
    if (props.$isOpened && !props.$isPending) {
      return css`
        background-color: rgba(var(--color-neutral1300), 0.3);
        ${CommonNavigationPanel} {
          transform: translateX(0%);
        }
      `
    }
  }}
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`

export default CommonNavigation
