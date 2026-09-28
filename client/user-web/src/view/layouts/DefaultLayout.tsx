import Footer from "@/view/layouts/default/Footer"
import Header from "@/view/layouts/default/Header"
import PreviousButton from "@/view/layouts/default/PreviousButton"
import Dialog from "@/view/layouts/dialog/Dialog"
import { Outlet } from "react-router"

export default function DefaultLayout() {
	return (
		<>
			<Dialog />
			<div className="min-h-screen">
				<Header />
				<div className="mx-auto max-w-7xl py-10 px-10">
					<PreviousButton />
					<Outlet />
				</div>
			</div>
			<Footer />
		</>
	)
}
