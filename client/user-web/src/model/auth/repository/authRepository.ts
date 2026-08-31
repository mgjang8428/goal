import container, { ContainerSet } from "@/config/di/container";
import { api } from "@/config/network/api";
import { apiLocale } from "@/config/network/apiLocale";
import type SigninRequestDto from "@/model/auth/dto/request/signinRequestDto";
import type ReissueResponseDto from "@/model/auth/dto/response/reissueResponseDto";
import type SigninResponseDto from "@/model/auth/dto/response/signinResponseDto";
import type ResponseDto from "@/model/global/dto/responseDto";
import type { Logger } from "@/util/logger/logger";

/**
 * AuthRepository Interface
 */
export interface AuthRepository {

    /**
     * POST: 로그인 api
     * @param dto SigninRequestDto: 로그인 요청 DTO
     * @returns Promise<ResponseDto<SigninResponseDto>>: api 로그인 응답 DTO Promise
     */
    postSignin(dto: SigninRequestDto): Promise<ResponseDto<SigninResponseDto>>

    /**
     * POST: 로그아웃 api
     */
    postSignout(): Promise<ResponseDto<void>>

    /**
     * POST: accessToken 재발급 api
     */
    postReissue(): Promise<ResponseDto<ReissueResponseDto>>
}


/**
 * AuthRepository class
 */
export default class AuthRepositoryImpl implements AuthRepository {

    private log: Logger = container.resolve(ContainerSet.LOGGER)

    public async postSignin(dto: SigninRequestDto): Promise<ResponseDto<SigninResponseDto>> {
        this.log.debug("Do authRepository postSignin")
        try {
            const response = await api.post<ResponseDto<SigninResponseDto>>(
                apiLocale.AUTH_SIGNIN,
                dto
            )
            // TODO: error 처리 필요
            return response.data
        } catch (error: unknown) {
            this.log.error("postSignin error")
            throw error
        }
    }

    public async postSignout(): Promise<ResponseDto<void>> {
        this.log.debug("Do authRepository postSignout")
        try {
            const response = await api.post<ResponseDto<void>>(
                apiLocale.AUTH_SIGNOUT
            )
            return response.data
            // TODO: error 처리 필요
        } catch (error: unknown) {
            this.log.error("postSignout error")
            throw error
        }
    }

    public async postReissue(): Promise<ResponseDto<ReissueResponseDto>> {
        this.log.debug("Do authRepository postReissue()")
        try {
            const response = await api.post<ResponseDto<ReissueResponseDto>>(
                apiLocale.AUTH_REISSUE
            )
            return response.data
            // TODO: error 처리 필요
        } catch (error: unknown) {
            this.log.error("postResign error")
            throw error
        }
    }
}