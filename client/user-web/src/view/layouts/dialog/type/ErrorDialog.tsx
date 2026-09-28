import { useTranslation } from "react-i18next"

interface ErrorDialogProps {
	message: string
	closeHandler: () => void
}

export default function ErrorDialog({
	message,
	closeHandler
}: ErrorDialogProps) {
	const { t } = useTranslation()
	return (
		<div>
			<p>{message}</p>
			<button onClick={closeHandler}>
				{t("layouts:dialog.error_close")}
			</button>
		</div>
	)
}
