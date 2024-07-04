import { FieldValues } from "react-hook-form"
import { TypeGetCategoryParams, TypeGetCategoryKidId, EnumCategoryCode } from "@/queries/map"

export interface TypeGetCategory extends FieldValues {
  kidId: TypeGetCategoryKidId
  size: TypeGetCategoryParams["size"]
  radius: TypeGetCategoryParams["radius"]
  categoryCode: TypeGetCategoryParams["categoryCode"]
  capture: {
    categoryCode: TypeGetCategoryParams["categoryCode"]
  }
}

export const CategoryCodeDropdown = {
  label: { value: "", text: "카테고리" },
  option: {
    default: [
      { value: EnumCategoryCode.MT1, text: "대형마트" },
      { value: EnumCategoryCode.CS2, text: "편의점" },
      { value: EnumCategoryCode.PS3, text: "어린이집,유치원" },
      { value: EnumCategoryCode.SC4, text: "학교" },
      { value: EnumCategoryCode.AC5, text: "학원" },
      { value: EnumCategoryCode.PK6, text: "주차장" },
      { value: EnumCategoryCode.OL7, text: "주유소,충전소" },
      { value: EnumCategoryCode.SW8, text: "지하철역" },
      { value: EnumCategoryCode.BK9, text: "은행" },
      { value: EnumCategoryCode.CT1, text: "문화시설" },
      { value: EnumCategoryCode.AG2, text: "중개업소" },
      { value: EnumCategoryCode.PO3, text: "공공기관" },
      { value: EnumCategoryCode.AT4, text: "관광명소" },
      { value: EnumCategoryCode.AD5, text: "숙박" },
      { value: EnumCategoryCode.FD6, text: "음식점" },
      { value: EnumCategoryCode.CE7, text: "카페" },
      { value: EnumCategoryCode.HP8, text: "병원" },
      { value: EnumCategoryCode.PM9, text: "약국" },
    ],
  },
}
