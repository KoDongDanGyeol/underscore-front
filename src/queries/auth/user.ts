export type TypeGetUserKidId = number

export type TypeGetUserParams = {
  //
}

export type TypeGetUserResult = {
  //
}

export const userKey = {
  default: (kidId: TypeGetUserKidId, params: TypeGetUserParams) => [kidId, params],
}
