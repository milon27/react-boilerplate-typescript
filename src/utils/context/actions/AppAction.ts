import Types from './Types';
import React from 'react';
import { iAppAction } from './../reducers/AppReducer';
import { iResponse } from '../../models/Response';

class AppAction {
    dispatch: React.Dispatch<iAppAction>

    constructor(dispatch: React.Dispatch<iAppAction>) {
        this.dispatch = dispatch
    }
    //process
    START_LOADING = () => {
        this.dispatch({
            type: Types.START_LOADING,
        });
    }
    STOP_LOADING = () => {
        this.dispatch({
            type: Types.STOP_LOADING,
        });
    }
    SET_RESPONSE = (response: iResponse) => {
        this.dispatch({
            type: Types.SET_RESPONSE,
            payload: response
        });
    }
    REMOVE_RESPONSE = () => {
        this.dispatch({
            type: Types.REMOVE_RESPONSE,
        });
    }
    RELOAD = () => {
        this.dispatch({
            type: Types.RELOAD,
        });
    }
}

export default AppAction;