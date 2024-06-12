import axios, { AxiosHeaderValue, HeadersDefaults } from "axios"

const axiosClient = axios.create()

type TypeHeaders = {
  [key: string]: AxiosHeaderValue
  "Content-Type": string
}

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
} as TypeHeaders & HeadersDefaults

axiosClient.defaults.withCredentials = true

export default axiosClient
