import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { mapKey, TypeGetCategoryKidId, TypeGetCategoryParams, TypeGetCategoryResult } from "@/queries/map"
import { availableLocation } from "@/libs/map"
import { getQueryKey } from "@/libs/query"
import { TypeFetch, TypeQuery } from "@/types/query"

type TypeGetCategories = TypeFetch<TypeGetCategoryResult, TypeGetCategoryKidId, TypeGetCategoryParams>
type TypeFetchCategories = TypeQuery<TypeGetCategoryResult, TypeGetCategoryKidId, TypeGetCategoryParams>

export const getCategories: TypeGetCategories = async (kidId, params) => {
  const rect = params?.bounds
    ? `${params.bounds[3]},${params.bounds[2]},${params.bounds[1]},${params.bounds[0]}`
    : undefined
  const radius = params.radius ? params?.radius : undefined
  const { data } = await axiosClient.get(`/api/kakaoRest/v2/local/search/category.json`, {
    params: {
      category_group_code: params.categoryCode,
      size: params.size,
      sort: "accuracy",
      page: kidId,
      x: params.center[1],
      y: params.center[0],
      rect,
      radius,
    },
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_REST_KEY}`,
    },
  })
  return {
    ...data,
    meta: { ...data.meta, pagination_count: Math.ceil(data?.meta?.pageable_count / params.size) },
  }
}

const useFetchCategories: TypeFetchCategories = (kidId, params, options) => {
  const context = useQuery({
    queryKey: getQueryKey(mapKey).category.all.toKeyWithArgs(kidId, params),
    queryFn: async () => {
      const data = await getCategories(kidId, params)
      return data
    },
    enabled: availableLocation({ level: params?.level, center: params?.center, bounds: params?.bounds }),
  })

  useEffect(() => {
    switch (context.status) {
      case "success":
        options?.onSuccess?.(context.data)
        break
      case "error":
        options?.onError?.()
        break
      default:
        //
        break
    }
  }, [context.status])

  return {
    ...context,
  }
}

export default useFetchCategories
