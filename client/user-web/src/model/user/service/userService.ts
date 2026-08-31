import container, { ContainerSet } from "@/config/di/container"
import type ResponseDto from "@/model/global/dto/responseDto"
import type SignupRequestDto from "@/model/user/dto/request/signupRequestDto"
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
            const responseData: ResponseDto<void> = await this.userRepository.postSignup(dto)
            if (!responseData.isSuccess) {
                throw new Error()
                // TODO: error 처리 필요
            }
        } catch (error) {
            this.log.error("signup error")
            throw error
        }
    }
}