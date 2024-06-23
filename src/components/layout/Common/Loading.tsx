import styled from "styled-components"
import Loading from "@/components/display/Loading"

export interface CommonLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const CommonLoading = (props: CommonLoadingProps) => {
  const { className = "", ...restProps } = props

  return (
    <CommonLoadingContainer className={`${className}`} {...restProps}>
      <CommonLoadingSpinner />
    </CommonLoadingContainer>
  )
}

const CommonLoadingSpinner = styled(Loading)`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 24px;
  transform: translate(-50%, -50%);
`

const CommonLoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(var(--color-neutral100));
`

export default CommonLoading
