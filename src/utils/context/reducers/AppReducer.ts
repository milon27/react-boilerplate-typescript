import Types from './../actions/Types';
import { iAppState } from './../../models/AppState';
import { Reducer } from "react";


type LoadingAction = {
    type: Types.START_LOADING | Types.STOP_LOADING,
    payload: {
        loading: boolean
    }
}

type ResponseAction = {
    type: Types.SET_MESSAGE | Types.REMOVE_MESSAGE,
    payload: {
        message?: string
    }
}

type ReloadAction = {
    type: Types.RELOAD
}

export type iAppAction = LoadingAction | ResponseAction | ReloadAction

const AppReducer: Reducer<iAppState, iAppAction> = (app_state, action): iAppState => {
    switch (action.type) {
        case Types.START_LOADING:
            return {
                ...app_state,
                loading: true
            }
        case Types.STOP_LOADING:
            return {
                ...app_state,
                loading: false
            }
        case Types.SET_MESSAGE:
            return {
                ...app_state,
                message: action.payload.message
            }
        case Types.REMOVE_MESSAGE:
            return {
                ...app_state,
                message: undefined
            }
        case Types.RELOAD:
            return {
                ...app_state,
                reload: !app_state.reload//just change it will auto call useEffect
            }
        default:
            return app_state;
    }
}
export default AppReducer;