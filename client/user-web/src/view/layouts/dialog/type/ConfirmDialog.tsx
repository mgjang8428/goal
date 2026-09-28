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
			<button onClick={checkHandler}>
				{t("layouts:dialog.confirm_check")}
			</button>
			<button onClick={closeHandler}>
				{t("layouts:dialog.confirm_close")}
			</button>
		</div>
	)
}
