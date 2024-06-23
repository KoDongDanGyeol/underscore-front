import AuthMain, { AuthMainProps } from "@/components/layout/Auth/Main"
import AuthPage, { AuthPageProps } from "@/components/layout/Auth/Page"
import AuthHeadline, { AuthHeadlineProps } from "@/components/layout/Auth/Headline"

export { type AuthMainProps, type AuthPageProps, type AuthHeadlineProps }

export default Object.assign(AuthMain, {
  Page: AuthPage,
  Headline: AuthHeadline,
})
