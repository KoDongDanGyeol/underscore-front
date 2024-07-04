import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { useQuery } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { atomGlobal } from "@/stores/global"
import { authKey, TypeGetUserKidId, TypeGetUserParams, TypeGetUserResult } from "@/queries/auth"
import { getQueryKey } from "@/libs/query"
import { TypeFetch, TypeQuery } from "@/types/query"

type TypeGetUser = TypeFetch<TypeGetUserResult, TypeGetUserKidId, TypeGetUserParams>
type TypeFetchUser = TypeQuery<TypeGetUserResult, TypeGetUserKidId, TypeGetUserParams>

export const getUser: TypeGetUser = async () => {
  const { data } = await axiosClient.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/user`)
  return data
}

const useFetchUser: TypeFetchUser = (kidId, params, options) => {
  const setGlobal = useSetRecoilState(atomGlobal)

  const context = useQuery({
    queryKey: getQueryKey(authKey).user.default.toKeyWithArgs(kidId, params),
    queryFn: async () => {
      const data = await getUser(kidId, params)
      return data
    },
  })

  useEffect(() => {
    switch (context.status) {
      case "success":
        setGlobal((prev) => ({ ...prev, logged: true }))
        options?.onSuccess?.(context.data)
        break
      case "error":
        setGlobal((prev) => ({ ...prev, logged: false }))
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

export default useFetchUser
