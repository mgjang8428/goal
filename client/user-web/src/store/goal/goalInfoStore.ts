import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface GoalInfoStoreState {
	goalId: number
	title: string
	content: string
	startDate: string
	endDate: string

	isEndDate: boolean
	isGoalRepeat: boolean
	isActive: boolean

	repeatType: string
	weekRepeatInfo: WeekRepeatSetCheck
	monthRepeatInfo: number[]
	yearRepeatInfo: string[]
	selectRepeatInfo: string[]

	setGoalId: (goalId: number) => void
	setTitle: (title: string) => void
	setContent: (content: string) => void
	setStartDate: (startDate: string) => void
	setEndDate: (endDate: string) => void

	setIsEndDate: (isEndDate: boolean) => void
	setIsGoalRepeat: (isGoalRepeat: boolean) => void
	setIsActive: (isActive: boolean) => void

	setRepeatType: (repeatType: string) => void
	setWeekRepeatInfoSetDayValue: (
		day: keyof WeekRepeatSetCheck,
		value: boolean
	) => void
	setMonthRepeatInfoSetDate: (date: number) => boolean
	setMonthRepeatInfoDeleteDate: (date: number) => void
	setYearRepeatInfoSetDate: (month: string, date: string) => boolean
	setYearRepeatInfoSetNumberToStringDate: (
		month: number,
		date: number
	) => void
	setYearRepeatInfoDeleteDate: (date: string) => void
	setSelectRepeatInfoSetDate: (date: string) => boolean
	setSelectRepeatInfoDeleteDate: (date: string) => void

	initAllStoreData: () => void
	initRepeatInfoData: () => void

	setAllStoreData: (
		goalId: number,
		title: string,
		content: string,
		startDate: string,
		endDate: string,

		isEndDate: boolean,
		isGoalRepeat: boolean,
		isActive: boolean,

		repeatType: string,
		weekRepeatInfo: WeekRepeatSetCheck,
		monthRepeatInfo: number[],
		yearRepeatInfo: string[],
		selectRepeatInfo: string[]
	) => void
}

export interface WeekRepeatSetCheck {
	MON: boolean
	TUE: boolean
	WED: boolean
	THU: boolean
	FRI: boolean
	SAT: boolean
	SUN: boolean
}

export const weekRepeatDefaultValue: WeekRepeatSetCheck = {
	MON: false,
	TUE: false,
	WED: false,
	THU: false,
	FRI: false,
	SAT: false,
	SUN: false
}

const useGoalInfoStore = create<GoalInfoStoreState>()(
	devtools(
		(set, get) => ({
			goalId: 0,
			title: "",
			content: "",
			startDate: "",
			endDate: "",

			isEndDate: false,
			isGoalRepeat: false,
			isActive: false,

			repeatType: "NONE",
			weekRepeatInfo: weekRepeatDefaultValue,
			monthRepeatInfo: [],
			yearRepeatInfo: [],
			selectRepeatInfo: [],

			setGoalId: (goalId: number) => {
				set({ goalId: goalId }, undefined, "useGoalInfoStore/setGoalId")
			},

			setTitle: (title) => {
				set({ title: title }, undefined, "useGoalInfoStore/setTitle")
			},

			setContent: (content) => {
				set(
					{ content: content },
					undefined,
					"useGoalInfoStore/setContent"
				)
			},

			setStartDate: (startDate) => {
				set(
					{ startDate: startDate },
					undefined,
					"useGoalInfoStore/setStartDate"
				)
			},

			setEndDate: (endDate) => {
				set(
					{ endDate: endDate },
					undefined,
					"useGoalInfoStore/setEndDate"
				)
			},

			setIsEndDate: (isEndDate) => {
				set(
					{ isEndDate: isEndDate },
					undefined,
					"useGoalInfoStore/setIsEndDate"
				)
			},

			setIsGoalRepeat: (isGoalRepeat) => {
				set(
					{ isGoalRepeat: isGoalRepeat },
					undefined,
					"useGoalInfoStore/setIsGoalRepeat"
				)
			},

			setIsActive: (isActive) => {
				set(
					{ isActive: isActive },
					undefined,
					"useGoalInfoStore/setIsActive"
				)
			},

			setRepeatType: (repeatType) => {
				set(
					{ repeatType: repeatType },
					undefined,
					"useGoalInfoStore/setRepeatType"
				)
			},

			setWeekRepeatInfoSetDayValue: (day, value) => {
				set(
					(state) => ({
						weekRepeatInfo: {
							...state.weekRepeatInfo,
							[day]: value
						}
					}),
					undefined,
					"useGoalInfoStore/setWeekRepeatInfoSetDayValue"
				)
			},

			setMonthRepeatInfoSetDate: (date) => {
				const currentMonthRepeatInfo = get().monthRepeatInfo
				if (currentMonthRepeatInfo.includes(date)) {
					return false
				}
				set(
					(state) => ({
						monthRepeatInfo: [...state.monthRepeatInfo, date].sort(
							(a, b) => a - b
						)
					}),
					undefined,
					"useGoalInfoStore/setMonthRepeatInfoSetDate"
				)
				return true
			},

			setMonthRepeatInfoDeleteDate: (date: number) => {
				set(
					(state) => ({
						monthRepeatInfo: [
							...state.monthRepeatInfo.filter(
								(item) => item !== date
							)
						]
					}),
					undefined,
					"useGoalInfoStore/setMonthRepeatInfoDeleteDate"
				)
			},

			setYearRepeatInfoSetDate: (month: string, date: string) => {
				const parseDate = `${month}월${date}일}`
				const currentYearRepeatInfo = get().yearRepeatInfo
				if (currentYearRepeatInfo.includes(parseDate)) {
					return false
				}
				set(
					(state) => ({
						yearRepeatInfo: [
							...state.yearRepeatInfo,
							parseDate
						].sort()
					}),
					undefined,
					"useGoalInfoStore/setYearRepeatInfoSetDate"
				)
				return true
			},

			setYearRepeatInfoSetNumberToStringDate: (
				month: number,
				date: number
			) => {
				const parseDate = `${String(month).padStart(2, "0")}월${String(date).padStart(2, "0")}일`
				set(
					(state) => ({
						yearRepeatInfo: [
							...state.yearRepeatInfo,
							parseDate
						].sort()
					}),
					undefined,
					"useGoalInfoStore/setYearRepeatInfoSetRawDate"
				)
			},

			setYearRepeatInfoDeleteDate: (date: string) => {
				set(
					(state) => ({
						yearRepeatInfo: [
							...state.yearRepeatInfo.filter(
								(item) => item !== date
							)
						]
					}),
					undefined,
					"useGoalInfoStore/setYearRepeatInfoDeleteDate"
				)
			},

			setSelectRepeatInfoSetDate: (date: string) => {
				const currentSelectRepeatInfo = get().selectRepeatInfo
				if (currentSelectRepeatInfo.includes(date)) {
					return false
				}
				set(
					(state) => ({
						selectRepeatInfo: [
							...state.selectRepeatInfo,
							date
						].sort()
					}),
					undefined,
					"useGoalInfoStore/setSelectRepeatInfoSetDate"
				)
				return true
			},

			setSelectRepeatInfoDeleteDate: (date: string) => {
				set(
					(state) => ({
						selectRepeatInfo: [
							...state.selectRepeatInfo.filter(
								(item) => item !== date
							)
						]
					}),
					undefined,
					"useGoalInfoStore/setSelectRepeatInfoDeleteDate"
				)
			},

			initAllStoreData: () => {
				set(
					{
						goalId: 0,
						title: "",
						content: "",
						startDate: "",
						endDate: "",
						repeatType: "NONE",
						weekRepeatInfo: weekRepeatDefaultValue,
						monthRepeatInfo: [],
						yearRepeatInfo: [],
						selectRepeatInfo: [],
						isEndDate: false,
						isGoalRepeat: false,
						isActive: false
					},
					undefined,
					"useGoalInfoStore/initAllStoreData"
				)
			},

			initRepeatInfoData: () => {
				set(
					{
						weekRepeatInfo: weekRepeatDefaultValue,
						monthRepeatInfo: [],
						yearRepeatInfo: [],
						selectRepeatInfo: []
					},
					undefined,
					"useGoalInfoStore/initRepeatInfoData"
				)
			},

			setAllStoreData: (
				goalId: number,
				title: string,
				content: string,
				startDate: string,
				endDate: string,

				isEndDate: boolean,
				isGoalRepeat: boolean,
				isActive: boolean,

				repeatType: string,
				weekRepeatInfo: WeekRepeatSetCheck,
				monthRepeatInfo: number[],
				yearRepeatInfo: string[],
				selectRepeatInfo: string[]
			) => {
				set(
					{
						goalId: goalId,
						title: title,
						content: content,
						startDate: startDate,
						endDate: endDate,

						isEndDate: isEndDate,
						isGoalRepeat: isGoalRepeat,
						isActive: isActive,

						repeatType: repeatType,
						weekRepeatInfo: weekRepeatInfo,
						monthRepeatInfo: monthRepeatInfo,
						yearRepeatInfo: yearRepeatInfo,
						selectRepeatInfo: selectRepeatInfo
					},
					undefined,
					"useGoalInfoStore/setAllStoreData"
				)
			}
		}),
		{ name: "goalInfoStore" }
	)
)

export default useGoalInfoStore
