import { Children } from "react"
import styled from "styled-components"

export interface BreadcrumbMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  //
}

const BreadcrumbMain = (props: BreadcrumbMainProps) => {
  const { className = "", children, ...restProps } = props

  if (!children) return null

  return (
    <BreadcrumbMainContainer className={`${className}`} {...restProps}>
      <BreadcrumbMainList>
        {Children.map(children, (child, index) => {
          const isCurrent = index + 1 === Children.count(children)
          return <BreadcrumbMainItem aria-current={isCurrent ? "page" : undefined}>{child}</BreadcrumbMainItem>
        })}
      </BreadcrumbMainList>
    </BreadcrumbMainContainer>
  )
}

const BreadcrumbMainList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

const BreadcrumbMainItem = styled.li`
  position: relative;
  &:not(:first-child) {
    padding-left: 22px;
  }
  &:not(:first-child):before {
    content: "";
    position: absolute;
    top: 50%;
    left: 6px;
    display: block;
    width: 7px;
    height: 7px;
    border-top: 1px solid rgb(var(--color-neutral600));
    border-left: 1px solid rgb(var(--color-neutral600));
    transform: translateY(-50%) rotate(135deg);
  }
`

const BreadcrumbMainContainer = styled.nav`
  a,
  button,
  span {
    display: block;
    max-width: 120px;
    color: rgb(var(--color-neutral800));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export default BreadcrumbMain
