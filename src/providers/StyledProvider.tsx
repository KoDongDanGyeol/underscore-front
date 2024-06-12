import { ThemeProvider } from "styled-components"
import { Theme } from "@/styles/theme"
import Global from "@/styles/global"

export interface StyledProviderProps extends React.PropsWithChildren {
  //
}

const StyledProvider = (props: StyledProviderProps) => {
  const { children } = props

  return (
    <ThemeProvider theme={Theme}>
      <Global />
      {children}
    </ThemeProvider>
  )
}

export default StyledProvider
