import { forwardRef } from "react"
import styled from "styled-components"
import { PolymorphicRef, PolymorphicComponentPropWithRef } from "@/types/polymorphic"
import { EnumLabelNecessity } from "@/components/entry/Label"

export type LabelMainProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    necessity?: EnumLabelNecessity
    isRequired?: boolean
  }
>

const LabelMain = <C extends React.ElementType = "label">(props: LabelMainProps<C>, ref?: PolymorphicRef<C>) => {
  const {
    asTag,
    necessity = EnumLabelNecessity.Icon,
    isRequired = false,
    className = "",
    children,
    ...restProps
  } = props

  return (
    <LabelMainContainer ref={ref} as={asTag ?? "label"} className={`${className}`} {...restProps}>
      {children}
      {necessity === EnumLabelNecessity.Icon && isRequired && (
        <Required>
          <em className="asterisk" aria-hidden="true"></em>
          <em className="sr-only">(필수)</em>
        </Required>
      )}
      {necessity === EnumLabelNecessity.Text && !isRequired && (
        <Required>
          <em>(선택)</em>
        </Required>
      )}
    </LabelMainContainer>
  )
}

const Required = styled.span`
  .asterisk:before {
    content: "*";
    font-size: 1em;
    line-height: ${({ theme }) => theme.typo.leading.none};
    color: rgb(var(--color-red500));
    vertical-align: middle;
  }
`

const LabelMainContainer = styled.label`
  display: block;
  ${Required} {
    margin-left: 2px;
  }
`

export default forwardRef(LabelMain)
