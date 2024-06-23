import { Fragment, forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"

export type MypagePageProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    breadcrumbEl?: React.ElementType
  }
>

const MypagePage = <C extends React.ElementType = "main">(props: MypagePageProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, breadcrumbEl: Breadcrumb, className = "", children, ...restProps } = props

  return (
    <Fragment>
      {Breadcrumb && <MypagePageBreadcrumb as={Breadcrumb} />}
      <MypagePageContainer ref={ref} as={asTag ?? "main"} className={`${className}`} {...restProps}>
        {children}
      </MypagePageContainer>
    </Fragment>
  )
}

const MypagePageBreadcrumb = styled.div`
  padding: 16px 0;
`

const MypagePageContainer = styled.main`
  padding: 24px;
  background: rgb(var(--color-neutral100));
  border-radius: 12px;
`

export default forwardRef(MypagePage)
