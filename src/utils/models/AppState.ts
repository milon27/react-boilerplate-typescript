

export interface iAppState {
    loading: boolean,
    message?: string,
    reload: boolean//just update it so it will effect useEffect Hook so will reload automatically:)
}

const AppState = ({ loading = false, message = undefined, reload = false }: iAppState): iAppState => {
    return {
        loading,
        message,
        reload
    }
}

/**
 * use case
 *  AppState({})
    AppState({
        loading: true
    })
    AppState({
        loading: true,
        message:"this is test message"
    })
    AppState({
        reload: true
    })
 */

export default AppState