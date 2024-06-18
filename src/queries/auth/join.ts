export const EnumJoinAuthorization = {
  Google: "google",
  Naver: "naver",
  Kakao: "kakao",
} as const

export type EnumJoinAuthorization = (typeof EnumJoinAuthorization)[keyof typeof EnumJoinAuthorization]

export type TypePostJoinParams = {
  authorization: EnumJoinAuthorization
}

export type TypePostJoinResult = {
  //
}
