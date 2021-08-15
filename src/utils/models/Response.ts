export enum ColorType {
    DANGER = "danger", SUCCESS = "success", PRIMARY = "primary", INFO = "info", NONE = ""
}

export interface iResponse {
    success: boolean
    message: string
    type: ColorType
}

const Response = (success: boolean, message: string, type: ColorType) => {
    return { success: success, message: message, type: type }
}


export interface iResponseObject<T> {
    success: boolean
    message: string
    obj?: T
}
export const ResponseObject = <T>(success: boolean, message: string, obj: any = null): iResponseObject<T> => {
    return { success: success, message: message, obj: obj }
}


export default Response;
