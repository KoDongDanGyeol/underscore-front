import { useRecoilState } from "recoil"
import { atomTheme, EnumTheme } from "@/stores/theme"
import useMount from "@/hooks/useMount"

export interface ThemeMainProps extends React.HTMLAttributes<HTMLButtonElement> {
  //
}

const ThemeMain = (props: ThemeMainProps) => {
  const { className = "", ...restProps } = props

  const [Theme, setTheme] = useRecoilState(atomTheme)
  const { mountStructure } = useMount()

  const toggleTheme = () => {
    setTheme((value) => (value === EnumTheme.Light ? EnumTheme.Dark : EnumTheme.Light))
  }

  if (!mountStructure.isMounted) {
    return null
  }

  return (
    <button type="button" className={`${className}`} {...restProps} onClick={toggleTheme}>
      {Theme.toString()}
    </button>
  )
}

export default ThemeMain
