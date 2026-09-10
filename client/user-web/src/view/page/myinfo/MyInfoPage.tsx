import { RouterLocaleSet } from "@/config/route/router"
import useMyInfoViewModel from "@/viewmodel/user/useMyInfoViewModel"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router"

export default function MyInfoPage() {
    const { t } = useTranslation()
    const {
        loadMyInfoData,

        username,
        name,
        email,

        nowPassword, setNowPassword,
        newPassword, setNewPassword,
        newName, setNewName,
        newEmail, setNewEmail,

        isNameUpdateMode, setIsNameUpdateMode,
        isEmailUpdateMode, setIsEmailUpdateMode,
        isPasswordUpdateMode, setIsPasswordUpdateMode,

        changePassword,
        changeName,
        changeEmail,

        deleteUser
    } = useMyInfoViewModel()

    useEffect(() => {
        loadMyInfoData()
    }, [])

    return (
        <>
            <h1>MyInfoPage</h1>
            <NavLink to={RouterLocaleSet.DASHBOARD_PAGE}>
                <p>Go Dashboard</p>
            </NavLink>
            <br />
            <div>
                <span>{t("page.myinfo_page.label.username")} : </span>
                <span>{username}</span>
            </div>
            <div>
                <p>{t("page.myinfo_page.label.password")}</p>
                <button
                    onClick={() => {
                        isPasswordUpdateMode ? setIsPasswordUpdateMode(false) : setIsPasswordUpdateMode(true)
                        setNowPassword("")
                        setNewPassword("")
                    }}
                >
                    {
                        // 비밀번호 변경, 취소 버튼 Text
                        isPasswordUpdateMode ? (
                            t("page.myinfo_page.change_button.cencel")
                        ) : (
                            t("page.myinfo_page.change_button.change")
                        )
                    }
                </button>
                {
                    isPasswordUpdateMode ?
                        (
                            <div>
                                <span>{t("page.myinfo_page.change_label.nowpassword")} : </span>
                                <form>
                                    <input
                                        type="password"
                                        value={nowPassword}
                                        autoComplete="off"
                                        onChange={(e) => setNowPassword(e.target.value)}
                                    />
                                    <br />
                                    <p>{t("page.myinfo_page.change_label.newpassword")} : </p>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        autoComplete="off"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </form>
                                <button onClick={() => changePassword()}>{t("page.myinfo_page.change_button.accept")}</button>
                            </div>
                        ) : (<></>)
                }

            </div>
            <div>
                <span>{t("page.myinfo_page.label.name")} : </span>
                <span>{name}</span>
                <br />
                <button
                    onClick={() => {
                        isNameUpdateMode ? setIsNameUpdateMode(false) : setIsNameUpdateMode(true)
                        setNewName("")
                    }}
                >
                    {
                        // 이름 변경, 취소 버튼 Text
                        isNameUpdateMode ? (
                            t("page.myinfo_page.change_button.cencel")
                        ) : (
                            t("page.myinfo_page.change_button.change")
                        )
                    }
                </button>
                {
                    isNameUpdateMode ?
                        (
                            <div>
                                <span>{t("page.myinfo_page.change_label.newname")} : </span>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <br />
                                <button onClick={() => changeName()}>{t("page.myinfo_page.change_button.accept")}</button>
                            </div>
                        ) : (<></>)
                }

            </div>
            <div>
                <span>{t("page.myinfo_page.label.email")} : </span>
                <span>{email}</span>
                <br />
                <button
                    onClick={() => {
                        isEmailUpdateMode ? (setIsEmailUpdateMode(false)) : (setIsEmailUpdateMode(true))
                        setNewEmail("")
                    }}
                >
                    {
                        isEmailUpdateMode ? (
                            t("page.myinfo_page.change_button.cencel")
                        ) : (
                            t("page.myinfo_page.change_button.change")
                        )
                    }
                </button>
                {
                    isEmailUpdateMode ?
                        (
                            <div>
                                <span>{t("page.myinfo_page.change_label.newemail")} : </span>
                                <input
                                    type="text"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                                <br />
                                <button onClick={() => { changeEmail() }}>{t("page.myinfo_page.change_button.accept")}</button>
                            </div>
                        ) : (<></>)
                }
            </div>
            <br />
            <div>
                <button onClick={() => deleteUser()}>{t("page.myinfo_page.user_delete_button")}</button>
            </div>
        </>
    )
}
