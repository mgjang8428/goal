import container, { ContainerSet } from "@/config/di/container";
import type SigninRequestDto from "@/model/auth/dto/request/signinRequestDto";
import type ReissueResponseDto from "@/model/auth/dto/response/reissueResponseDto";
import type SigninResponseDto from "@/model/auth/dto/response/signinResponseDto";
import type AuthRepository from "@/model/auth/repository/authRepository";
import type ResponseDto from "@/model/global/dto/responseDto";
import useAuthStore, { type AuthStoreState } from "@/store/authStore";
import type { Logger } from "@/util/logger/logger";

/**
 * AuthService Interface
 */
export interface AuthService {

    /**
     * 유저 로그인
     * @param username user ID
     * @param password user PW
     */
    signin(username: string, password: string): Promise<void>

    /**
     * 유저 로그아웃
     */
    signout(): Promise<void>

    /**
     * accessToken 재발행
     */
    reissue(): Promise<void>
}

export default class AuthServiceImpl implements AuthService {

    private log: Logger = container.resolve(ContainerSet.LOGGER)
    private authRepository: AuthRepository = container.resolve(ContainerSet.AUTH_REPOSITORY)

    public async signin(
        username: string,
        password: string
    ): Promise<void> {
        this.log.debug("Do authService signin")
        const { setAccessToken }: AuthStoreState = useAuthStore.getState()
        const requestDto: SigninRequestDto = { username: username, password: password }
        try {
            const responseData: ResponseDto<SigninResponseDto> = await this.authRepository.postSignin(requestDto)
            const accessCode: string | null = responseData.dto?.accessToken ?? null
            setAccessToken(accessCode)
        } catch (error) {
            this.log.error("signin error")
            throw error
        }
    }

    async signout(): Promise<void> {
        const { popAccessToken }: AuthStoreState = useAuthStore.getState()
        try {
            await this.authRepository.postSignout()
        } catch (error) {
            this.log.error("signout error")
        } finally {
            popAccessToken()
        }
    }

    async reissue(): Promise<void> {
        const { setAccessToken }: AuthStoreState = useAuthStore.getState()
        try {
            const responseData: ResponseDto<ReissueResponseDto> = await this.authRepository.postReissue()
            setAccessToken(responseData.dto?.accessToken as string)
        } catch (error) {
            this.log.error("reissue error")
        }
    }
}