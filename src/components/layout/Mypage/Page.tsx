import { Fragment, forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import Common from "@/components/layout/Common"

export type MypagePageProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    breadcrumbEl?: React.ElementType
  }
>

const MypagePage = <C extends React.ElementType = "main">(props: MypagePageProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, breadcrumbEl: BreadcrumbEl = null, className = "", children, ...restProps } = props

  return (
    <Fragment>
      {BreadcrumbEl && <MypagePageBreadcrumb as={BreadcrumbEl} />}
      <MypagePageContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
        {children}
      </MypagePageContainer>
      <MypagePageFooter />
    </Fragment>
  )
}

const MypagePageBreadcrumb = styled.div`
  margin-top: 16px;
`

const MypagePageFooter = styled(Common.Footer)`
  margin-top: 24px;
`

const MypagePageContainer = styled.main`
  margin-top: 16px;
  padding: 24px;
  background: rgb(var(--color-neutral100));
  border-radius: 12px;
`

export default forwardRef(MypagePage)
