import { RouterProvider } from "react-router"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@/config/locale/i18n.ts'
import router from "@/config/route/router"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
