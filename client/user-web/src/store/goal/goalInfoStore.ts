import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface GoalInfoStoreState {
    initAllStoreData: () => void
    initRepeatInfoData: () => void

    title: string
    setTitle: (title: string) => void

    content: string
    setContent: (content: string) => void

    startDate: string
    setStartDate: (startDate: string) => void

    endDate: string
    setEndDate: (endDate: string) => void

    repeatType: string
    setRepeatType: (repeatType: string) => void

    weekRepeatInfo: WeekRepeatSetCheck
    setWeekRepeatInfoSetDayValue: (
        day: keyof WeekRepeatSetCheck,
        value: boolean
    ) => void

    monthRepeatInfo: number[]
    setMonthRepeatInfoSetDate: (date: number) => boolean
    setMonthRepeatInfoDeleteDate: (date: number) => void

    yearRepeatInfo: string[]
    setYearRepeatInfoSetDate: (date: string) => boolean
    setYearRepeatInfoDeleteDate: (date: string) => void

    selectRepeatInfo: string[]
    setSelectRepeatInfoSetDate: (date: string) => boolean
    setSelectRepeatInfoDeleteDate: (date: string) => void

    isEndDate: boolean
    setIsEndDate: (isEndDate: boolean) => void

    isGoalRepeat: boolean
    setIsGoalRepeat: (isGoalRepeat: boolean) => void

    isActive: boolean
    setIsActive: (isActive: boolean) => void
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

const useGoalInfoStore = create<GoalInfoStoreState>()(
    devtools(
        (set, get) => ({

            initAllStoreData: () => {
                set(
                    {
                        title: "",
                        content: "",
                        startDate: "",
                        endDate: "",
                        repeatType: "NONE",
                        weekRepeatInfo: {
                            MON: false,
                            TUE: false,
                            WED: false,
                            THU: false,
                            FRI: false,
                            SAT: false,
                            SUN: false
                        },
                        monthRepeatInfo: [],
                        yearRepeatInfo: [],
                        selectRepeatInfo: [],
                        isEndDate: false,
                        isGoalRepeat: false,
                        isActive: false,
                    },
                    undefined,
                    "useGoalInfoStore/initAllStoreData"
                )
            },
            initRepeatInfoData: () => {
                set(
                    {
                        weekRepeatInfo: {
                            MON: false,
                            TUE: false,
                            WED: false,
                            THU: false,
                            FRI: false,
                            SAT: false,
                            SUN: false
                        },
                        monthRepeatInfo: [],
                        yearRepeatInfo: [],
                        selectRepeatInfo: [],
                    },
                    undefined,
                    "useGoalInfoStore/initRepeatInfoData"
                )
            },

            title: "",
            setTitle: (title) => {
                set(
                    { title: title },
                    undefined,
                    'useGoalInfoStore/setTitle'
                )
            },

            content: "",
            setContent: (content) => {
                set(
                    { content: content },
                    undefined,
                    'useGoalInfoStore/setContent'
                )
            },

            startDate: "",
            setStartDate: (startDate) => {
                set(
                    { startDate: startDate },
                    undefined,
                    'useGoalInfoStore/setStartDate'
                )
            },

            endDate: "",
            setEndDate: (endDate) => {
                set(
                    { endDate: endDate },
                    undefined,
                    'useGoalInfoStore/setEndDate'
                )
            },

            repeatType: "NONE",
            setRepeatType: (repeatType) => {
                set(
                    { repeatType: repeatType },
                    undefined,
                    'useGoalInfoStore/setRepeatType'
                )
            },

            weekRepeatInfo: {
                MON: false,
                TUE: false,
                WED: false,
                THU: false,
                FRI: false,
                SAT: false,
                SUN: false,
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

            monthRepeatInfo: [],
            setMonthRepeatInfoSetDate: (date) => {
                const currentMonthRepeatInfo = get().monthRepeatInfo
                if (currentMonthRepeatInfo.includes(date)) {
                    return false
                }
                set(
                    (state) => ({
                        monthRepeatInfo: [...state.monthRepeatInfo, date]
                            .sort((a, b) => a - b)
                    }),
                    undefined,
                    "useGoalInfoStore/setMonthRepeatInfoSetDate"
                )
                return true;
            },
            setMonthRepeatInfoDeleteDate: (date: number) => {
                set(
                    (state) => ({
                        monthRepeatInfo: [
                            ...state.monthRepeatInfo
                                .filter((item) => item !== date)
                        ]
                    }),
                    undefined,
                    "useGoalInfoStore/setMonthRepeatInfoDeleteDate"
                )
            },

            yearRepeatInfo: [],
            setYearRepeatInfoSetDate: (date: string) => {
                const currentYearRepeatInfo = get().yearRepeatInfo
                if (currentYearRepeatInfo.includes(date)) {
                    return false
                }
                set(
                    (state) => ({
                        yearRepeatInfo: [...state.yearRepeatInfo, date]
                            .sort()
                    }),
                    undefined,
                    "useGoalInfoStore/setYearRepeatInfoSetDate"
                )
                return true
            },
            setYearRepeatInfoDeleteDate: (date: string) => {
                set(
                    (state) => ({
                        yearRepeatInfo: [
                            ...state.yearRepeatInfo
                                .filter((item) => item !== date)
                        ]
                    }),
                    undefined,
                    "useGoalInfoStore/setYearRepeatInfoDeleteDate"
                )
            },

            selectRepeatInfo: [],
            setSelectRepeatInfoSetDate: (date: string) => {
                const currentSelectRepeatInfo = get().selectRepeatInfo
                if (currentSelectRepeatInfo.includes(date)) {
                    return false
                }
                set(
                    (state) => ({
                        selectRepeatInfo: [...state.selectRepeatInfo, date]
                            .sort()
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
                            ...state.selectRepeatInfo
                                .filter((item) => item !== date)
                        ]
                    }),
                    undefined,
                    "useGoalInfoStore/setSelectRepeatInfoDeleteDate"
                )
            },

            isEndDate: false,
            setIsEndDate: (isEndDate) => {
                set(
                    { isEndDate: isEndDate },
                    undefined,
                    'useGoalInfoStore/setIsEndDate'
                )
            },

            isGoalRepeat: false,
            setIsGoalRepeat: (isGoalRepeat) => {
                set(
                    { isGoalRepeat: isGoalRepeat },
                    undefined,
                    'useGoalInfoStore/setIsGoalRepeat'
                )
            },

            isActive: false,
            setIsActive: (isActive) => {
                set(
                    { isActive: isActive },
                    undefined,
                    'useGoalInfoStore/setIsActive'
                )
            },
        }),
        { name: "goalInfoStore" }
    )
)

export default useGoalInfoStore