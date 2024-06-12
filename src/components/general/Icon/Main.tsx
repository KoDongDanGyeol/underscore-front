import styled from "styled-components"
import { IconName, Icon } from "@/components/general/Icon"

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: keyof typeof IconName
}

const IconMain = (props: IconProps) => {
  const { name, ...restProps } = props

  return <IconMainContainer as={Icon[name]} {...restProps} />
}

const IconMainContainer = styled.div`
  /*  */
`

export default IconMain
