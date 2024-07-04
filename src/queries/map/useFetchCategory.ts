import { useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { mapKey, TypeGetCategoryKidId, TypeGetCategoryParams, TypeGetCategoryResult } from "@/queries/map"
import { isEquals } from "@/libs/utils"
import { availableLocation } from "@/libs/map"
import { getQueryKey } from "@/libs/query"
import { TypeFetch, TypeQuery } from "@/types/query"

type TypeGetCategory = TypeFetch<TypeGetCategoryResult, TypeGetCategoryKidId, TypeGetCategoryParams>
type TypeFetchCategory = TypeQuery<TypeGetCategoryResult, TypeGetCategoryKidId, TypeGetCategoryParams>

export const getCategory: TypeGetCategory = async (kidId, params) => {
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

const useFetchCategory: TypeFetchCategory = (kidId, params, options) => {
  const queryClient = useQueryClient()
  const availableDocument = (document: TypeGetCategoryResult["documents"][number], params: TypeGetCategoryParams) =>
    isEquals([document.x, document.y], [params.center[1], params.center[0]].map(String))
  const cacheData = queryClient.getQueriesData<TypeGetCategoryResult>({
    queryKey: getQueryKey(mapKey).category.all.toKey(),
    predicate: ({ state: { data } }) => {
      if (!params?.radius) return false
      return (data as TypeGetCategoryResult)?.documents?.some((document) => availableDocument(document, params))
    },
  })

  const context = useQuery({
    queryKey: getQueryKey(mapKey).category.detail.toKeyWithArgs(kidId, params),
    queryFn: async () => {
      const data = await getCategory(kidId, params)
      return data
    },
    enabled: availableLocation({ level: params?.level, center: params?.center, bounds: params?.bounds }),
    initialData: () => {
      const { length, [length - 1]: last } = cacheData
      const documents = (last?.[1]?.documents ?? [])?.filter((document) => availableDocument(document, params))
      return documents?.length ? { documents } : undefined
    },
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

export default useFetchCategory
