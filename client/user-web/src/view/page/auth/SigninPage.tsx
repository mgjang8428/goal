import useSigninViewModel from "@/viewmodel/auth/useSigninViewModel"
import type { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"

export default function SigninPage() {
	const { t } = useTranslation()

	const { username, setUsername, password, setPassword, signinHandler } =
		useSigninViewModel()

	function formSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		signinHandler()
	}

	function usernameInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		setUsername(event.target.value)
	}

	function passwordInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value)
	}

	return (
		<>
			<h1>{t("auth_page:signin.title")}</h1>
			<form onSubmit={formSubmitHandler}>
				<p>{t("auth_page:signin.label.username")}</p>
				<input
					id="username"
					type="text"
					value={username}
					onChange={usernameInputChangeHandler}
				/>
				<p>{t("auth_page:signin.label.password")}</p>
				<input
					id="password"
					type="password"
					value={password}
					autoComplete="off"
					onChange={passwordInputChangeHandler}
				/>
				<br />
				<button type="submit">
					{t("auth_page:signin.button.submit_signin")}
				</button>
			</form>
		</>
	)
}
