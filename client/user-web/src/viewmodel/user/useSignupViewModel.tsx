import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type { UserService } from "@/model/user/service/userService"
import useDialogStore from "@/store/layouts/dialogStore"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useSignupViewModel() {
	const log: Logger = container.resolve(ContainerSet.LOGGER)
	const userService: UserService = container.resolve(
		ContainerSet.USER_SERVICE
	)

	const { t } = useTranslation()
	const navigate = useNavigate()

	const { dialogOpen } = useDialogStore()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [passwordCheck, setPasswordCheck] = useState("")
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")

	const [isUsernameDuplicateCheck, setIsUsernameDuplicateCheck] =
		useState(false)
	const [isUsernameInputBlock, setIsUsernameInputBlock] = useState(false)

	async function signupHandler() {
		// ID 중복 확인 안했을 경우
		if (!isUsernameDuplicateCheck) {
			dialogOpen(
				"ALERT",
				t(
					"viewmodel:user.useSignupViewModel.alert.notUsernameDuplicateCheck"
				)
			)
			return
		}
		// PW 일치 확인
		if (password != passwordCheck) {
			dialogOpen(
				"ALERT",
				t("viewmodel:user.useSignupViewModel.alert.passwordCheckWrong")
			)
			return
		}
		dialogOpen(
			"CONFIRM",
			t("viewmodel:user.useSignupViewModel.confirm.signup"),
			{ onCheck: onCheckHandler }
		)

		async function onCheckHandler() {
			await userService
				.signup(username, password, name, email)
				.then(() => {
					dialogOpen(
						"ALERT",
						t(
							"viewmodel:user.useSignupViewModel.alert.signup_success"
						),
						{
							onClose: () => {
								navigate(RouterLocaleSet.MAIN_PAGE, {
									replace: true
								})
							}
						}
					)
				})
				.catch((error) => {
					log.error("signupHandler error: ", error)
					dialogOpen(
						"ERROR",
						t(
							"viewmodel:user.useSignupViewModel.error.signup_error"
						)
					)
				})
		}
	}

	async function duplicateUsernameCheck() {
		await userService
			.checkUsername(username)
			.then(() => {
				dialogOpen(
					"ALERT",
					t(
						"viewmodel:user.useSignupViewModel.alert.username_duplicate_check_success"
					),
					{
						onClose: () => {
							setIsUsernameDuplicateCheck(true)
							setIsUsernameInputBlock(true)
						}
					}
				)
			})
			.catch((error) => {
				log.error("duplicateUsernameCheck error: ", error)
				dialogOpen(
					"ERROR",
					t(
						"viewmodel:user.useSignupViewModel.error.username_duplicate_check_failed"
					)
				)
			})
	}

	function cancelDuplicateCheck() {
		setIsUsernameDuplicateCheck(false)
		setIsUsernameInputBlock(false)
	}

	return {
		username,
		setUsername,
		password,
		setPassword,
		passwordCheck,
		setPasswordCheck,
		name,
		setName,
		email,
		setEmail,
		signupHandler,
		isUsernameInputBlock,
		duplicateUsernameCheck,
		cancelDuplicateCheck
	}
}
