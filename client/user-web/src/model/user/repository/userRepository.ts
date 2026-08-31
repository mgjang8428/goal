import container, { ContainerSet } from "@/config/di/container";
import { api } from "@/config/network/api";
import { apiLocale } from "@/config/network/apiLocale";
import type ResponseDto from "@/model/global/dto/responseDto";
import type SignupRequestDto from "@/model/user/dto/request/signupRequestDto";
import type { Logger } from "@/util/logger/logger";

export interface UserRepository {
    /**
     * POST: 가입 api
     * @param dto SignupRequestDto: 가입요청 DTO
     * @returns Promise<ResponseDto<void>>: api 가입응답 DTO Promise
     */
    postSignup(dto: SignupRequestDto): Promise<ResponseDto<void>>
}

export default class UserRepositoryImpl implements UserRepository {
    private log: Logger = container.resolve(ContainerSet.LOGGER)

    public async postSignup(dto: SignupRequestDto): Promise<ResponseDto<void>> {
        this.log.debug("Do userRepository postSignup")
        try {
            const response = await api.post<ResponseDto<void>>(
                apiLocale.USER_SIGNUP,
                dto
            )
            // TODO: error 처리 필요
            return response.data
        } catch (error: unknown) {
            this.log.error("postSignup error")
            throw error
        }
    }
}