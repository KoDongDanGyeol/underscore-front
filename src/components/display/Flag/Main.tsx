import { useRecoilState } from "recoil"
import { atomFlag } from "@/stores/flag"
import useMount from "@/hooks/useMount"

export interface FlagMainProps extends React.HTMLAttributes<HTMLButtonElement> {
  //
}

const FlagMain = (props: FlagMainProps) => {
  const { className = "", ...restProps } = props

  const [flag, setFlag] = useRecoilState(atomFlag)
  const { mountStructure } = useMount()

  const toggleFlag = () => {
    setFlag((value) => !value)
  }

  if (!mountStructure.isMounted) {
    return null
  }

  return (
    <button type="button" className={`${className}`} {...restProps} onClick={toggleFlag}>
      {flag.toString()}
    </button>
  )
}

export default FlagMain