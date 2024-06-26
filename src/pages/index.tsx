import styled from "styled-components"
import { SPECIFIED_ROUTES } from "@/providers/RouterProvider"
import useBottomSheet from "@/hooks/useBottomSheet"
import Common from "@/components/layout/Common"
import BottomSheet from "@/components/layout/BottomSheet"
import Link from "@/components/general/Link"
import Button from "@/components/general/Button"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

const Page = (props: PageProps) => {
  const {} = props

  const { onMount, onUnmount } = useBottomSheet()

  const openBottomSheetA = () => {
    const sheetName = "BottomSheetA"
    onMount(sheetName, {
      component: () => (
        <BottomSheet name={sheetName} spreadable={false} hasDim={true} hasHandle={true}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Button type="button" variants="primary" isActive={false} onClick={() => onUnmount(sheetName)}>
            Close
          </Button>
        </BottomSheet>
      ),
    })
  }

  const openBottomSheetB = () => {
    const sheetName = "BottomSheetB"
    onMount(sheetName, {
      component: () => (
        <BottomSheet name={sheetName} spreadable={false} hasDim={false} hasHandle={false}>
          <p>Nullam massa purus, auctor in egestas sed, posuere a tellus.</p>
          <Button type="button" variants="primary" isActive={false} onClick={() => onUnmount(sheetName)}>
            Close
          </Button>
        </BottomSheet>
      ),
    })
  }

  const openBottomSheetC = () => {
    const sheetName = "BottomSheetC"
    onMount(sheetName, {
      component: () => (
        <BottomSheet name={sheetName} spreadable={true} hasDim={false} hasHandle={true}>
          <p>Nam tempus fermentum tincidunt.</p>
          <Button type="button" variants="primary" isActive={false} onClick={() => onUnmount("BottomSheetC")}>
            Close
          </Button>
        </BottomSheet>
      ),
    })
  }

  return (
    <PageContainer asTag="main">
      <PageRoutes>
        {SPECIFIED_ROUTES.sort(({ path: prev }, { path: next }) => prev.localeCompare(next)).map(({ path }) => (
          <Button key={path} asTag={Link} to={path} shape="plain">
            {path}
          </Button>
        ))}
        <Button type="button" shape="plain" onClick={openBottomSheetA}>
          @BottomSheetA
        </Button>
        <Button type="button" shape="plain" onClick={openBottomSheetB}>
          @BottomSheetB
        </Button>
        <Button type="button" shape="plain" onClick={openBottomSheetC}>
          @BottomSheetC
        </Button>
      </PageRoutes>
    </PageContainer>
  )
}

const PageRoutes = styled.section`
  display: flex;
  flex-direction: column;
`

const PageContainer = styled(Common.Page)`
  /*  */
`

export default Page
