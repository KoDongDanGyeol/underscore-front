import { TypeMap } from "@/stores/map"
import { EnumCategoryCode } from "@/queries/map"
import { CategoryCodeDropdown } from "@/components/form/GetCategory"

export const parseLocation = <T extends number[]>(value: string) => {
  return (value.match(/(\d+(.)?\d+)/g) as string[]).map(parseFloat) as T
}

export const availableLocation = (location: Partial<TypeMap["location"]>) => {
  if (location?.level && Array.from({ length: 4 }, (_, index) => index + 1).includes(location?.level)) return true
  return false
}

export const checkCategory = (value: string = "") => {
  const option =
    Object.values(CategoryCodeDropdown.option)
      .flatMap((option: { value: EnumCategoryCode; text: string }[]) => option)
      .find(({ value: _value }) => _value === value) ?? null
  return {
    isValid: !!option,
    option,
  }
}
