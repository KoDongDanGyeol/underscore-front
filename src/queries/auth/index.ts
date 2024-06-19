import { userKey } from "@/queries/auth/user"

export { EnumJoinAuthorization, type TypePostJoinParams, type TypePostJoinResult } from "@/queries/auth/join"
export { type TypePostLogoutParams, type TypePostLogoutResult } from "@/queries/auth/logout"
export { type TypeGetUserKidId, type TypeGetUserParams, type TypeGetUserResult } from "@/queries/auth/user"

export const authKey = {
  user: userKey,
}
