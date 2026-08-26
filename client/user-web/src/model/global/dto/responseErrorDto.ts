/**
 * api 내부 비즈니스 로직 에러 발생 시 공통 ErrorResponse
 */
export default interface ResponseErrorDto {
    code: number
    message: string
    timestamp: string
}