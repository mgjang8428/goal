import container, { ContainerSet } from "@/config/di/container"
import type DeleteUserRequestDto from "@/model/user/dto/request/deleteUserRequestDto"
import type SignupRequestDto from "@/model/user/dto/request/signupRequestDto"
import type UpdateMyInfoRequestDto from "@/model/user/dto/request/updateMyInfoRequestDto"
import { UpdateMyInfoRequestType } from "@/model/user/dto/request/updateMyInfoRequestDto"
import type UsernameCheckRequestDto from "@/model/user/dto/request/usernameCheckRequestDto"
import type GetMyInfoResponseDto from "@/model/user/dto/response/getMyInfoResponseDto"
import type { UserRepository } from "@/model/user/repository/userRepository"

export interface UserService {

    signup(username: string, password: string, name: string, email: string): Promise<void>

    checkUsername(username: string): Promise<void>

    getMyInfoData(): Promise<GetMyInfoResponseDto>

    changePassword(nowPassword: string, newPassword: string): Promise<void>

    changeName(newName: string): Promise<void>

    changeEmail(newEmail: string): Promise<void>

    deleteUser(deleteUserPassword: string): Promise<void>
}

export default class UserServiceImpl implements UserService {

    private userRepository: UserRepository = container.resolve(ContainerSet.USER_REPOSITORY)

    public async signup(username: string, password: string, name: string, email: string): Promise<void> {
        const requestDto: SignupRequestDto = {
            username: username,
            password: password,
            name: name,
            email: email
        }
        await this.userRepository.postSignup(requestDto)
    }

    public async checkUsername(username: string): Promise<void> {
        const requestDto: UsernameCheckRequestDto = {
            username: username
        }
        await this.userRepository.checkUsername(requestDto)
    }

    public async getMyInfoData(): Promise<GetMyInfoResponseDto> {
        return await this.userRepository.getMyInfo()
    }

    public async changePassword(nowPassword: string, newPassword: string): Promise<void> {
        const requestDto: UpdateMyInfoRequestDto = {
            type: UpdateMyInfoRequestType.PASSWORD,
            nowPassword: nowPassword,
            newPassword: newPassword,
        }
        await this.userRepository.updateMyInfo(requestDto)
    }

    public async changeName(newName: string): Promise<void> {
        const requestDto: UpdateMyInfoRequestDto = {
            type: UpdateMyInfoRequestType.NAME,
            name: newName
        }
        await this.userRepository.updateMyInfo(requestDto)
    }

    public async changeEmail(newEmail: string): Promise<void> {
        const requestDto: UpdateMyInfoRequestDto = {
            type: UpdateMyInfoRequestType.EMAIL,
            email: newEmail
        }
        await this.userRepository.updateMyInfo(requestDto)
    }

    public async deleteUser(deleteUserPassword: string): Promise<void> {
        const requestDto: DeleteUserRequestDto = {
            password: deleteUserPassword
        }
        this.userRepository.deleteUser(requestDto)
    }
}