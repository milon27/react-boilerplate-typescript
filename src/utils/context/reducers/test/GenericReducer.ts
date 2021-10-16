import { Reducer, useReducer } from "react";

type iTestAction<T> = {
    type: 'inc' | 'desc',
    payload: T
}
//const createDataFetchReducer = <T>() => (state: State<T>, action: Action<T>): State<T> => {

const GenReducer = <T>() => (state: T, action: iTestAction<T>): T => {
    switch (action.type) {
        case 'inc':
            return action.payload
        case 'desc':
            return action.payload
        default:
            return state
    }
}


//create reducer
const [s, d] = useReducer(GenReducer<number>(), 5)

export default GenReducer;