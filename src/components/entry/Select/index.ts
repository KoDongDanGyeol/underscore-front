import SelectMain, { SelectMainProps } from "@/components/entry/Select/Main"
import SelectList, { SelectListProps } from "@/components/entry/Select/List"
import { TypeOption, TypeOptionGroup } from "@/components/entry/Select/type"

export { type SelectMainProps, type SelectListProps, type TypeOption, type TypeOptionGroup }

export default Object.assign(SelectMain, {
  List: SelectList,
})
