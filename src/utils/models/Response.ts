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

// const MyResponse = (success: boolean, title: string, desc: string, type: ColorType, object?: any) => {
//     return { success, title, desc, type, object: object || {} }
// }
export default Response;
