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
			<div className="flex items-center justify-center size-full my-5">
				<button onClick={closeHandler}>
					{t("layouts:dialog.alert_close")}
				</button>
			</div>
		</div>
	)
}
