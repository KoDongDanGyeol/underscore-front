import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { authKey, TypePostLogoutParams, TypePostLogoutResult } from "@/queries/auth"
import { getQueryKey } from "@/libs/query"
import { TypeMutation } from "@/types/query"

export const postLogout: TypeMutation<TypePostLogoutResult, TypePostLogoutParams> = async (params) => {
  if (!localStorage.getItem("UNDERSCORE_ACCESS_TOKEN")) return { refresh: null }
  const { data } = await axiosClient.post(`/backend/api/logout`, params)
  return data
}

const useMutationLogout = (options?: { onFinish?: () => void }) => {
  const queryClient = useQueryClient()

  const onFinish = () => {
    localStorage.removeItem("UNDERSCORE_ACCESS_TOKEN")
    queryClient.invalidateQueries({ queryKey: getQueryKey(authKey).user.toKey() })
    options?.onFinish?.()
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
    onSuccess: onFinish,
    onError: onFinish,
  })

  return {
    postLogoutAsync,
    postLogoutStatus,
  }
}

export default useMutationLogout
