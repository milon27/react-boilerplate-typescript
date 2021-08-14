export enum ColorType {
    DANGER = "danger", SUCCESS = "success", PRIMARY = "primary", INFO = "info", NONE = ""
}

export interface iResponse<Type extends any = {}> {
    success: boolean
    title: string
    desc: string
    type: ColorType
    object: Type | any
}

const Response = <Type extends any = {}>({ success, title, desc, type, object }: iResponse<Type>) => {
    return { success: success, title: title, desc: desc, type: type, object: object }
}

export default Response;
