import { useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import useMount from "@/hooks/useMount"
import useBottomSheet from "@/hooks/useBottomSheet"
import useTouch from "@/hooks/useTouch"
import useFocusTrap from "@/hooks/useFocusTrap"
import { NonUndefined } from "@/libs/utils"
import Loading from "@/components/display/Loading"

export interface BottomSheetMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  name: string
  spreadable?: boolean
  hasDim?: boolean
  hasTrap?: boolean
  hasHandle?: boolean
  beforeClose?: () => void
  afterClose?: () => void
}

const BottomSheetMain = (props: BottomSheetMainProps) => {
  const {
    name,
    spreadable = false,
    hasDim = true,
    hasTrap = true,
    hasHandle = true,
    className = "",
    children,
    beforeClose,
    afterClose,
    ...restProps
  } = props

  const {} = useMount(() => {
    ;(async () => {
      focusTrapRefs.returnRef.current = document.activeElement as HTMLButtonElement
      hasTrap && onActivate()
      await onOpen(name)
      onInit()
    })()
    return async () => {
      hasTrap && onDeactivate()
      !hasTrap && (document.querySelector(`#trigger-${name}`) as HTMLElement)?.focus?.()
      await onFold(name)
      onRemove()
    }
  }, [])

  const { bottomSheetStructure, onInput, onUnmount, onOpen, onFold } = useBottomSheet()
  const { touchStructure, touchRefs, onInit, onRemove } = useTouch()
  const { focusTrapRefs, onActivate, onDeactivate } = useFocusTrap([["Escape", async () => hasTrap && onClose()]])

  const currentSheet = bottomSheetStructure.get(name)
  const spinnerRef = useRef<HTMLDivElement | null>(null)

  const onClose = async () => {
    beforeClose?.()
    await onFold(name)
    hasTrap && (await onDeactivate())
    !hasTrap && (document.querySelector(`#trigger-${name}`) as HTMLElement)?.focus?.()
    onUnmount(name)
    afterClose?.()
  }

  useEffect(() => {
    if (!touchRefs.containerRef.current) return
    if (!touchStructure.isScrambled)
      switch (touchStructure.moved.directionY) {
        case -1:
          if (touchStructure.moved.movedY > -100) break
          if (!spreadable) break
          if (!currentSheet?.isSpread) onInput(name, { isSpread: true })
          break
        case 1:
          if (touchStructure.moved.movedY < 100) break
          if (!spreadable) onClose()
          else if (!currentSheet?.isSpread) onClose()
          else if (currentSheet?.isSpread) onInput(name, { isSpread: false })
          break
        case 0:
        default:
          if (spinnerRef.current) spinnerRef.current.style.removeProperty("height")
          if (spinnerRef.current) spinnerRef.current.style.removeProperty("transform")
          touchRefs.containerRef.current.style.removeProperty("transition")
          touchRefs.containerRef.current.style.removeProperty("transform")
          break
      }
    else
      switch (touchStructure.moved.directionY) {
        case -1: {
          const transformY = Math.abs(Math.ceil((touchStructure.moved.movedY ?? 0) / 3))
          const scale = transformY >= 20 ? 1 : transformY / 20
          if (!spreadable) break
          if (currentSheet?.isSpread) break
          if (spinnerRef.current) spinnerRef.current.style.height = `${transformY}px`
          if (spinnerRef.current) spinnerRef.current.style.transform = `scale(${scale})`
          touchRefs.containerRef.current.style.removeProperty("transition")
          touchRefs.containerRef.current.style.removeProperty("transform")
          break
        }
        case 1: {
          const transformY = Math.abs(Math.ceil((touchStructure.moved.movedY ?? 0) / 3))
          if (spinnerRef.current) spinnerRef.current.style.removeProperty("height")
          if (spinnerRef.current) spinnerRef.current.style.removeProperty("transform")
          touchRefs.containerRef.current.style.setProperty("transition", "none")
          touchRefs.containerRef.current.style.setProperty("transform", `translateY(calc(-100% + ${transformY}px))`)
          break
        }
        case 0:
        default: {
          if (spinnerRef.current) spinnerRef.current.style.removeProperty("height")
          if (spinnerRef.current) spinnerRef.current.style.removeProperty("transform")
          touchRefs.containerRef.current.style.removeProperty("transition")
          touchRefs.containerRef.current.style.removeProperty("transform")
          break
        }
      }
  }, [touchStructure])

  return (
    <BottomSheetMainContainer
      ref={focusTrapRefs.containerRef}
      className={`${className}`}
      $isPending={currentSheet?.isPending ?? false}
      $isOpened={currentSheet?.isOpened ?? false}
      $hasDim={hasDim}
      $hasHandle={hasHandle}
      {...restProps}
    >
      {hasDim && <BottomSheetMainDim onClick={onClose} />}
      <BottomSheetMainDialog ref={touchRefs.containerRef} role="dialog" tabIndex={0} aria-modal={true}>
        {hasHandle && (
          <BottomSheetHandle>
            <BottomSheetMainStick type="button" onClick={onClose}>
              <span className="sr-only">Handle</span>
            </BottomSheetMainStick>
          </BottomSheetHandle>
        )}
        <BottomSheetMainContent ref={touchRefs.contentRef}>
          {children}
          {touchStructure.moved.directionY === -1 && <BottomSheetMainSpinner ref={spinnerRef} />}
        </BottomSheetMainContent>
      </BottomSheetMainDialog>
    </BottomSheetMainContainer>
  )
}

type StyldBottomSheetMain = {
  $isPending: boolean
  $isOpened: boolean
  $hasDim: NonUndefined<BottomSheetMainProps["hasDim"]>
  $hasHandle: NonUndefined<BottomSheetMainProps["hasHandle"]>
}

const BottomSheetHandle = styled.div`
  position: sticky;
  top: 0;
  left: 50%;
  width: 100%;
  padding: 12px 0 6px;
  background: rgb(var(--color-neutral100));
  box-shadow: 0 0 0 1px rgb(var(--color-neutral100));
`

const BottomSheetMainStick = styled.button`
  display: block;
  margin: 0 auto;
  width: 24px;
  height: 4px;
  border-radius: 4px;
  background: rgb(var(--color-neutral500));
`

const BottomSheetMainContent = styled.div`
  padding: 20px 24px 12px;
  &:not(:first-child) {
    padding-top: 0;
  }
`

const BottomSheetMainSpinner = styled(Loading)`
  height: 0;
  font-size: 16px;
  overflow: hidden;
`

const BottomSheetMainDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(var(--color-neutral1300), 0.45);
  transition: opacity 200ms var(--motion-ease-out);
  pointer-events: all;
`

const BottomSheetMainDialog = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  background: rgb(var(--color-neutral100));
  border: 1px solid rgb(var(--color-neutral500));
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 0 2px rgba(var(--color-neutral500), 0.1);
  transition: transform 200ms var(--motion-ease-out);
  pointer-events: all;
`

const BottomSheetMainContainer = styled.div<StyldBottomSheetMain>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  pointer-events: none;
  ${(props) => {
    if (props.$isOpened && !props.$isPending) {
      return css`
        ${BottomSheetMainDim} {
          opacity: 1;
        }
        ${BottomSheetMainDialog} {
          transform: translateY(-100%);
        }
      `
    }
    return css`
      ${BottomSheetMainDim} {
        opacity: 0;
      }
      ${BottomSheetMainDialog} {
        transform: translateY(0%);
      }
    `
  }}
`

export default BottomSheetMain
