import type RepeatInfoResponseDto from "@/model/goal/dto/response/repeatInfoResponseDto"

export default interface GetGoalDetailResponseDto {
	goalId: number
	title: string
	content: string

	isActive: boolean
	startDate: string
	endDate: string

	repeatType: string
	repeatInfo: RepeatInfoResponseDto[]

	createdAt: string
	updatedAt: string
}
