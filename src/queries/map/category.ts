import { TypeMap } from "@/stores/map"

export const EnumCategoryCode = {
  MT1: "MT1", // 대형마트
  CS2: "CS2", // 편의점
  PS3: "PS3", // 어린이집, 유치원
  SC4: "SC4", // 학교
  AC5: "AC5", // 학원
  PK6: "PK6", // 주차장
  OL7: "OL7", // 주유소, 충전소
  SW8: "SW8", // 지하철역
  BK9: "BK9", // 은행
  CT1: "CT1", // 문화시설
  AG2: "AG2", // 중개업소
  PO3: "PO3", // 공공기관
  AT4: "AT4", // 관광명소
  AD5: "AD5", // 숙박
  FD6: "FD6", // 음식점
  CE7: "CE7", // 카페
  HP8: "HP8", // 병원
  PM9: "PM9", // 약국
} as const

export type EnumCategoryCode = (typeof EnumCategoryCode)[keyof typeof EnumCategoryCode]

export type TypeGetCategoryKidId = number

export type TypeGetCategoryParams = {
  size: number
  radius?: number
  level: TypeMap["location"]["level"]
  center: TypeMap["location"]["center"]
  bounds?: TypeMap["location"]["bounds"]
  categoryCode: EnumCategoryCode
}

export type TypeGetCategoryResult = {
  documents: {
    id: string
    place_name: string
    category_name: string
    category_group_code: string
    category_group_name: string
    phone: string
    address_name: string
    road_address_name: string
    x: string
    y: string
    place_url: string
    distance: string
  }[]
  meta?: {
    total_count: number
    pageable_count: number
    pagination_count: number
    is_end: boolean
    same_name?: {
      region: string[]
      keyword: string
      selected_region: string
    }
  }
}

export const categoryKey = {
  all: (kidId: TypeGetCategoryKidId, params: TypeGetCategoryParams) => [kidId, params],
  detail: (kidId: TypeGetCategoryKidId, params: TypeGetCategoryParams) => [kidId, params],
}
