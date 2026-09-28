import { useTranslation } from "react-i18next"

interface ConfirmDialogProps {
	message: string
	closeHandler: () => void
	checkHandler: () => void
}

export default function ConfirmDialog({
	message,
	closeHandler,
	checkHandler
}: ConfirmDialogProps) {
	const { t } = useTranslation()
	return (
		<div>
			<p>{message}</p>
			<div className="flex items-center justify-center size-full my-5">
				<button onClick={checkHandler} className="mr-3">
					{t("layouts:dialog.confirm_check")}
				</button>
				<button onClick={closeHandler}>
					{t("layouts:dialog.confirm_close")}
				</button>
			</div>
		</div>
	)
}
