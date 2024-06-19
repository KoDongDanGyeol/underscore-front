import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { authKey, TypeGetUserKidId, TypeGetUserParams, TypeGetUserResult } from "@/queries/auth"
import { getQueryKey } from "@/libs/query"
import { TypeFetch } from "@/types/query"

export const getUser: TypeFetch<TypeGetUserResult, TypeGetUserParams> = async () => {
  const { data } = await axiosClient.get(`/backend/api/user`)
  return data
}

const useFetchUser = (kidId: TypeGetUserKidId, params: TypeGetUserParams) => {
  const context = useQuery<TypeGetUserResult, AxiosError, TypeGetUserParams>({
    queryKey: getQueryKey(authKey).user.default.toKeyWithArgs(kidId, params),
    queryFn: async () => {
      return await getUser(kidId, params)
    },
  })

  return {
    ...context,
  }
}

export default useFetchUser
