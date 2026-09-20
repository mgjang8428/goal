import type RepeatInfoRequestDto from "@/model/goal/dto/request/repeatInfoRequestDto"

export default interface CreateGoalRequestDto {
	title: string
	content: string
	isActive: boolean
	startDate: string
	endDate: string
	repeatType: string
	repeatInfo: RepeatInfoRequestDto[]
}
