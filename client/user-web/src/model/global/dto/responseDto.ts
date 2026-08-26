import type ResponseErrorDto from "@/model/global/dto/responseErrorDto"

/**
 * 공통 ResponseDto
 * 
 * T: data?
 * ResponseErrorDto: error?
 */
export default interface ResponseDto<T> {
    isSuccess: boolean
    code: number
    message: string
    timestamp: string
    dto?: T
    error?: ResponseErrorDto
}