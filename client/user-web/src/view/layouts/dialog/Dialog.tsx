import useDialogStore from "@/store/layouts/dialogStore"
import AlertDialog from "@/view/layouts/dialog/type/AlertDialog"
import ConfirmDialog from "@/view/layouts/dialog/type/ConfirmDialog"
import ErrorDialog from "@/view/layouts/dialog/type/ErrorDialog"
import PasswordDialog from "@/view/layouts/dialog/type/PasswordDialog"
import PromptDialog from "@/view/layouts/dialog/type/PromptDialog"
import { useEffect, useRef } from "react"
import { useLocation } from "react-router"

// null | "ALERT" | "CONFIRM" | "PROMPT" | "PASSWORD" | "ERROR"
export default function Dialog() {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const location = useLocation()

	const { dialogType, isDialogOpen, message, onClose, onCheck, dialogClose } =
		useDialogStore()

	function closeHandler() {
		onClose()
		dialogClose()
	}

	function checkHandler() {
		onCheck()
		dialogClose()
	}

	function dialogTypeContent(): React.ReactNode {
		switch (dialogType) {
			case "ALERT":
				return (
					<AlertDialog
						message={message}
						closeHandler={closeHandler}
					/>
				)
			case "CONFIRM":
				return (
					<ConfirmDialog
						message={message}
						closeHandler={closeHandler}
						checkHandler={checkHandler}
					/>
				)
			case "PROMPT":
				return (
					<PromptDialog
						message={message}
						closeHandler={closeHandler}
						checkHandler={checkHandler}
					/>
				)
			case "PASSWORD":
				return (
					<PasswordDialog
						message={message}
						closeHandler={closeHandler}
						checkHandler={checkHandler}
					/>
				)
			case "ERROR":
				return (
					<ErrorDialog
						message={message}
						closeHandler={closeHandler}
					/>
				)
			default:
				return <></>
		}
	}

	function dialogTypeClosedBy() {
		switch (dialogType) {
			case "ALERT":
				return "any"
			case "CONFIRM":
				return "none"
			case "PROMPT":
				return "none"
			case "PASSWORD":
				return "none"
			case "ERROR":
				return "any"
			default:
				return "any"
		}
	}

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return
		if (isDialogOpen) {
			if (!dialog.open) {
				dialog.showModal()
			}
		} else {
			if (dialog.open) {
				dialog.close()
			}
		}
	}, [isDialogOpen])

	useEffect(() => {
		if (isDialogOpen) {
			closeHandler()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname])

	return (
		<>
			<dialog
				ref={dialogRef}
				closedby={dialogTypeClosedBy()}
				onClose={closeHandler}
			>
				{dialogTypeContent()}
			</dialog>
		</>
	)
}
