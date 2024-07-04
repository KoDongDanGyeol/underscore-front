import { Fragment } from "react"
import styled from "styled-components"
import { EnumIconName, Icon } from "@/components/general/Icon"

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: keyof typeof EnumIconName
  label?: string
}

const IconMain = (props: IconProps) => {
  const { name, label, ...restProps } = props

  return (
    <Fragment>
      <IconMainContainer as={Icon[name]} aria-label={name} aria-hidden={true} {...restProps} />
      {label && <span className="sr-only">{label}</span>}
    </Fragment>
  )
}

const IconMainContainer = styled.div`
  /*  */
`

export default IconMain
