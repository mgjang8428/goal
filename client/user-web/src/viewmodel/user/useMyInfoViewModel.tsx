import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type { AuthService } from "@/model/auth/service/authService"
import type GetMyInfoResponseDto from "@/model/user/dto/response/getMyInfoResponseDto"
import type { UserService } from "@/model/user/service/userService"
import useDialogStore from "@/store/layouts/dialogStore"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useMyInfoViewModel() {
	const log: Logger = container.resolve(ContainerSet.LOGGER)
	const userService: UserService = container.resolve(
		ContainerSet.USER_SERVICE
	)
	const authService: AuthService = container.resolve(
		ContainerSet.AUTH_SERVICE
	)

	const { t } = useTranslation()
	const navigate = useNavigate()

	const { dialogOpen, inputValue } = useDialogStore()

	const [username, setUsername] = useState("")
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")

	const [nowPassword, setNowPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [newName, setNewName] = useState("")
	const [newEmail, setNewEmail] = useState("")

	const [isNameUpdateMode, setIsNameUpdateMode] = useState(false)
	const [isEmailUpdateMode, setIsEmailUpdateMode] = useState(false)
	const [isPasswordUpdateMode, setIsPasswordUpdateMode] = useState(false)

	async function loadMyInfoData() {
		await userService
			.getMyInfoData()
			.then((responseDto: GetMyInfoResponseDto) => {
				setUsername(responseDto.username)
				setName(responseDto.name)
				setEmail(responseDto.email)
			})
			.catch((error) => {
				log.error("loadMyInfoData error: ", error)
				dialogOpen(
					"ERROR",
					t(
						"viewmodel:user.useMyInfoViewModel.error.getMyInfoData_error"
					),
					{
						onClose: () => {
							navigate(RouterLocaleSet.DASHBOARD_PAGE)
						}
					}
				)
			})
	}

	async function changePassword() {
		dialogOpen(
			"CONFIRM",
			t("viewmodel:user.useMyInfoViewModel.confirm.changePassword"),
			{
				onCheck: onCheckHandler
			}
		)

		async function onCheckHandler() {
			await userService
				.changePassword(nowPassword, newPassword)
				.then(() => {
					dialogOpen(
						"ALERT",
						t(
							"viewmodel:user.useMyInfoViewModel.alert.changePassword_success"
						),
						{
							onClose: () => {
								loadMyInfoData()
								setIsPasswordUpdateMode(false)
								setNowPassword("")
								setNewPassword("")
							}
						}
					)
				})
				.catch((error) => {
					log.error("changePassword error: ", error)
					dialogOpen(
						"ERROR",
						t(
							"viewmodel:user.useMyInfoViewModel.error.changePassword_error"
						)
					)
				})
		}
	}

	async function changeName() {
		dialogOpen(
			"CONFIRM",
			t("viewmodel:user.useMyInfoViewModel.confirm.changeName"),
			{ onCheck: onCheckHandler }
		)

		async function onCheckHandler() {
			await userService
				.changeName(newName)
				.then(() => {
					dialogOpen(
						"ALERT",
						t(
							"viewmodel:user.useMyInfoViewModel.alert.changeName_success"
						),
						{
							onClose: () => {
								loadMyInfoData()
								setIsNameUpdateMode(false)
								setNewName("")
							}
						}
					)
				})
				.catch((error) => {
					log.error("changeName error: ", error)
					dialogOpen(
						"ERROR",
						t(
							"viewmodel:user.useMyInfoViewModel.error.changeName_error"
						)
					)
				})
		}
	}

	async function changeEmail() {
		dialogOpen(
			"CONFIRM",
			t("viewmodel:user.useMyInfoViewModel.confirm.changeEmail"),
			{
				onCheck: onCheckHandler
			}
		)

		async function onCheckHandler() {
			await userService
				.changeEmail(newEmail)
				.then(() => {
					dialogOpen(
						"ALERT",
						t(
							"viewmodel:user.useMyInfoViewModel.alert.changeEmail_success"
						),
						{
							onClose: () => {
								loadMyInfoData()
								setIsEmailUpdateMode(false)
								setNewEmail("")
							}
						}
					)
				})
				.catch((error) => {
					log.error("changeEmail error: ", error)
					dialogOpen(
						"ERROR",
						t(
							"viewmodel:user.useMyInfoViewModel.error.changeEmail_error"
						)
					)
				})
		}
	}

	async function deleteUser() {
		dialogOpen(
			"CONFIRM",
			t("viewmodel:user.useMyInfoViewModel.confirm.deleteUser"),
			{
				onCheck: confirmOnCheckHandler
			}
		)

		async function confirmOnCheckHandler() {
			dialogOpen(
				"PASSWORD",
				t("viewmodel:user.useMyInfoViewModel.password.deleteUser"),
				{ onCheck: passwordOnCheckHandler }
			)

			async function passwordOnCheckHandler() {
				// 비밀번호 입력 공백 시
				if (inputValue == "") {
					dialogOpen(
						"ALERT",
						t(
							"viewmodel:user.useMyInfoViewModel.alert.deleteUser_blank_error"
						)
					)
					return
				}
				await userService
					.deleteUser(inputValue)
					.then(() => {
						dialogOpen(
							"ALERT",
							t(
								"viewmodel:user.useMyInfoViewModel.alert.deleteUser_success"
							),
							{
								onClose: () => {
									authService.signout()
									navigate(RouterLocaleSet.MAIN_PAGE)
								}
							}
						)
					})
					.catch((error) => {
						log.error("deleteUser error: ", error)
						dialogOpen(
							"ERROR",
							t(
								"viewmodel:user.useMyInfoViewModel.error.deleteUser_password_error"
							)
						)
					})
			}
		}
	}

	return {
		loadMyInfoData,

		username,
		name,
		email,

		nowPassword,
		setNowPassword,
		newPassword,
		setNewPassword,
		newName,
		setNewName,
		newEmail,
		setNewEmail,

		isNameUpdateMode,
		setIsNameUpdateMode,
		isEmailUpdateMode,
		setIsEmailUpdateMode,
		isPasswordUpdateMode,
		setIsPasswordUpdateMode,

		changePassword,
		changeName,
		changeEmail,

		deleteUser
	}
}
