import { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { TypePostLogoutParams, TypePostLogoutResult } from "@/queries/auth"
import { TypeMutation } from "@/types/query"

export const postLogout: TypeMutation<TypePostLogoutResult, TypePostLogoutParams> = async (params) => {
  if (!localStorage.getItem("UNDERSCORE_ACCESS_TOKEN")) return { refresh: null }
  const { data } = await axiosClient.post(`/backend/api/logout`, params)
  return data
}

const useMutationLogout = () => {
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
      localStorage.removeItem("UNDERSCORE_ACCESS_TOKEN")
    },
  })

  return {
    postLogoutAsync,
    postLogoutStatus,
  }
}

export default useMutationLogout
