import { createContext, useReducer, FC } from 'react'
import AppState from '../models/AppState';
import AppReducer, { iAppAction } from './reducers/AppReducer';
import { iAppState } from './../models/AppState';
import ListReducer, { iListAction } from './reducers/ListReducer';

interface iState {
    app?: iAppState,
    list?: any[]
}
interface iDispatch {
    appDispatch?: React.Dispatch<iAppAction>,
    listDispatch?: React.Dispatch<iListAction>
}

export const StateContext = createContext<iState>({})
export const DispatchContext = createContext<iDispatch>({})


const MainContext: FC = (props) => {

    //const [auth, authDispatch] = useReducer(AuthReducer, initAuthState);//for student auth
    const [app, appDispatch] = useReducer(AppReducer, AppState(false, undefined, false))//for app state
    const [list, listDispatch] = useReducer(ListReducer, []);//for any kind of list

    const global_state: iState = {
        app, list
    }

    const global_dispatch: iDispatch = {
        appDispatch, listDispatch
    }


    return (
        <StateContext.Provider value={global_state}>
            <DispatchContext.Provider value={global_dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export default MainContext
