import React, { useState, useContext } from 'react'
import AppAction from '../../utils/context/actions/AppAction';
import { DispatchContext, StateContext } from '../../utils/context/MainContext';
import { TypeOnChange, TypeSetState } from '../../utils/interface/CommonInterface';
import Input from './form/Input';
import MyModal from './modal/MyModal';


interface iDemoModal {
    show: boolean,
    setShow: TypeSetState<boolean>,
    title: string,
    setTitle: TypeSetState<string>
}

//example: for string
const DemoModal: React.FC<iDemoModal> = ({ show, setShow, title, setTitle }) => {

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext)

    const onChange = (e: TypeOnChange) => {
        setTitle(e.target.value);
    };

    const onSubmit = async () => {
        const myapp = new AppAction(appDispatch)
        myapp.START_LOADING()
        setShow(false)
        //do api stuff
        myapp.STOP_LOADING()
    }


    return (
        <div>
            <MyModal
                title="Create New User"
                show={show}
                setShow={setShow}
                onSubmit={onSubmit}
            >
                <Input
                    name="title"
                    title="Title"
                    value={title}
                    onChange={onChange}
                    disabled={app.loading}
                    type="text"
                />
            </MyModal>
        </div>
    )
}

export default DemoModal
