import { iResponse } from "./Response"


export interface iAppState {
    loading: boolean,
    response?: iResponse,
    reload: boolean
}

const AppState = (loading: boolean = false, response?: iResponse, reload: boolean = false): iAppState => {
    return {
        loading: loading,
        response: response,
        reload: reload//just update it so it will effect useEffect Hook so will reload automatically:)
    }
}


export default AppState