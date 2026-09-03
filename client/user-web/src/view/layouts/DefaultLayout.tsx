import Footer from "@/view/layouts/components/Footer"
import Header from "@/view/layouts/components/Header"
import { Outlet } from "react-router"

export default function DefaultLayout() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}
