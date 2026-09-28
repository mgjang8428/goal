import Footer from "@/view/layouts/default/Footer"
import Header from "@/view/layouts/default/Header"
import PreviousButton from "@/view/layouts/default/PreviousButton"
import Dialog from "@/view/layouts/dialog/Dialog"
import { Outlet } from "react-router"

export default function DefaultLayout() {
	return (
		<>
			<Dialog />
			<Header />
			<PreviousButton />
			<Outlet />
			<Footer />
		</>
	)
}
