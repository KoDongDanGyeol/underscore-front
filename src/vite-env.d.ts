/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  VITE_SERVICE_NAME: string
  VITE_BACKEND_API_URL: string
  VITE_KAKAO_API_URL: string
  VITE_KAKAO_API_REST_KEY: string
  VITE_KAKAO_API_SDK_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
