import axios, { AxiosHeaderValue, HeadersDefaults } from "axios"
import { parseCookies } from "@/libs/utils"

type TypeHeaders = {
  [key: string]: AxiosHeaderValue
  access: string
  "Content-Type": string
}

const axiosClient = axios.create()

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
} as TypeHeaders & HeadersDefaults

axiosClient.defaults.withCredentials = true

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("UNDERSCORE_ACCESS_TOKEN") ?? JSON.stringify("")
    config.headers!["access"] = `${JSON.parse(accessToken)}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config
    if (error.response) {
      // TODO
      // if (error.response.status === 401 && !originalConfig._retry) {}
      if (!originalConfig._retry) {
        originalConfig._retry = true
        try {
          const { refresh = "" } = parseCookies(document.cookie)
          const { headers } = await axios.post("/backend/api/reissue", {
            headers: { Cookie: `refresh=${JSON.stringify(refresh)}` },
            withCredentials: true,
          })
          localStorage.setItem("UNDERSCORE_ACCESS_TOKEN", JSON.stringify(headers?.["access"] ?? ""))
          return axiosClient(originalConfig)
        } catch (error) {
          console.error(error)
          // TODO
          // localStorage.removeItem("UNDERSCORE_ACCESS_TOKEN")
          // alert("요청에 포함된 보안 토큰이 만료되었습니다.")
          // window.location.href = `${window.location.origin}/auth/join`
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  },
)

export default axiosClient
