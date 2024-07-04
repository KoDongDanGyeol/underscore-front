import { Fragment, useEffect } from "react"
import { useRecoilValue } from "recoil"
import { atomGlobal } from "@/stores/global"

export interface BottomSheetProviderProps {
  //
}

const BottomSheetProvider = (props: BottomSheetProviderProps) => {
  const {} = props

  const global = useRecoilValue(atomGlobal)

  useEffect(() => {
    if (global.bottomSheet.size) {
      document.body.classList.add("open-bottomSheet")
    } else {
      document.body.classList.remove("open-bottomSheet")
    }
  }, [global.bottomSheet])

  return (
    <Fragment>
      {Array.from(global.bottomSheet).map(([name, { component: Component }]) =>
        Component ? <Component key={name} /> : null,
      )}
    </Fragment>
  )
}

export default BottomSheetProvider
