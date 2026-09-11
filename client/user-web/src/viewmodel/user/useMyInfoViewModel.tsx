import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type { AuthService } from "@/model/auth/service/authService"
import type GetMyInfoResponseDto from "@/model/user/dto/response/getMyInfoResponseDto"
import type { UserService } from "@/model/user/service/userService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { redirect } from "react-router"

export default function useMyInfoViewModel() {

    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const userService: UserService = container.resolve(ContainerSet.USER_SERVICE)
    const authService: AuthService = container.resolve(ContainerSet.AUTH_SERVICE)

    const { t } = useTranslation('noti')

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [nowPassword, setNowPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const [isNameUpdateMode, setIsNameUpdateMode] = useState(false)
    const [isEmailUpdateMode, setIsEmailUpdateMode] = useState(false)
    const [isPasswordUpdateMode, setIsPasswordUpdateMode] = useState(false)

    async function loadMyInfoData() {
        await userService.getMyInfoData()
            .then((responseDto: GetMyInfoResponseDto) => {
                setUsername(responseDto.username)
                setName(responseDto.name)
                setEmail(responseDto.email)
            })
            .catch((error) => {
                log.error("loadMyInfoData error: ", error)
                alert(t("myinfo_viewmodel.loadmyinfodata_error_alert"))
            })
    }

    async function changePassword() {
        if (!confirm(t("myinfo_viewmodel.changepassword_confirm"))) return
        await userService.changePassword(nowPassword, newPassword)
            .then(() => {
                loadMyInfoData()
                setIsPasswordUpdateMode(false)
                setNowPassword("")
                setNewPassword("")
            })
            .catch((error) => {
                log.error("changePassword error: ", error)
                alert(t("myinfo_viewmodel.changepassword_error_alert"))
            })
    }

    async function changeName() {
        if (!confirm(t("myinfo_viewmodel.changename_confirm"))) return
        await userService.changeName(newName)
            .then(() => {
                loadMyInfoData()
                setIsNameUpdateMode(false)
                setNewName("")
            })
            .catch((error) => {
                log.error("changeName error: ", error)
                alert(t("myinfo_viewmodel.changename_error_alert"))
            })
    }

    async function changeEmail() {
        if (!confirm(t("myinfo_viewmodel.changeemail_confirm"))) return
        await userService.changeEmail(newEmail)
            .then(() => {
                loadMyInfoData()
                setIsEmailUpdateMode(false)
                setNewEmail("")
            })
            .catch((error) => {
                log.error("changeEmail error: ", error)
                alert(t("myinfo_viewmodel.changeemail_error_alert"))
            })
    }

    async function deleteUser() {
        // 삭제 여부 확인
        if (!confirm(t("myinfo_viewmodel.deleteuser_confirm"))) return
        // 비밀번호 입력
        const deleteUserPassword = prompt(t("myinfo_viewmodel.deleteuser_prompt"))
        // 비밀번호 입력 취소 시
        if (deleteUserPassword == null) return
        // 비밀번호 입력 공백 시
        if (deleteUserPassword == "") {
            alert(t("myinfo_viewmodel.deleteuser_prompt_alert"))
            return
        }
        await userService.deleteUser(deleteUserPassword)
            .then(() => {
                authService.signout()
                redirect(RouterLocaleSet.MAIN_PAGE)
            })
            .catch((error) => {
                log.error("deleteUser error: ", error)
                alert(t("myinfo_viewmodel.deleteuser_error_alert"))
            })
    }

    return {
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
    }
}
