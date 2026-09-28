import { useTranslation } from "react-i18next"

interface AlertDialogProps {
	message: string
	closeHandler: () => void
}

export default function AlertDialog({
	message,
	closeHandler
}: AlertDialogProps) {
	const { t } = useTranslation()
	return (
		<div>
			<p>{message}</p>
			<button onClick={closeHandler}>
				{t("layouts:dialog.alert_close")}
			</button>
		</div>
	)
}
