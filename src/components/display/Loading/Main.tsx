import styled from "styled-components"
import Icon from "@/components/general/Icon"

export interface LoadingMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const LoadingMain = (props: LoadingMainProps) => {
  const { className = "", ...restProps } = props

  return (
    <LoadingMainContainer className={`${className}`} {...restProps}>
      <Icon name="Loading" aria-hidden={true} />
      <span className="sr-only">Loading</span>
    </LoadingMainContainer>
  )
}

const LoadingMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-primary600));
`

export default LoadingMain
