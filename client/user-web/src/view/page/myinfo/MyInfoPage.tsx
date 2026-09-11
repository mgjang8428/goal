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
            <div>
                <span>{t("page.myinfo_page.label.username")} : </span>
                <span>{username}</span>
            </div>
            <div>
                <span>{t("page.myinfo_page.label.password")} : </span>
                <button
                    onClick={() => {
                        isPasswordUpdateMode ? setIsPasswordUpdateMode(false) : setIsPasswordUpdateMode(true)
                        setNowPassword("")
                        setNewPassword("")
                    }}
                >
                    {
                        isPasswordUpdateMode ? (
                            t("page.myinfo_page.change_button.cencel")
                        ) : (
                            t("page.myinfo_page.change_button.change")
                        )
                    }
                </button>
                {
                    isPasswordUpdateMode ? (
                        <div>
                            <form>
                                <p>{t("page.myinfo_page.change_label.nowpassword")}</p>
                                <input
                                    type="password"
                                    value={nowPassword}
                                    autoComplete="off"
                                    onChange={(e) => setNowPassword(e.target.value)}
                                />
                                <p>{t("page.myinfo_page.change_label.newpassword")}</p>
                                <input
                                    type="password"
                                    value={newPassword}
                                    autoComplete="off"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </form>
                            <button
                                onClick={changePassword}
                                children={t("page.myinfo_page.change_button.accept")}
                            />
                        </div>
                    ) : (<></>)
                }
            </div>
            <div>
                <span>{t("page.myinfo_page.label.name")} : </span>
                <span>{name}</span>
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
                    isNameUpdateMode ? (
                        <div>
                            <p>{t("page.myinfo_page.change_label.newname")}</p>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <button onClick={() => changeName()}>{t("page.myinfo_page.change_button.accept")}</button>
                        </div>
                    ) : (<></>)
                }
            </div>
            <div>
                <span>{t("page.myinfo_page.label.email")} : </span>
                <span>{email ? email : "-"}</span>
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
                    isEmailUpdateMode ? (
                        <div>
                            <p>{t("page.myinfo_page.change_label.newemail")}</p>
                            <input
                                type="text"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <button
                                onClick={() => { changeEmail() }}
                            >
                                {t("page.myinfo_page.change_button.accept")}
                            </button>
                        </div>
                    ) : (<></>)
                }
            </div>
            <div>
                <button
                    onClick={() => deleteUser()}
                >
                    {t("page.myinfo_page.user_delete_button")}
                </button>
            </div>
        </>
    )
}
