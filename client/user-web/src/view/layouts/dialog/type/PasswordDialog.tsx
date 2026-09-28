import useDialogStore from "@/store/layouts/dialogStore"
import { useTranslation } from "react-i18next"

interface PasswordDialogProps {
	message: string
	checkHandler: () => void
	closeHandler: () => void
}

export default function PasswordDialog({
	message,
	checkHandler,
	closeHandler
}: PasswordDialogProps) {

	const { t } = useTranslation()

	const { inputValue, inputOnChange } = useDialogStore()

    function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
    }
    
	return (
		<div>
			<p>{message}</p>
			<form onSubmit={(event) => {onSubmitHandler(event)}}>
				<input
					type="password"
					autoComplete="false"
					value={inputValue}
					onChange={(event) => inputOnChange(event.target.value)}
				/>
			</form>
			<button onClick={checkHandler}>{t("layouts:dialog.password_check")}</button>
			<button onClick={closeHandler}>{t("layouts:dialog.password_close")}</button>
		</div>
	)
}
