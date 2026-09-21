import useSignupViewModel from "@/viewmodel/user/useSignupViewModel"
import type React from "react"
import type { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"

export default function SignupPage() {
	const { t } = useTranslation()

	const {
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
	} = useSignupViewModel()

	function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		signupHandler()
	}

	function duplicateCheckBtnHandler() {
		duplicateUsernameCheck()
	}

	function cancelDuplicateCheckBtnHandler() {
		cancelDuplicateCheck()
	}

	function usernameInputOnChangeHandler(
		event: ChangeEvent<HTMLInputElement>
	) {
		setUsername(event.target.value)
	}

	function passwordInputOnChangeHandler(
		event: ChangeEvent<HTMLInputElement>
	) {
		setPassword(event.target.value)
	}

	function passwordCheckInputOnChangeHandler(
		event: ChangeEvent<HTMLInputElement>
	) {
		setPasswordCheck(event.target.value)
	}

	function nameInputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		setName(event.target.value)
	}

	function emailInputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value)
	}

	return (
		<>
			<h1>{t("auth_page:signup.title")}</h1>
			<form onSubmit={submitHandler}>
				<p>{t("auth_page:signup.label.username")}</p>
				{isUsernameInputBlock ? (
					<>
						<span>{username}</span>
						<button
							type="button"
							onClick={cancelDuplicateCheckBtnHandler}
						>
							{t("auth_page:signup.button.username_reinput")}
						</button>
					</>
				) : (
					<>
						<input
							id="username"
							type="text"
							value={username}
							onChange={usernameInputOnChangeHandler}
						/>
						<button
							type="button"
							onClick={duplicateCheckBtnHandler}
						>
							{t("auth_page:signup.button.username_duplicate_check")}
						</button>
					</>
				)}
				<p>{t("auth_page:signup.label.password")}</p>
				<input
					id="password"
					type="password"
					value={password}
					onChange={passwordInputOnChangeHandler}
				/>
				<p>{t("auth_page:signup.label.password_check")}</p>
				<input
					id="passwordCheck"
					type="password"
					value={passwordCheck}
					onChange={passwordCheckInputOnChangeHandler}
				/>
				<p>{t("auth_page:signup.label.name")}</p>
				<input
					id="name"
					type="text"
					value={name}
					onChange={nameInputOnChangeHandler}
				/>
				<p>{t("auth_page:signup.label.email")}</p>
				<input
					id="email"
					type="text"
					value={email}
					onChange={emailInputOnChangeHandler}
				/>
				<br />
				<button type="submit">
					{t("auth_page:signup.button.submit_signup")}
				</button>
			</form>
		</>
	)
}
