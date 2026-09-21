import useMyInfoViewModel from "@/viewmodel/user/useMyInfoViewModel"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function MyInfoPage() {
	const { t } = useTranslation()
	const {
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
	} = useMyInfoViewModel()

	useEffect(() => {
		loadMyInfoData()
	}, [loadMyInfoData])

	return (
		<>
			<h1>{t("auth_page:myinfo.title")}</h1>
			<div>
				<span>{t("auth_page:myinfo.label.username")} : </span>
				<span>{username}</span>
			</div>
			<div>
				<span>{t("auth_page:myinfo.label.password_change")}</span>
				<br />
				<button
					onClick={() => {
						setIsPasswordUpdateMode(!isPasswordUpdateMode)
						setNowPassword("")
						setNewPassword("")
					}}
				>
					{isPasswordUpdateMode
						? t("auth_page:myinfo.button.password_change_cencel")
						: t("auth_page:myinfo.button.password_change_start")}
				</button>
				{isPasswordUpdateMode ? (
					<div>
						<form>
							<p>
								{t("auth_page:myinfo.label.now_password_input")}
							</p>
							<input
								type="password"
								value={nowPassword}
								autoComplete="off"
								onChange={(e) => setNowPassword(e.target.value)}
							/>
							<p>
								{t("auth_page:myinfo.label.new_password_input")}
							</p>
							<input
								type="password"
								value={newPassword}
								autoComplete="off"
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</form>
						<button onClick={changePassword}>
							{t(
								"auth_page:myinfo.button.password_change_accept"
							)}
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
			<div>
				<span>{t("auth_page:myinfo.label.name")} : </span>
				<span>{name}</span>
				<br />
				<button
					onClick={() => {
						setIsNameUpdateMode(!isNameUpdateMode)
						setNewName("")
					}}
				>
					{
						// 이름 변경, 취소 버튼 Text
						isNameUpdateMode
							? t("auth_page:myinfo.button.name_change_cencel")
							: t("auth_page:myinfo.button.name_change_start")
					}
				</button>
				{isNameUpdateMode ? (
					<div>
						<p>{t("auth_page:myinfo.label.new_name_input")}</p>
						<input
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<button onClick={() => changeName()}>
							{t("auth_page:myinfo.button.name_change_accept")}
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
			<div>
				<span>{t("auth_page:myinfo.label.email")} : </span>
				<span>{email ? email : "-"}</span>
				<br />
				<button
					onClick={() => {
						setIsEmailUpdateMode(isEmailUpdateMode)
						setNewEmail("")
					}}
				>
					{isEmailUpdateMode
						? t("auth_page:myinfo.button.email_change_cencel")
						: t("auth_page:myinfo.button.email_change_start")}
				</button>
				{isEmailUpdateMode ? (
					<div>
						<p>{t("auth_page:myinfo.label.new_email_input")}</p>
						<input
							type="text"
							value={newEmail}
							onChange={(e) => setNewEmail(e.target.value)}
						/>
						<button
							onClick={() => {
								changeEmail()
							}}
						>
							{t("auth_page:myinfo.button.email_change_accept")}
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
			<p>{t("auth_page:myinfo.label.user_delete")}</p>
			<div>
				<button onClick={() => deleteUser()}>
					{t("auth_page:myinfo.button.user_delete")}
				</button>
			</div>
		</>
	)
}
