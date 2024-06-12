import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import RouterProvider from "@/providers/RouterProvider"
import Layout from "@/layout"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <RouterProvider />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
)
