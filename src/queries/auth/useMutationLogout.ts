import { AxiosError } from "axios"
import { useSetRecoilState } from "recoil"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { atomGlobal } from "@/stores/global"
import { authKey, TypePostLogoutParams, TypePostLogoutResult } from "@/queries/auth"
import { getQueryKey } from "@/libs/query"
import { TypeMutation, TypeQueryOptions } from "@/types/query"

export const postLogout: TypeMutation<TypePostLogoutResult, TypePostLogoutParams> = async (params) => {
  const { data } = await axiosClient.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/logout`, params)
  return data
}

const useMutationLogout = (options: TypeQueryOptions) => {
  const queryClient = useQueryClient()

  const setGlobal = useSetRecoilState(atomGlobal)
  const onFinish = () => {
    setGlobal((prev) => ({ ...prev, logged: false }))
    queryClient.invalidateQueries({ queryKey: getQueryKey(authKey).user.toKey() })
  }

  const { mutateAsync: postLogoutAsync, status: postLogoutStatus } = useMutation<
    TypePostLogoutResult,
    AxiosError,
    TypePostLogoutParams
  >({
    mutationFn: async (params) => {
      const data = await postLogout(params)
      return data
    },
    onSuccess: () => {
      onFinish()
      options?.onSuccess?.()
    },
    onError: () => {
      onFinish()
      options?.onError?.()
    },
  })

  return {
    postLogoutAsync,
    postLogoutStatus,
  }
}

export default useMutationLogout
