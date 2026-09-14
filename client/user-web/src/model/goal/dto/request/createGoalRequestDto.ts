export default interface CreateGoalRequestDto {
    title: string
    content: string
    startDate: string
    endDate: string
    repeatType: string,
    repeatInfo: RepeatInfoRequestDto[]
}

export const RepeatType = {
    NONE : "NONE",
    ALWAYS : "ALWAYS",
    WEEKLY : "WEEKLY",
    MONTHLY : "MONTHLY",
    YEARLY : "YEARLY",
    SELECT : "SELECT"
} as const

export const WeekType = {
    MON : "MON",
    TUE : "TUE",
    WED : "WED",
    THU : "THU",
    FRI : "FRI",
    SAT : "SAT",
    SUN : "SUN"
} as const

export interface RepeatInfoRequestDto {
    weekRepeatType: string,
    monthRepeatType: number,
    yearRepeat: string,
    dateReport: string
}
