import { useEffect } from "react"
import { AxiosError } from "axios"
import { useSetRecoilState } from "recoil"
import { useQuery } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { atomGlobal } from "@/stores/global"
import { authKey, TypeGetUserKidId, TypeGetUserParams, TypeGetUserResult } from "@/queries/auth"
import { getQueryKey } from "@/libs/query"
import { TypeFetch, TypeQueryOptions } from "@/types/query"

export const getUser: TypeFetch<TypeGetUserResult, TypeGetUserParams> = async () => {
  const { data } = await axiosClient.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/user`)
  return data
}

const useFetchUser = (kidId: TypeGetUserKidId, params: TypeGetUserParams, options?: TypeQueryOptions) => {
  const setGlobal = useSetRecoilState(atomGlobal)

  const context = useQuery<TypeGetUserParams, AxiosError, TypeGetUserResult>({
    queryKey: getQueryKey(authKey).user.default.toKeyWithArgs(kidId, params),
    queryFn: async () => {
      const data = await getUser(kidId, params)
      return data
    },
  })

  useEffect(() => {
    if (context.status === "success") {
      setGlobal((prev) => ({ ...prev, logged: true }))
      options?.onSuccess?.()
    } else if (context.status === "error") {
      setGlobal((prev) => ({ ...prev, logged: false }))
      options?.onError?.()
    }
  }, [context.status])

  return {
    ...context,
  }
}

export default useFetchUser
