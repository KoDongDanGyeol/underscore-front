import { IncomingMessage } from "http"
import { createProxyMiddleware, Options } from "http-proxy-middleware"
import { PreviewServer, ResolvedConfig, ViteDevServer, defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default ({ mode }: ResolvedConfig) => {
  const env = loadEnv(mode, process.cwd(), "")

  const hpmConfig: Record<string, Options> = {
    "/api/kakaoRest": {
      target: env.VITE_KAKAO_API_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/api/kakaoRest": "/",
      },
    },
  }

  const proxyMiddleware = (server: ViteDevServer | PreviewServer) => {
    // https://github.com/http-party/node-http-proxy/issues/1201#issuecomment-327494625
    const toHTTPReq = (req: IncomingMessage) => {
      const headers = { ...req.headers }
      if (!headers.host) headers.host = headers[":authority"] as string | undefined
      delete headers[":authority"]
      delete headers[":method"]
      delete headers[":path"]
      delete headers[":scheme"]
      return new Proxy(req, {
        get: (target, key) => (key === "headers" ? headers : target[key as keyof IncomingMessage]),
      })
    }
    Object.keys(hpmConfig).forEach((route) => {
      const proxy = createProxyMiddleware(hpmConfig[route])
      server.middlewares.use(route, (req, res, next) => {
        return proxy(toHTTPReq(req), res, next)
      })
    })
  }

  const proxyPlugin = () => {
    return {
      name: "http-proxy-middleware-plugin",
      configureServer: proxyMiddleware,
      configurePreviewServer: proxyMiddleware,
    }
  }

  return defineConfig({
    plugins: [react(), proxyPlugin()],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    server: {
      //
    },
  })
}
