import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "@/types/polymorphic"
import { TypeGetCategoryResult } from "@/queries/map"
import Skeleton from "@/components/display/Skeleton"

export type CategoryMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    data?: TypeGetCategoryResult["documents"][number]
    actionEl?: React.ElementType
    isSkeleton?: boolean
  }
>

const CategoryMain = <C extends React.ElementType = "div">(props: CategoryMainProps<C>, ref?: PolymorphicRef<C>) => {
  const { asTag, data, actionEl: ActionEl = null, isSkeleton = false, className = "", ...restProps } = props

  if (isSkeleton) {
    return (
      <CategoryMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
        <CategoryMainCore>
          <Skeleton asTag="strong" style={{ width: "40%" }} />
          <Skeleton asTag="em" style={{ width: "40px" }} />
        </CategoryMainCore>
        <CategoryMainDetail>
          <li>
            <strong className="sr-only">도로명 주소</strong>
            <Skeleton asTag="span" style={{ width: "72%" }} />
          </li>
          <li>
            <strong className="sr-only">지번 주소</strong>
            <Skeleton asTag="span" style={{ width: "60%" }} />
          </li>
        </CategoryMainDetail>
      </CategoryMainContainer>
    )
  }

  return (
    <CategoryMainContainer ref={ref} as={asTag ?? "div"} className={`${className}`} {...restProps}>
      <CategoryMainCore>
        <strong>{data?.place_name}</strong>
        <em>{data?.category_group_name}</em>
      </CategoryMainCore>
      <CategoryMainDetail>
        <li>
          <strong className="sr-only">도로명 주소</strong>
          <span>{data?.road_address_name}</span>
        </li>
        <li>
          <strong className="sr-only">지번 주소</strong>
          <span>{data?.address_name}</span>
        </li>
      </CategoryMainDetail>
      {ActionEl && <CategoryMainAction as={ActionEl} />}
    </CategoryMainContainer>
  )
}

const CategoryMainCore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  strong {
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  em {
    flex: none;
    color: rgb(var(--color-neutral700));
  }
`

const CategoryMainDetail = styled.ul`
  margin-top: 4px;
  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const CategoryMainAction = styled.div`
  margin-top: 4px;
`

const CategoryMainContainer = styled.div`
  display: block;
`

export default forwardRef(CategoryMain)
