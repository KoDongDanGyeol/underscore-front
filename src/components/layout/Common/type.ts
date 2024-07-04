import { TyepMenuItem } from "@/components/navigation/Menu"

export const CommonNavigationTree: TyepMenuItem[] = [
  {
    key: "home",
    label: "소개페이지",
    href: "/",
  },
  {
    key: "map",
    label: "지도페이지",
    items: [
      {
        key: "category",
        label: "주변정보",
        href: "/map/category",
      },
      {
        key: "analysis",
        label: "상권분석",
        href: "/map/analysis",
      },
    ],
  },
  {
    key: "mypage",
    label: "마이페이지",
    items: [
      {
        key: "support",
        label: "지원사업",
        href: "/mypage/support",
      },
      {
        key: "profile",
        label: "회원정보",
        href: "/mypage/profile",
      },
    ],
  },
]
