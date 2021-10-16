export interface iApiResponse<T> {
    error: boolean
    message: string
    response?: T
}
const ApiResponse = <T>(
    error: boolean,
    message: string,
    response?: T
): iApiResponse<T> => {
    return {
        error,
        message,
        response
    }
}

export default ApiResponse