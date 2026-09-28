import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type AuthService from "@/model/auth/service/authService"
import useDialogStore from "@/store/layouts/dialogStore"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useSigninViewModel() {
	const log: Logger = container.resolve(ContainerSet.LOGGER)
	const authService: AuthService = container.resolve(
		ContainerSet.AUTH_SERVICE
	)

	const { t } = useTranslation()
	const navigate = useNavigate()

	const { dialogOpen } = useDialogStore()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	async function signinHandler() {
		await authService
			.signin(username, password)
			.then(() => {
				navigate(RouterLocaleSet.DASHBOARD_PAGE, { replace: true })
			})
			.catch((error) => {
				log.error("signinHandler error: ", error)
				dialogOpen(
					"ERROR",
					t("viewmodel:auth.useSigninViewModel.error.signin_faild")
				)
			})
	}
	return {
		username,
		setUsername,
		password,
		setPassword,
		signinHandler
	}
}
