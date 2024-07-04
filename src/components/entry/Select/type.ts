import { FieldPath, FieldValues } from "react-hook-form"

export type TypeOption<T extends FieldValues> = {
  text: string
  value: T[FieldPath<T>]
  disabled?: boolean
  componentEl?: React.ElementType
}

export interface TypeOptionGroup<T extends FieldValues> {
  label: string
  options: TypeOption<T>[]
}
