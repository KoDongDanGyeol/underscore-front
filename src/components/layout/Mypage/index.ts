import MypageMain, { MypageMainProps } from "@/components/layout/Mypage/Main"
import MypagePage, { MypagePageProps } from "@/components/layout/Mypage/Page"

export { type MypageMainProps, type MypagePageProps }

export default Object.assign(MypageMain, {
  Page: MypagePage,
})
