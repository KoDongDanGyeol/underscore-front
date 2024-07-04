import { useLocation } from "react-router-dom"
import styled from "styled-components"
import useDropdown from "@/hooks/useDropdown"
import useBottomSheet from "@/hooks/useBottomSheet"
import Common from "@/components/layout/Common"
import Link from "@/components/general/Link"
import Icon from "@/components/general/Icon"
import Picture from "@/components/general/Picture"
import Button from "@/components/general/Button"

export interface CommonHeaderProps extends React.HTMLAttributes<HTMLElement> {
  //
}

const CommonHeader = (props: CommonHeaderProps) => {
  const { className = "", ...restProps } = props

  const { pathname } = useLocation()
  const { bottomSheetStructure, onMount, onUnmount } = useBottomSheet()
  const { dropdownStructure, onOpen, onFold } = useDropdown({
    defaultOpen: false,
    delayOpen: 50,
    delayClose: 200,
  })

  const domain = pathname.replace(/(\/[^/]+).*/, "$1")
  const hasLocationSheet = !!bottomSheetStructure.get("LocationSheet")

  return (
    <CommonHeaderContainer className={`${className}`} {...restProps}>
      <CommonHeaderButton
        type="button"
        shape="plain"
        size="lg"
        variants="secondary"
        prefixEl={(props: Record<string, unknown>) => <Icon name="Menu" label="메뉴 (열기)" {...props} />}
        aria-haspopup="menu"
        aria-expanded={dropdownStructure.isOpened}
        onClick={dropdownStructure.isOpened ? onFold : onOpen}
      />
      <CommonHeaderLogo>
        <Link to="/">
          <Picture src="/logo.svg" alt={import.meta.env.VITE_SERVICE_NAME} ratio={[429, 85]} />
        </Link>
      </CommonHeaderLogo>
      <Common.Navigation
        isOpened={dropdownStructure.isOpened}
        isPending={dropdownStructure.isPending}
        onClose={onFold}
      />
      <CommonHeaderUtils>
        {domain === "/map" && (
          <CommonHeaderButton
            type="button"
            id="trigger-LocationSheet"
            shape="plain"
            size="lg"
            variants="secondary"
            prefixEl={(props: Record<string, unknown>) => (
              <Icon name="FundProjectionScreen" label={`지도분석 (${hasLocationSheet ? `닫기` : `열기`})`} {...props} />
            )}
            aria-haspopup={true}
            aria-expanded={hasLocationSheet}
            onClick={() => {
              hasLocationSheet ? onUnmount("LocationSheet") : onMount("LocationSheet", {})
            }}
          />
        )}
      </CommonHeaderUtils>
    </CommonHeaderContainer>
  )
}

const CommonHeaderLogo = styled.h1`
  a {
    margin: 0 auto;
    display: block;
    width: 140px;
    padding: 8px;
  }
`

const CommonHeaderButton = styled(Button)`
  padding: 8px;
`

const CommonHeaderUtils = styled.div`
  flex: 1 1 0px;
  display: flex;
  justify-content: flex-end;
`

const CommonHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 12px;
  background: rgb(var(--color-neutral100));
  box-shadow: 0px 2px 8px 0px rgba(var(--color-neutral1300), 0.15);
  z-index: 1000;
`

export default CommonHeader
