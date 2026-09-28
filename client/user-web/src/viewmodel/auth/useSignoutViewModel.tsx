import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type AuthService from "@/model/auth/service/authService"
import useDialogStore from "@/store/layouts/dialogStore"
import type { Logger } from "@/util/logger/logger"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useSignoutViewModel() {
	const log: Logger = container.resolve(ContainerSet.LOGGER)
	const authService: AuthService = container.resolve(
		ContainerSet.AUTH_SERVICE
	)

	const navigate = useNavigate()
	const { t } = useTranslation()

	const { dialogOpen } = useDialogStore()

	async function signoutHandler() {
		dialogOpen("CONFIRM", t("viewmodel:auth.useSignoutViewModel.confirm.signout"), {
			onCheck: onCheckHandler
		})

		async function onCheckHandler() {
			await authService
				.signout()
				.then(() => {
					navigate(RouterLocaleSet.MAIN_PAGE)
				})
				.catch((error) => {
					log.error("signoutHandler error: ", error)
					navigate(RouterLocaleSet.MAIN_PAGE)
				})
		}
	}

	return {
		signoutHandler
	}
}
