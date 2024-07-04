import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"
import styled from "styled-components"
import { checkCategory } from "@/libs/map"
import { TypeGetCategory, CategoryCodeDropdown } from "@/components/form/GetCategory"
import Select from "@/components/entry/Select"
import Helper from "@/components/entry/Helper"
import Label from "@/components/entry/Label"

export interface GetCategoryMainProps<T extends FieldValues = TypeGetCategory>
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLFormElement>> {
  data: UseFormReturn<T>
  placeholders?: {
    [key in keyof T]?: string
  }
  isLoading?: boolean
  isSuccess?: boolean
  onValid: SubmitHandler<T>
}

const GetCategoryMain = (props: GetCategoryMainProps) => {
  const { data, placeholders, isLoading, onValid, ...restProps } = props

  const { formState, control, handleSubmit } = data

  return (
    <GetCategoryMainContainer id="get-category" noValidate onSubmit={handleSubmit(onValid)} {...restProps}>
      <Label htmlFor="capture.categoryCode" isRequired={true} className="sr-only">
        {placeholders?.categoryCode ?? CategoryCodeDropdown.label.text}
      </Label>
      <Select
        control={control}
        name="capture.categoryCode"
        rules={{
          validate: {
            check: (value) => {
              if (checkCategory(value).isValid) return true
              return `${placeholders?.categoryCode ?? CategoryCodeDropdown.label.text} 옵션을 확인해주세요`
            },
          },
        }}
        multiple={false}
        optionLabel={{
          ...CategoryCodeDropdown.label,
          value: placeholders?.categoryCode ?? CategoryCodeDropdown.label.value,
        }}
        optionGroups={[
          {
            label: placeholders?.categoryCode ?? CategoryCodeDropdown.label.text,
            options: CategoryCodeDropdown.option.default,
          },
        ]}
        helperEl={() => <Helper variants="error">{formState?.errors?.capture?.categoryCode?.message}</Helper>}
        onChange={() => handleSubmit(onValid)()}
      />
    </GetCategoryMainContainer>
  )
}

const GetCategoryMainContainer = styled.form`
  /*  */
`

export default GetCategoryMain
