import { createContext, useReducer, FC } from 'react'
import AppReducer, { iAppAction } from './reducers/AppReducer';
import AppState, { iAppState } from './../models/AppState';
import { iMyMeal } from './../models/mess/MyMeal';
import ListReducer, { iListAction } from './reducers/ListReducer';


interface iState {
    app: iAppState,
    meals: iMyMeal[]
}
interface iDispatch {
    appDispatch: React.Dispatch<iAppAction>,
    mealsDispatch: React.Dispatch<iListAction<iMyMeal>>
}

export const StateContext = createContext({} as iState)
export const DispatchContext = createContext({} as iDispatch)


const MainContext: FC = ({ children }) => {

    const [app, appDispatch] = useReducer(AppReducer, AppState({} as iAppState))//for app state
    const [meals, mealsDispatch] = useReducer(ListReducer, []);//for any kind of list

    const global_state: iState = {
        app, meals
    }

    const global_dispatch: iDispatch = {
        appDispatch, mealsDispatch
    }


    return (
        <StateContext.Provider value={global_state}>
            <DispatchContext.Provider value={global_dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export default MainContext
