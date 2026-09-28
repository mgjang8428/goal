import useDialogStore from "@/store/layouts/dialogStore"
import { useTranslation } from "react-i18next"

interface PromptDialogProps {
	message: string
	checkHandler: () => void
	closeHandler: () => void
}

function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
	event.preventDefault()
}

export default function PromptDialog({
	message,
	checkHandler,
	closeHandler
}: PromptDialogProps) {
	const { t } = useTranslation()
	const { inputValue, inputOnChange } = useDialogStore()
	return (
		<div>
			<p>{message}</p>
			<form onSubmit={onSubmitHandler}>
				<input
					type="text"
					value={inputValue}
					onChange={(event) => inputOnChange(event.target.value)}
				/>
			</form>
			<div className="flex items-center justify-center size-full my-5">
				<button onClick={checkHandler} className="mr-3">
					{t("layouts:dialog.prompt_check")}
				</button>
				<button onClick={closeHandler}>
					{t("layouts:dialog.prompt_close")}
				</button>
			</div>
		</div>
	)
}
