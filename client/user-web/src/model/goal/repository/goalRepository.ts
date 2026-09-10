import container, { ContainerSet } from "@/config/di/container";
import { authApi } from "@/config/network/api";
import { apiLocale } from "@/config/network/apiLocale";
import type ResponseDto from "@/model/global/dto/responseDto";
import type CreateGoalRequestDto from "@/model/goal/dto/request/createGoalRequestDto";
import type UpdateGoalRequestDto from "@/model/goal/dto/request/updateGoalRequestDto";
import type GetGoalDetailResponseDto from "@/model/goal/dto/response/getGoalDetailResponseDto";
import type GetGoalListResponseDto from "@/model/goal/dto/response/getGoalListResponseDto";
import type { Logger } from "@/util/logger/logger";
import type { AxiosError } from "axios";

export interface GoalRepository {

    create(requestDto: CreateGoalRequestDto): Promise<void>

    getGoalList(): Promise<GetGoalListResponseDto[]>

    getGoalDetail(goalId: number): Promise<GetGoalDetailResponseDto>

    updateGoal(goalId: number, requestDto: UpdateGoalRequestDto): Promise<void>

    deleteGoal(goalId: number): Promise<void>
}

export default class GoalRepositoryImpl implements GoalRepository {

    private log: Logger = container.resolve(ContainerSet.LOGGER)

    public async create(requestDto: CreateGoalRequestDto): Promise<void> {
        await authApi.post(
            apiLocale.GOAL_CREATE,
            requestDto
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
    }

    public async getGoalList(): Promise<GetGoalListResponseDto[]> {
        const response = await authApi.get<ResponseDto<GetGoalListResponseDto[]>>(
            apiLocale.GOAL_GETLIST
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
        return response.data.dto!
    }

    public async getGoalDetail(goalId: number): Promise<GetGoalDetailResponseDto> {
        const response = await authApi.get<ResponseDto<GetGoalDetailResponseDto>>(
            apiLocale.GOAL_GETDETAIL(goalId)
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
        return response.data.dto!
    }

    public async updateGoal(goalId: number, requestDto: UpdateGoalRequestDto): Promise<void> {
        await authApi.patch(
            apiLocale.GOAL_UPDATE(goalId),
            requestDto
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
    }

    public async deleteGoal(goalId: number): Promise<void> {
        await authApi.delete(
            apiLocale.GOAL_DELETE(goalId)
        ).catch((error: AxiosError<ResponseDto<void>>) => {
            this.log.error(error.response?.data.error)
            throw error
        })
    }
}