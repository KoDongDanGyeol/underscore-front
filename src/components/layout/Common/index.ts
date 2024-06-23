import CommonMain, { CommonMainProps } from "@/components/layout/Common/Main"
import CommonHeader, { CommonHeaderProps } from "@/components/layout/Common/Header"
import CommonPage, { CommonPageProps } from "@/components/layout/Common/Page"
import CommonFooter, { CommonFooterProps } from "@/components/layout/Common/Footer"
import CommonLoading, { CommonLoadingProps } from "@/components/layout/Common/Loading"
import CommonError, { CommonErrorProps } from "@/components/layout/Common/Error"

export {
  type CommonMainProps,
  type CommonHeaderProps,
  type CommonPageProps,
  type CommonFooterProps,
  type CommonLoadingProps,
  type CommonErrorProps,
}

export default Object.assign(CommonMain, {
  Header: CommonHeader,
  Page: CommonPage,
  Footer: CommonFooter,
  Loading: CommonLoading,
  Error: CommonError,
})
