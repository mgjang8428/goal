import { RouterLocaleSet } from "@/config/route/router"
import useMyInfoViewModel from "@/viewmodel/user/useMyInfoViewModel"
import { useEffect } from "react"
import { NavLink } from "react-router"

export default function MyInfoPage() {
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

        deleteUser,

        isDataUpdate,
        setIsDataUpdate
    } = useMyInfoViewModel()

    useEffect(
        () => {
            loadMyInfoData()
            setIsDataUpdate(false)
        }, [isDataUpdate]
    )
    return (
        <>
            <h1>MyInfoPage</h1>
            <NavLink to={RouterLocaleSet.DASHBOARD_PAGE}>
                <p>Go Dashboard</p>
            </NavLink>
            <br />
            <div>
                <p>username: </p>
                <p>{username}</p>
            </div>
            <div>
                <p>password: </p>
                <button
                    onClick={() => {
                        isPasswordUpdateMode ? setIsPasswordUpdateMode(false) : setIsPasswordUpdateMode(true)
                        setNowPassword("")
                        setNewPassword("")
                    }}
                >
                    {isPasswordUpdateMode ? "취소" : "수정"}
                </button>
                {
                    isPasswordUpdateMode ?
                        (
                            <div>
                                <p>현재 비밀번호: </p>
                                <input
                                    type="password"
                                    value={nowPassword}
                                    onChange={(e) => setNowPassword(e.target.value)}
                                />
                                <p>변경할 비밀번호: </p>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <br />
                                <button onClick={() => changePassword()}>변경</button>
                            </div>
                        ) : (<></>)
                }

            </div>
            <div>
                <p>name: </p>
                <p>{name}</p>
                <button
                    onClick={() => {
                        isNameUpdateMode ? setIsNameUpdateMode(false) : setIsNameUpdateMode(true)
                        setNewName("")
                    }}
                >
                    {isNameUpdateMode ? "취소" : "수정"}
                </button>
                {
                    isNameUpdateMode ?
                        (
                            <div>
                                <p>변경할 이름: </p>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <br />
                                <button onClick={() => changeName()}>변경</button>
                            </div>
                        ) : (<></>)
                }

            </div>
            <div>
                <p>email: </p>
                <p>{email}</p>
                <button
                    onClick={() => {
                        isEmailUpdateMode ? (setIsEmailUpdateMode(false)) : (setIsEmailUpdateMode(true))
                        setNewEmail("")
                    }}
                >
                    {isEmailUpdateMode ? "취소" : "수정"}
                </button>
                {
                    isEmailUpdateMode ?
                        (
                            <div>
                                <p>변경할 이메일: </p>
                                <input
                                    type="text"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                                <br />
                                <button onClick={() => { changeEmail() }}>변경</button>
                            </div>
                        ) : (<></>)
                }
            </div>
            <br />
            <div>
                <button onClick={() => deleteUser()}>회원탈퇴</button>
            </div>
        </>
    )
}
