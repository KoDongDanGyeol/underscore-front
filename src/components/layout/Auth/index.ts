import AuthMain, { AuthMainProps } from "@/components/layout/Auth/Main"
import AuthHeader, { AuthHeaderProps } from "@/components/layout/Auth/Header"
import AuthPage, { AuthPageProps } from "@/components/layout/Auth/Page"
import AuthHeadline, { AuthHeadlineProps } from "@/components/layout/Auth/Headline"
import AuthFooter, { AuthFooterProps } from "@/components/layout/Auth/Footer"

export { type AuthMainProps, type AuthHeaderProps, type AuthPageProps, type AuthHeadlineProps, type AuthFooterProps }

export default Object.assign(AuthMain, {
  Header: AuthHeader,
  Page: AuthPage,
  Headline: AuthHeadline,
  Footer: AuthFooter,
})
