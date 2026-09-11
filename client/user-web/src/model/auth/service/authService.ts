import container, { ContainerSet } from "@/config/di/container";
import type SigninRequestDto from "@/model/auth/dto/request/signinRequestDto";
import type ReissueResponseDto from "@/model/auth/dto/response/reissueResponseDto";
import type SigninResponseDto from "@/model/auth/dto/response/signinResponseDto";
import type AuthRepository from "@/model/auth/repository/authRepository";
import useAuthStore, { type AuthStoreState } from "@/store/authStore";

export interface AuthService {

    signin(username: string, password: string): Promise<void>

    signout(): Promise<void>

    reissue(): Promise<void>
}

export default class AuthServiceImpl implements AuthService {

    private authRepository: AuthRepository = container.resolve(ContainerSet.AUTH_REPOSITORY)

    public async signin(
        username: string,
        password: string
    ): Promise<void> {
        const { setAccessToken }: AuthStoreState = useAuthStore.getState()
        const requestDto: SigninRequestDto = {
            username: username,
            password: password
        }
        const responseDto: SigninResponseDto = await this.authRepository.postSignin(requestDto)
        setAccessToken(responseDto.accessToken)
    }

    async signout(): Promise<void> {
        const { popAccessToken }: AuthStoreState = useAuthStore.getState()
        await this.authRepository.postSignout()
            .finally(() => { popAccessToken() })
    }

    async reissue(): Promise<void> {
        const { setAccessToken }: AuthStoreState = useAuthStore.getState()
        const responseDto: ReissueResponseDto = await this.authRepository.postReissue()
        setAccessToken(responseDto.accessToken)
    }
}