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
			<div className="flex items-center justify-center size-full my-5">
				<button onClick={closeHandler}>
					{t("layouts:dialog.error_close")}
				</button>
			</div>
		</div>
	)
}
