import { useSetRecoilState } from "recoil"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosClient from "@/queries/axiosInstance"
import { atomGlobal } from "@/stores/global"
import { authKey, TypePostLogoutParams, TypePostLogoutResult } from "@/queries/auth"
import { getQueryKey } from "@/libs/query"
import { TypeMutation, TypeOptions } from "@/types/query"

type TypePostLogout = TypeMutation<TypePostLogoutResult, TypePostLogoutParams>

export const postLogout: TypePostLogout = async (params) => {
  const { data } = await axiosClient.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/logout`, params)
  return data
}

const useMutationLogout = (options: TypeOptions<TypePostLogoutResult>) => {
  const queryClient = useQueryClient()
  const setGlobal = useSetRecoilState(atomGlobal)

  const onFinish = () => {
    setGlobal((prev) => ({ ...prev, logged: false }))
    queryClient.invalidateQueries({ queryKey: getQueryKey(authKey).user.toKey() })
  }

  const { mutateAsync: postLogoutAsync, status: postLogoutStatus } = useMutation({
    mutationFn: async (params: TypePostLogoutParams) => {
      const data = await postLogout(params)
      return data
    },
    onSuccess: (data) => {
      onFinish()
      options?.onSuccess?.(data)
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
