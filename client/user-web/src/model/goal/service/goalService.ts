import container, { ContainerSet } from "@/config/di/container"
import type CreateGoalRequestDto from "@/model/goal/dto/request/createGoalRequestDto"
import type UpdateGoalRequestDto from "@/model/goal/dto/request/updateGoalRequestDto"
import type GetGoalDetailResponseDto from "@/model/goal/dto/response/getGoalDetailResponseDto"
import type GetGoalListResponseDto from "@/model/goal/dto/response/getGoalListResponseDto"
import type { GoalRepository } from "@/model/goal/repository/goalRepository"

export interface GoalService {

    create(title: string, content: string): Promise<void>

    getGoalList(): Promise<GetGoalListResponseDto[]>

    getGoalDetail(goalId: number): Promise<GetGoalDetailResponseDto>

    updateGoal(goalId: number, title: string, content: string): Promise<void>

    deleteGoal(goalId: number): Promise<void>
}

export default class GoalServiceImpl implements GoalService {

    private goalRepository: GoalRepository = container.resolve(ContainerSet.GOAL_REPOSITORY)

    public async create(title: string, content: string): Promise<void> {
        const requestDto: CreateGoalRequestDto = {
            title: title,
            content: content
        }
        await this.goalRepository.create(requestDto)
    }

    public async getGoalList(): Promise<GetGoalListResponseDto[]> {
        return await this.goalRepository.getGoalList()
    }

    public async getGoalDetail(goalId: number): Promise<GetGoalDetailResponseDto> {
        return await this.goalRepository.getGoalDetail(goalId)
    }

    public async updateGoal(goalId: number, title: string, content: string): Promise<void> {
        const requestDto: UpdateGoalRequestDto = {
            title: title,
            content: content
        }
        await this.goalRepository.updateGoal(goalId, requestDto)
    }

    public async deleteGoal(goalId: number): Promise<void> {
        await this.goalRepository.deleteGoal(goalId)
    }
}