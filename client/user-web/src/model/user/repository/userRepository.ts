import container, { ContainerSet } from "@/config/di/container";
import { api, authApi } from "@/config/network/api";
import { apiLocale } from "@/config/network/apiLocale";
import type ResponseDto from "@/model/global/dto/responseDto";
import type DeleteUserRequestDto from "@/model/user/dto/request/deleteUserRequestDto";
import type SignupRequestDto from "@/model/user/dto/request/signupRequestDto";
import type UpdateMyInfoRequestDto from "@/model/user/dto/request/updateMyInfoRequestDto";
import type UsernameCheckRequestDto from "@/model/user/dto/request/usernameCheckRequestDto";
import type GetMyInfoResponseDto from "@/model/user/dto/response/getMyInfoResponseDto";
import type { Logger } from "@/util/logger/logger";
import type { AxiosError } from "axios";

export interface UserRepository {

    postSignup(dto: SignupRequestDto): Promise<void>

    checkUsername(requestDto: UsernameCheckRequestDto): Promise<void>

    getMyInfo(): Promise<GetMyInfoResponseDto>

    updateMyInfo(requestDto: UpdateMyInfoRequestDto): Promise<void>

    deleteUser(requestDto: DeleteUserRequestDto): Promise<void>
}

export default class UserRepositoryImpl implements UserRepository {

    private log: Logger = container.resolve(ContainerSet.LOGGER)

    public async postSignup(dto: SignupRequestDto): Promise<void> {
        await api.post<ResponseDto<void>>(
            apiLocale.USER_SIGNUP,
            dto
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
    }

    public async checkUsername(requestDto: UsernameCheckRequestDto): Promise<void> {
        await api.get<ResponseDto<void>>(
            apiLocale.USER_ID_CHECK,
            { params: { username: requestDto.username } }
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
    }

    public async getMyInfo(): Promise<GetMyInfoResponseDto> {
        const response = await authApi.get<ResponseDto<GetMyInfoResponseDto>>(
            apiLocale.USER_GETMYINFO
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })

        return response.data.dto!
    }

    public async updateMyInfo(requestDto: UpdateMyInfoRequestDto): Promise<void> {
        await authApi.patch<ResponseDto<void>>(
            apiLocale.USER_UPDATEMYINFO,
            requestDto
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
    }

    public async deleteUser(requestDto: DeleteUserRequestDto): Promise<void> {
        await authApi.post<ResponseDto<void>>(
            apiLocale.USER_DELETEUSER,
            requestDto
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
    }
}