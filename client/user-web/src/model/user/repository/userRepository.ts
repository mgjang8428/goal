import container, { ContainerSet } from "@/config/di/container";
import { api, authApi } from "@/config/network/api";
import { apiLocale } from "@/config/network/apiLocale";
import type ResponseDto from "@/model/global/dto/responseDto";
import type DeleteUserRequestDto from "@/model/user/dto/request/deleteUserRequestDto";
import type SignupRequestDto from "@/model/user/dto/request/signupRequestDto";
import type UpdateMyInfoRequestDto from "@/model/user/dto/request/updateMyInfoRequestDto";
import type GetMyInfoResponseDto from "@/model/user/dto/response/getMyInfoResponseDto";
import type { Logger } from "@/util/logger/logger";

export interface UserRepository {
    /**
     * POST: 가입 api
     * @param dto SignupRequestDto: 가입요청 DTO
     * @returns Promise<ResponseDto<void>>: api 가입응답 DTO Promise
     */
    postSignup(dto: SignupRequestDto): Promise<void>

    /**
     * GET: 내정보 가져오기 api
     * @returns Promise<ResponseDto<GetMyInfoResponseDto>>: api 내정보 DTO Promise
     */
    getMyInfo(): Promise<ResponseDto<GetMyInfoResponseDto>>

    /**
     * PATCH: 내정보 수정 api
     */
    updateMyInfo(requestDto: UpdateMyInfoRequestDto): Promise<void>

    /**
     * DELETE: 유저 탈퇴 api
     */
    deleteUser(requestDto: DeleteUserRequestDto): Promise<void>
}

export default class UserRepositoryImpl implements UserRepository {

    private log: Logger = container.resolve(ContainerSet.LOGGER)

    public async postSignup(dto: SignupRequestDto): Promise<void> {
        this.log.debug("Do userRepository postSignup")
        try {
            await api.post<ResponseDto<void>>(
                apiLocale.USER_SIGNUP,
                dto
            )
        } catch (error: unknown) {
            this.log.error("postSignup error")
            throw error
        }
    }

    public async getMyInfo(): Promise<ResponseDto<GetMyInfoResponseDto>> {
        this.log.debug("Do userRepository getMyInfo()")
        try {
            const response = await authApi.get<ResponseDto<GetMyInfoResponseDto>>(
                apiLocale.USER_GETMYINFO
            )
            return response.data
        } catch (error) {
            this.log.error("getMyInfo error")
            throw error
        }
    }

    public async updateMyInfo(requestDto: UpdateMyInfoRequestDto): Promise<void> {
        this.log.debug("Do userRepository updateMyInfo()")
        try {
            await authApi.patch<ResponseDto<void>>(
                apiLocale.USER_UPDATEMYINFO,
                requestDto
            )
        } catch (error) {
            this.log.error("updateMyInfo error")
            throw error
        }
    }

    public async deleteUser(requestDto: DeleteUserRequestDto): Promise<void> {
        this.log.debug("Do userRepository deleteUser()")
        try {
            await authApi.post<ResponseDto<void>>(
                apiLocale.USER_DELETEUSER,
                requestDto
            )
        } catch (error) {
            this.log.error("deleteUser error")
            throw error
        }
    }
}