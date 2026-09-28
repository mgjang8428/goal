import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type DialogType =
	null | "ALERT" | "CONFIRM" | "PROMPT" | "PASSWORD" | "ERROR"

export interface DialogStoreState {
	isDialogOpen: boolean
	dialogType: DialogType
	message: string
	inputValue: string
	onCheck: () => void
	onClose: () => void

	dialogOpen: (
		type: DialogType,
		message: string,
		handlers?: {
			onCheck?: () => void
			onClose?: () => void
		}
	) => void
	dialogClose: () => void
	inputOnChange: (value: string) => void
}

const useDialogStore = create<DialogStoreState>()(
	devtools(
		(set) => ({
			isDialogOpen: false,
			dialogType: null,
			message: "",
			inputValue: "",
			onCheck: () => {},
			onClose: () => {},

			dialogOpen: (type, message, handlers) => {
				set(
					{
						isDialogOpen: true,
						dialogType: type,
						message: message,
						inputValue: "",
						onCheck: handlers?.onCheck ?? (() => {}),
						onClose: handlers?.onClose ?? (() => {})
					},
					undefined,
					"useDialogStore/dialogOpen"
				)
			},
			dialogClose: () => {
				set(
					{
						isDialogOpen: false,
						dialogType: null,
						message: "",
						onCheck: () => {},
						onClose: () => {}
					},
					undefined,
					"useDialogStore/dialogClose"
				)
			},
			inputOnChange: (value) => {
				set(
					{
						inputValue: value
					},
					undefined,
					"useDialogStore/inputOnChange"
				)
			}
		}),
		{ name: "dialogStore" }
	)
)

export default useDialogStore
