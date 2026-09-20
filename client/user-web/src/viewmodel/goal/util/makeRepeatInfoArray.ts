import RepeatType from "@/model/goal/const/repeatType"
import type RepeatInfoRequestDto from "@/model/goal/dto/request/repeatInfoRequestDto"
import type { WeekRepeatSetCheck } from "@/store/goal/goalInfoStore"

export function makeRepeatInfoArray(
	repeatType: string,
	weekRepeatInfo: WeekRepeatSetCheck,
	monthRepeatInfo: number[],
	yearRepeatInfo: string[],
	selectRepeatInfo: string[]
): RepeatInfoRequestDto[] {
	let repeatInfo: RepeatInfoRequestDto[] = []

	switch (repeatType) {
		case RepeatType.NONE:
			break
		case RepeatType.ALWAYS:
			break
		case RepeatType.WEEKLY:
			for (const [day, value] of Object.entries(weekRepeatInfo)) {
				if (value == true) {
					const repeatInfoRequestDto: RepeatInfoRequestDto = {
						weekRepeatType: day
					}
					repeatInfo.push(repeatInfoRequestDto)
				}
			}
			break
		case RepeatType.MONTHLY:
			monthRepeatInfo.forEach((date: number) => {
				const repeatInfoRequestDto: RepeatInfoRequestDto = {
					monthRepeatNum: date
				}
				repeatInfo.push(repeatInfoRequestDto)
			})
			break
		case RepeatType.YEARLY:
			yearRepeatInfo.forEach((rawDate: string) => {
				const rawDateFormat = /(\d{1,2})월\s*(\d{1,2})일/

				const match = rawDate.match(rawDateFormat)

				let month: number | null
				let date: number | null

				if (match) {
					month = Number(match[1])
					date = Number(match[2])
				} else throw new Error("문자열 포멧 에러")

				const repeatInfoRequestDto: RepeatInfoRequestDto = {
					yearRepeatMonth: month,
					yearRepeatDate: date
				}
				repeatInfo.push(repeatInfoRequestDto)
			})
			break
		case RepeatType.SELECT:
			selectRepeatInfo.forEach((date: string) => {
				const repeatInfoRequestDto: RepeatInfoRequestDto = {
					selectRepeat: date
				}
				repeatInfo.push(repeatInfoRequestDto)
			})
			break
		default:
			throw new Error()
	}
	return repeatInfo
}
