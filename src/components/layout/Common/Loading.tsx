import styled from "styled-components"
import Loading from "@/components/display/Loading"

export interface CommonLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const CommonLoading = (props: CommonLoadingProps) => {
  const { className = "", ...restProps } = props

  return <CommonLoadingContainer className={`${className}`} {...restProps} />
}

const CommonLoadingContainer = styled(Loading)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 24px;
  background: rgb(var(--color-neutral100));
`

export default CommonLoading
