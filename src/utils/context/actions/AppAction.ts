import Types from './Types';
import React from 'react';
import { iAppAction } from './../reducers/AppReducer';

class AppAction {
    dispatch: React.Dispatch<iAppAction>

    constructor(dispatch: React.Dispatch<iAppAction>) {
        this.dispatch = dispatch
    }
    //process
    START_LOADING = () => {
        this.dispatch({
            type: Types.START_LOADING,
            payload: {
                loading: true
            }
        });
    }
    STOP_LOADING = () => {
        this.dispatch({
            type: Types.STOP_LOADING,
            payload: {
                loading: false
            }
        });
    }
    SET_MESSAGE = (message: string) => {
        this.dispatch({
            type: Types.SET_MESSAGE,
            payload: {
                message: message
            }
        });
        setTimeout(() => {
            this.dispatch({
                type: Types.REMOVE_MESSAGE,
                payload: {
                    message: undefined
                }
            });
        }, 4000)
    }
    REMOVE_MESSAGE = () => {
        this.dispatch({
            type: Types.REMOVE_MESSAGE,
            payload: {
                message: undefined
            }
        });
    }
    RELOAD = () => {
        this.dispatch({
            type: Types.RELOAD
        });
    }
}

export default AppAction;