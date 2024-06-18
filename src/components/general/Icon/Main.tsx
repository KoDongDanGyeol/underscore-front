import styled from "styled-components"
import { EnumIconName, Icon } from "@/components/general/Icon"

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: keyof typeof EnumIconName
}

const IconMain = (props: IconProps) => {
  const { name, ...restProps } = props

  return <IconMainContainer as={Icon[name]} {...restProps} />
}

const IconMainContainer = styled.div`
  /*  */
`

export default IconMain
