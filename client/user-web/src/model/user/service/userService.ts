import container, { ContainerSet } from "@/config/di/container"
import type ResponseDto from "@/model/global/dto/responseDto"
import type DeleteUserRequestDto from "@/model/user/dto/request/deleteUserRequestDto"
import type SignupRequestDto from "@/model/user/dto/request/signupRequestDto"
import type UpdateMyInfoRequestDto from "@/model/user/dto/request/updateMyInfoRequestDto"
import { UpdateMyInfoRequestType } from "@/model/user/dto/request/updateMyInfoRequestDto"
import type UsernameCheckRequestDto from "@/model/user/dto/request/usernameCheckRequestDto"
import type GetMyInfoResponseDto from "@/model/user/dto/response/getMyInfoResponseDto"
import type { UserRepository } from "@/model/user/repository/userRepository"
import type { Logger } from "@/util/logger/logger"

export interface UserService {
    /**
     * 유저 가입
     * @param username user ID
     * @param password user PW
     * @param name user Name
     * @param email user Email null ok
     */
    signup(username: string, password: string, name: string, email: string): Promise<void>

    /**
     * 유저 ID 중복 확인
     * @param username user ID
     */
    checkUsername(username: string): Promise<void>

    /**
     * 내 정보 가져오기
     */
    getMyInfoData(): Promise<GetMyInfoResponseDto>

    /**
     * 유저 비밀번호 변경
     * @param nowPassword 현재 비밀번호
     * @param newPassword 신규 비밀번호
     */
    changePassword(nowPassword: string, newPassword: string): Promise<void>

    /**
     * 유저 이름 변경
     * @param newName 신규 이름
     */
    changeName(newName: string): Promise<void>

    /**
     * 유지 이메일 변경
     * @param newEmail 신규 이메일
     */
    changeEmail(newEmail: string): Promise<void>

    /**
     * 유저 서비스 탈퇴
     * @param deleteUserPassword 탈퇴 요청 유저 비밀번호
     */
    deleteUser(deleteUserPassword: string): Promise<void>
}

export default class UserServiceImpl implements UserService {

    private log: Logger = container.resolve(ContainerSet.LOGGER)
    private userRepository: UserRepository = container.resolve(ContainerSet.USER_REPOSITORY)

    public async signup(username: string, password: string, name: string, email: string): Promise<void> {
        this.log.debug("Do authService signup()")

        const dto: SignupRequestDto = {
            username: username,
            password: password,
            name: name,
            email: email
        }

        try {
            await this.userRepository.postSignup(dto)
        } catch (error) {
            this.log.error("signup error")
            throw error
        }
    }

    public async checkUsername(username: string): Promise<void> {
        this.log.debug("Do authService usernameCheck()")
        const requestDto: UsernameCheckRequestDto = {
            username: username
        }
        try {
            await this.userRepository.checkUsername(requestDto)
        } catch (error) {
            this.log.error("checkUsername error")
            throw error
        }
        
    }

    public async getMyInfoData(): Promise<GetMyInfoResponseDto> {
        this.log.debug("Do getMyInfoData()")
        try {
            const responseData: ResponseDto<GetMyInfoResponseDto> = await this.userRepository.getMyInfo()
            return responseData.dto as GetMyInfoResponseDto
        } catch (error) {
            this.log.error("getMyInfoData error")
            throw error
        }
    }

    public async changePassword(nowPassword: string, newPassword: string): Promise<void> {
        const requestDto: UpdateMyInfoRequestDto = {
            type: UpdateMyInfoRequestType.PASSWORD,
            nowPassword: nowPassword,
            newPassword: newPassword,
        }
        try {
            await this.userRepository.updateMyInfo(requestDto)
        } catch (error) {
            this.log.error("changePassword error")
        }
    }

    public async changeName(newName: string): Promise<void> {
        const requestDto: UpdateMyInfoRequestDto = {
            type: UpdateMyInfoRequestType.NAME,
            name: newName
        }
        try {
            await this.userRepository.updateMyInfo(requestDto)
        } catch (error) {
            this.log.error("changeName error")
        }
    }

    public async changeEmail(newEmail: string): Promise<void> {
        const requestDto: UpdateMyInfoRequestDto = {
            type: UpdateMyInfoRequestType.EMAIL,
            email: newEmail
        }
        try {
            await this.userRepository.updateMyInfo(requestDto)
        } catch (error) {
            this.log.error("changeEmail error")
        }
    }

    public async deleteUser(deleteUserPassword: string): Promise<void> {
        const requestDto: DeleteUserRequestDto = {
            password: deleteUserPassword
        }
        try {
            this.userRepository.deleteUser(requestDto)
        } catch (error) {
            this.log.error("deleteUser error")
        }
    }
}