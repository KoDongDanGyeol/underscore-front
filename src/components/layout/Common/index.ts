import CommonMain, { CommonMainProps } from "@/components/layout/Common/Main"
import CommonPage, { CommonPageProps } from "@/components/layout/Common/Page"

export { type CommonMainProps, type CommonPageProps }

export default Object.assign(CommonMain, {
  Page: CommonPage,
})
