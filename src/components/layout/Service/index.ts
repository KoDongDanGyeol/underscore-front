import ServiceMain, { ServiceMainProps } from "@/components/layout/Service/Main"
import ServicePage, { ServicePageProps } from "@/components/layout/Service/Page"

export { type ServiceMainProps, type ServicePageProps }

export default Object.assign(ServiceMain, {
  Page: ServicePage,
})
