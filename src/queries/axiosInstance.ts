import axios, { AxiosHeaderValue, HeadersDefaults } from "axios"

type TypeHeaders = {
  [key: string]: AxiosHeaderValue
  "Content-Type": string
}

const axiosClient = axios.create()

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
} as TypeHeaders & HeadersDefaults

axiosClient.defaults.withCredentials = true

// axiosClient.interceptors.request.use(
//   (config) => {
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config
    if (originalConfig.url !== `${import.meta.env.VITE_BACKEND_API_URL}/api/reissue` && error.response) {
      // TODO
      // if (error.response.status === 401 && !originalConfig._retry) {}
      if (!originalConfig._retry) {
        originalConfig._retry = true
        try {
          await axiosClient.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/reissue`)
          return axiosClient(originalConfig)
        } catch (error) {
          console.error(error)
          // alert("요청에 포함된 보안 토큰이 만료되었습니다.")
          // window.location.replace(`${window.location.origin}/auth`)
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  },
)

export default axiosClient
