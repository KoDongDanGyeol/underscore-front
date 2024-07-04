import ResultMain, { ResultMainProps } from "@/components/display/Result/Main"
import ResultHeadline, { ResultHeadlineProps } from "@/components/display/Result/Headline"
import ResultEmpty, { ResultEmptyProps } from "@/components/display/Result/Empty"

export { type ResultMainProps, type ResultHeadlineProps, type ResultEmptyProps }

export default Object.assign(ResultMain, {
  Headline: ResultHeadline,
  Empty: ResultEmpty,
})
