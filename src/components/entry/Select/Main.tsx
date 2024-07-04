import { Fragment, useMemo } from "react"
import styled from "styled-components"
import { useController, Control, FieldValues, FieldPath, RegisterOptions } from "react-hook-form"
import useDropdown from "@/hooks/useDropdown"
import Icon from "@/components/general/Icon"
import Button from "@/components/general/Button"
import Select, { TypeOption, TypeOptionGroup } from "@/components/entry/Select"

export interface SelectMainProps<T extends FieldValues>
  extends Omit<React.HTMLAttributes<HTMLSelectElement>, "onChange" | "onBlur"> {
  control: Control<T>
  name: FieldPath<T>
  rules: RegisterOptions<T>
  optionLabel: TypeOption<T>
  optionGroups: TypeOptionGroup<T>[]
  disabled?: boolean
  multiple?: boolean
  helperEl?: React.ElementType
  convertValue?: (value: T[FieldPath<T>]) => T[FieldPath<T>]
  onChange?: () => void
  onBlur?: () => void
}

const SelectMain = <T extends FieldValues>(props: SelectMainProps<T>) => {
  const {
    control,
    name,
    rules,
    optionLabel,
    optionGroups = [],
    disabled = false,
    multiple = false,
    helperEl: HelperEl = null,
    className = "",
    convertValue = (value: T[FieldPath<T>]) => value,
    onChange,
    onBlur,
    ...restProps
  } = props

  const { field, fieldState } = useController({ control, name, rules })
  const { dropdownStructure, onOpen, onFold } = useDropdown({
    defaultOpen: false,
    delayOpen: 50,
    delayClose: 200,
  })
  const placeholders = useMemo(() => {
    if (optionLabel.value === field.value) return [optionLabel]
    if (multiple) {
      const options = optionGroups
        .flatMap((group) => group.options)
        .filter(({ value: _value }) => field.value.includes(_value))
      return options.length ? options : [optionLabel]
    }
    const options = optionGroups.flatMap((group) => group.options).filter(({ value: _value }) => _value === field.value)
    return options ?? [optionLabel]
  }, [field.value])

  return (
    <Fragment>
      <SelectMainContainer className={`${className}`} $isDisabled={disabled} $isInvalid={Boolean(fieldState.error)}>
        <select
          name={name}
          value={field.value || (multiple ? [] : "")}
          required={Boolean(rules?.required)}
          multiple={multiple}
          disabled={true}
          className="sr-only"
          onChange={(event) => {
            const newValue = multiple
              ? Array.from(event.target.selectedOptions)
                  .map(({ value }) => convertValue(value as T[FieldPath<T>]))
                  .filter(Boolean)
              : convertValue((event.target.value ? event.target.value : null) as T[FieldPath<T>])
            field.onChange(newValue)
            onChange?.()
          }}
          onBlur={() => {
            field.onBlur()
            onBlur?.()
          }}
          {...restProps}
        >
          {optionLabel && (
            <option value={optionLabel.value} disabled={optionLabel.disabled}>
              {`${optionLabel.text} 선택`}
            </option>
          )}
          {optionGroups.map(({ label, options }) => {
            if (optionGroups.length === 1) {
              return options.map(({ text, value, disabled }) => (
                <option key={value} value={value} disabled={disabled}>
                  {text}
                </option>
              ))
            }
            return (
              <optgroup key={label} label={label}>
                {options.map(({ text, value, disabled }) => (
                  <option key={value} value={value} disabled={disabled}>
                    {text}
                  </option>
                ))}
              </optgroup>
            )
          })}
        </select>
        <SelectMainLabel
          id={name}
          ref={field.ref}
          type="button"
          variants="secondary"
          isActive={Boolean(multiple ? field.value.length : field.value)}
          disabled={disabled}
          suffixEl={(props: Record<string, unknown>) => (
            <Icon
              name={dropdownStructure.isOpened ? "CaretUp" : "CaretDown"}
              label={`${optionLabel.text} 선택`}
              {...props}
            />
          )}
          aria-haspopup="listbox"
          aria-expanded={dropdownStructure.isOpened}
          onClick={dropdownStructure.isOpened ? onFold : onOpen}
        >
          {placeholders.map(({ text, value, componentEl: ComponentEl }, index) => (
            <span key={value}>
              {index === 0 ? null : ", "}
              {ComponentEl ? <ComponentEl /> : text}
            </span>
          ))}
        </SelectMainLabel>
        <SelectMainDropdown>
          <Select.List
            multiple={multiple}
            fieldValue={field.value}
            optionLabel={optionLabel}
            optionGroups={optionGroups}
            isOpened={dropdownStructure.isOpened}
            isPending={dropdownStructure.isPending}
            onFold={onFold}
            onChoose={(newValue: T[FieldPath<T>]) => {
              field.onChange(newValue)
              onChange?.()
            }}
          />
        </SelectMainDropdown>
      </SelectMainContainer>
      {HelperEl && <SelectMainHelper as={HelperEl} />}
    </Fragment>
  )
}

interface SelectMainStyled {
  $isDisabled: boolean
  $isInvalid: boolean
}

const SelectMainLabel = styled(Button)`
  width: 100%;
  span {
    flex: 1 1 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const SelectMainDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  transform: translateY(4px);
`

const SelectMainHelper = styled.div`
  /*  */
`

const SelectMainContainer = styled.div<SelectMainStyled>`
  position: relative;
`

export default SelectMain
