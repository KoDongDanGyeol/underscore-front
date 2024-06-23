import PolicyMain, { PolicyMainProps } from "@/components/layout/Policy/Main"
import PolicyPage, { PolicyPageProps } from "@/components/layout/Policy/Page"

export { type PolicyMainProps, type PolicyPageProps }

export default Object.assign(PolicyMain, {
  Page: PolicyPage,
})
