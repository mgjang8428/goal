import Footer from "@/view/layouts/components/Footer"
import Header from "@/view/layouts/components/Header"
import PreviousButton from "@/view/layouts/components/PreviousButton"
import { Outlet } from "react-router"

export default function DefaultLayout() {
  return (
    <>
    <Header />
    <PreviousButton />
    <Outlet />
    <Footer />
    </>
  )
}
