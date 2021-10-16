import { Reducer, useReducer } from "react";

type iTestAction1 = {
    type: 'inc' | 'desc',
    payload: number
}

type iTestAction2 = {
    type: 'reset'
}

type iTestAction = iTestAction1 | iTestAction2

const TestReducer: Reducer<number, iTestAction> = (app_state, action): number => {
    switch (action.type) {
        case 'inc':
            return action.payload + 1
        case 'desc':
            return action.payload + 1
        case 'reset':
            return -1
        default:
            return 0;
    }
}

//create reducer
const [state, dispatch] = useReducer(TestReducer, -1)
dispatch({
    type: "reset",
})
dispatch({
    type: 'inc',
    payload: 1
})

export default TestReducer;