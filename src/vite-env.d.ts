/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  VITE_SERVICE_NAME: string
  VITE_BACKEND_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
