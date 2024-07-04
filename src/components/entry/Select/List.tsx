import { Fragment, useEffect } from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import styled, { css } from "styled-components"
import useFocusTrap from "@/hooks/useFocusTrap"
import Button from "@/components/general/Button"
import { TypeOption, TypeOptionGroup } from "@/components/entry/Select"

export interface SelectListProps<T extends FieldValues> extends React.HTMLAttributes<HTMLDivElement> {
  multiple: boolean
  fieldValue: T[FieldPath<T>]
  optionLabel: TypeOption<T>
  optionGroups: TypeOptionGroup<T>[]
  isOpened: boolean
  isPending: boolean
  onFold: () => void
  onChoose: (value: T[FieldPath<T>]) => void
}

const SelectList = <T extends FieldValues>(props: SelectListProps<T>) => {
  const {
    multiple,
    optionLabel,
    optionGroups = [],
    fieldValue,
    isOpened,
    isPending,
    className = "",
    onChoose,
    onFold,
    ...restProps
  } = props

  const { focusTrapRefs, onActivate, onDeactivate } = useFocusTrap([["Escape", async () => onClose()]])

  const onClick = (value: T[FieldPath<T>]) => {
    const newValue = multiple
      ? fieldValue.includes(value)
        ? fieldValue.filter((_value: T[FieldPath<T>]) => _value !== value)
        : [...fieldValue, value]
      : value
    onChoose(
      multiple
        ? optionGroups
            .flatMap((group) => group.options)
            .filter(({ value: _value }) => newValue.includes(_value))
            .map(({ value: _value }) => _value)
        : newValue,
    )
    !multiple && onClose()
  }

  const onClose = () => {
    onDeactivate()
    onFold()
  }

  useEffect(() => {
    if (isOpened && !isPending) {
      onActivate()
    } else {
      onDeactivate()
    }
  }, [isOpened, isPending])

  if (!isOpened && !isPending) {
    return null
  }

  return (
    <SelectListContainer
      role="listbox"
      ref={focusTrapRefs.containerRef}
      className={`${className}`}
      $isPending={isPending}
      $isOpened={isOpened}
      aria-label={`${optionLabel.text} 선택`}
      {...restProps}
    >
      <SelectListContent role="presentation" tabIndex={0}>
        {optionGroups.map(({ label, options }) => (
          <SelectListGroup role="group" key={label}>
            {optionGroups.length !== 1 && <SelectListLabel>{label}</SelectListLabel>}
            <Fragment>
              {options.map(({ value, text, disabled, componentEl: ComponentEl }) => {
                const isActive = multiple ? fieldValue.includes(value) : fieldValue === value
                return (
                  <SelectListButton
                    key={value}
                    role="option"
                    type="button"
                    value={value}
                    shape="plain"
                    disabled={disabled}
                    variants={isActive ? "primary" : "secondary"}
                    aria-selected={isActive}
                    isActive={isActive}
                    onClick={() => onClick(value)}
                  >
                    {ComponentEl ? <ComponentEl /> : text}
                  </SelectListButton>
                )
              })}
            </Fragment>
          </SelectListGroup>
        ))}
      </SelectListContent>
    </SelectListContainer>
  )
}

type StyledSelectList = {
  $isPending: boolean
  $isOpened: boolean
}

const SelectListLabel = styled.strong`
  display: block;
  padding: 2px 4px;
  font-weight: 500;
`

const SelectListButton = styled(Button)`
  display: block;
  padding: 2px 4px;
  width: 100%;
`

const SelectListGroup = styled.div`
  padding: 4px;
`

const SelectListContent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 128px;
  overflow-y: auto;
`

const SelectListContainer = styled.div<StyledSelectList>`
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms var(--motion-ease-out);
  border-radius: 6px;
  background: rgb(var(--color-neutral100));
  box-shadow: 0px 2px 8px 0px rgba(var(--color-neutral1300), 0.15);
  ${(props) => {
    if (props.$isOpened && !props.$isPending) {
      return css`
        grid-template-rows: 1fr;
      `
    }
  }}
`

export default SelectList
