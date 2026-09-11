import container, { ContainerSet } from "@/config/di/container";
import { api } from "@/config/network/api";
import { apiLocale } from "@/config/network/apiLocale";
import type SigninRequestDto from "@/model/auth/dto/request/signinRequestDto";
import type ReissueResponseDto from "@/model/auth/dto/response/reissueResponseDto";
import type SigninResponseDto from "@/model/auth/dto/response/signinResponseDto";
import type ResponseDto from "@/model/global/dto/responseDto";
import type { Logger } from "@/util/logger/logger";
import type { AxiosError } from "axios";

export interface AuthRepository {

    postSignin(dto: SigninRequestDto): Promise<SigninResponseDto>

    postSignout(): Promise<void>

    postReissue(): Promise<ReissueResponseDto>
}

export default class AuthRepositoryImpl implements AuthRepository {

    private log: Logger = container.resolve(ContainerSet.LOGGER)

    public async postSignin(dto: SigninRequestDto): Promise<SigninResponseDto> {
        const response = await api.post<ResponseDto<SigninResponseDto>>(
            apiLocale.AUTH_SIGNIN,
            dto
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
        return response.data.dto!
    }

    public async postSignout(): Promise<void> {
        await api.post<ResponseDto<void>>(
            apiLocale.AUTH_SIGNOUT
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
    }

    public async postReissue(): Promise<ReissueResponseDto> {
        const response = await api.post<ResponseDto<ReissueResponseDto>>(
            apiLocale.AUTH_REISSUE
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
        return response.data.dto!
    }
}