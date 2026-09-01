export const UpdateMyInfoRequestType = {
    PASSWORD: "PASSWORD",
    NAME: "NAME",
    EMAIL: "EMAIL"
} as const

export default interface UpdateMyInfoRequestDto {
    type: string
    nowPassword?: string
    newPassword?: string
    name?: string
    email?: string
}