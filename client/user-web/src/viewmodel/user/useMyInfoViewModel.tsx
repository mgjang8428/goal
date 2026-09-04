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

    const [isDataUpdate, setIsDataUpdate] = useState(false)

    async function loadMyInfoData() {
        log.debug("Do getMyInfoData()")
        try {
            const responseDto: GetMyInfoResponseDto = await userService.getMyInfoData()
            setUsername(responseDto.username)
            setName(responseDto.name)
            setEmail(responseDto.email)
        } catch (error) {
            alert(t("myinfo_viewmodel.loadmyinfodata_error_alert"))
            return
        }
    }

    async function changePassword() {
        log.debug("Do changePassword()")
        const confirmResult = confirm(t("myinfo_viewmodel.changepassword_confirm"))
        if (!confirmResult) return
        try {
            await userService.changePassword(nowPassword, newPassword)
            setIsDataUpdate(true)
            setIsPasswordUpdateMode(false)
            setNowPassword("")
            setNewPassword("")
        } catch (error) {
            alert(t("myinfo_viewmodel.changepassword_error_alert"))
            return
        }

    }

    async function changeName() {
        log.debug("Do changeName()")
        const confirmResult = confirm(t("myinfo_viewmodel.changename_confirm"))
        if (!confirmResult) return
        try {
            await userService.changeName(newName)
            setIsDataUpdate(true)
            setIsNameUpdateMode(false)
            setNewName("")
        } catch (error) {
            alert(t("myinfo_viewmodel.changename_error_alert"))
            return
        }

    }

    async function changeEmail() {
        log.debug("Do changeEmail()")
        const confirmResult = confirm(t("myinfo_viewmodel.changeemail_confirm"))
        if (!confirmResult) return
        try {
            await userService.changeEmail(newEmail)
            setIsDataUpdate(true)
            setIsEmailUpdateMode(false)
            setNewEmail("")
        } catch (error) {
            alert(t("myinfo_viewmodel.changeemail_error_alert"))
            return
        }
    }

    async function deleteUser() {
        log.debug("Do deleteUser()")
        const isDeleteConfirm = confirm(t("myinfo_viewmodel.deleteuser_confirm"))
        if (!isDeleteConfirm) return

        const deleteUserPassword = prompt(t("myinfo_viewmodel.deleteuser_prompt"))
        if (deleteUserPassword == null) return
        if (deleteUserPassword == "") {
            alert(t("myinfo_viewmodel.deleteuser_prompt_alert"))
            return
        }
        try {
            await userService.deleteUser(deleteUserPassword)
            authService.signout()
            redirect(RouterLocaleSet.MAIN_PAGE)
        } catch (error) {
            alert(t("myinfo_viewmodel.deleteuser_error_alert"))
            return
        }

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

        deleteUser,

        isDataUpdate,
        setIsDataUpdate
    }
}
