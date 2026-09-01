import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type { AuthService } from "@/model/auth/service/authService"
import type GetMyInfoResponseDto from "@/model/user/dto/response/getMyInfoResponseDto"
import type { UserService } from "@/model/user/service/userService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { redirect } from "react-router"

export default function useMyInfoViewModel() {
    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const userService: UserService = container.resolve(ContainerSet.USER_SERVICE)
    const authService: AuthService = container.resolve(ContainerSet.AUTH_SERVICE)

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
            alert("내정보 불러오기 오류")
            return
        }
    }

    async function changePassword() {
        log.debug("Do changePassword()")
        const confirmResult = confirm("비밀번호 변경?")
        if (!confirmResult) return
        try {
            await userService.changePassword(nowPassword, newPassword)
            setIsDataUpdate(true)
        } catch (error) {
            alert("비밀번호 변경 오류")
            return
        }

    }

    async function changeName() {
        log.debug("Do changeName()")
        const confirmResult = confirm("이름 변경?")
        if (!confirmResult) return
        try {
            await userService.changeName(newName)
            setIsDataUpdate(true)
        } catch (error) {
            alert("이름 변경 오류")
            return
        }

    }

    async function changeEmail() {
        log.debug("Do changeEmail()")
        const confirmResult = confirm("비밀번호 변경?")
        if (!confirmResult) return
        try {
            await userService.changeEmail(newEmail)
            setIsDataUpdate(true)
        } catch (error) {
            alert("이메일 변경 오류")
            return
        }
    }

    async function deleteUser() {
        log.debug("Do deleteUser()")
        const isDeleteConfirm = confirm("탈퇴?")
        if (!isDeleteConfirm) return

        const deleteUserPassword = prompt("현재 비밀번호 입력")
        if (deleteUserPassword == null) return
        if (deleteUserPassword == "") {
            alert("비밀번호를 입력해주세요.")
            return
        }
        try {
            await userService.deleteUser(deleteUserPassword)
            authService.signout()
            redirect(RouterLocaleSet.MAIN_PAGE)
        } catch (error) {
            alert("탈퇴 오류")
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
