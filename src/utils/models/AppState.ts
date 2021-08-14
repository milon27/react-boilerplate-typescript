import Response, { iResponse, ColorType } from "./Response"


const AppState = (loading: boolean = false, response: iResponse = Response(
    { success: true, title: "", desc: "", type: ColorType.NONE, object: {} }
), reload: boolean = false) => {
    return {
        loading: loading,
        response: response,
        reload: reload//just update it so it will effect useEffect Hook so will reload automatically:)
    }
}

export default AppState