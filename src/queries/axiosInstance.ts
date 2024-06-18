import axios, { AxiosHeaderValue, HeadersDefaults } from "axios"

type TypeHeaders = {
  [key: string]: AxiosHeaderValue
  // Authorization: string
  "Content-Type": string
}

const axiosClient = axios.create()

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
} as TypeHeaders & HeadersDefaults

axios.defaults.baseURL = "https://api.underscore.or.kr"
axiosClient.defaults.withCredentials = true

axiosClient.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem("UNDERSCORE_ACCESS_TOKEN") ?? ""
    // const refreshToken = localStorage.getItem("UNDERSCORE_REFRESH_TOKEN") ?? ""
    // config.headers!["Authorization"] = `${JSON.parse(refreshToken)}`
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
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          // const accessToken = localStorage.getItem("UNDERSCORE_ACCESS_TOKEN") ?? ""
          // const refreshToken = localStorage.getItem("UNDERSCORE_REFRESH_TOKEN") ?? ""
          // const { headers, data } = await axios.post("/api/reissue", {
          //   headers: { Authorization: `${JSON.parse(refreshToken)}` },
          // })
          // localStorage.setItem("UNDERSCORE_ACCESS_TOKEN", headers["access"])
          // localStorage.setItem("UNDERSCORE_REFRESH_TOKEN", headers["refresh"])
          await axios.post("/api/reissue")
          return axiosClient(originalConfig)
        } catch (error) {
          console.error(error)
          // localStorage.removeItem("UNDERSCORE_ACCESS_TOKEN")
          // localStorage.removeItem("UNDERSCORE_REFRESH_TOKEN")
          alert("요청에 포함된 보안 토큰이 만료되었습니다.")
          window.location.href = `${window.location.origin}/auth/join`
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  },
)

export default axiosClient
