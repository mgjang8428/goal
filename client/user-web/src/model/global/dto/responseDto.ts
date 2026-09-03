import type ResponseErrorDto from "@/model/global/dto/responseErrorDto"

/**
 * 공통 ResponseDto
 * 
 * T: data?
 * ResponseErrorDto: error?
 */
export default interface ResponseDto<T> {
    timestamp: string
    dto?: T
    error?: ResponseErrorDto
}