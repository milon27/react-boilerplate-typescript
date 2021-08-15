import { createContext, useReducer, FC } from 'react'
import AppState from '../models/AppState';
import AppReducer, { iAppAction } from './reducers/AppReducer';
import { iAppState } from './../models/AppState';
import ListReducer, { iListAction } from './reducers/ListReducer';
import User from '../models/User';

interface iState {
    app?: iAppState,
    clientlist?: User[]
}
interface iDispatch {
    appDispatch?: React.Dispatch<iAppAction>,
    clientlistDispatch?: React.Dispatch<iListAction<User>>
}

export const StateContext = createContext<iState>({})
export const DispatchContext = createContext<iDispatch>({})


const MainContext: FC = (props) => {

    const [app, appDispatch] = useReducer(AppReducer, AppState(false, undefined, false))//for app state
    const [clientlist, clientlistDispatch] = useReducer(ListReducer, []);//for any kind of list

    const global_state: iState = {
        app, clientlist
    }

    const global_dispatch: iDispatch = {
        appDispatch, clientlistDispatch
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
