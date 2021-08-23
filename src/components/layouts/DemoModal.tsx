import React, { useState, useContext } from 'react'
import AppAction from '../../utils/context/actions/AppAction';
import { DispatchContext, StateContext } from '../../utils/context/MainContext';
import { TypeOnChange, TypeSetState } from '../../utils/interface/CommonInterface';
import User from './../../utils/models/User';
import Input from './form/Input';
import MyModal from './modal/MyModal';


interface iDemoModal {
    show: boolean,
    setShow: TypeSetState<boolean>,
    user: User,
    setUser: TypeSetState<User>
}

//example: for user
const DemoModal: React.FC<iDemoModal> = ({ show, setShow, user, setUser }) => {

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext)

    const onChange = (e: TypeOnChange) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const myapp = new AppAction(appDispatch!)

        if (user.id === -1) {
            //insert new object in list
            myapp.START_LOADING()
            setShow(false)
            //const result = await new ListAction<Page>(pagelistDispatch!).addData('client/create-page/', page)
            //myapp.SET_RESPONSE(result)
            myapp.STOP_LOADING()
        } else {
            //update value
            myapp.START_LOADING()
            setShow(false)
            //const result = await new ListAction<Page>(pagelistDispatch!).updateData('admin/update/page', page, "id")
            //myapp.SET_RESPONSE(result)
            myapp.STOP_LOADING()
        }
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
                    name="name"
                    title="User Name"
                    value={user.name}
                    onChange={onChange}
                    disable={app?.loading!}
                    type="text"
                />

                <Input
                    name="email"
                    title="Email"
                    value={user.email}
                    onChange={onChange}
                    disable={app?.loading!}
                    type="text"
                />

            </MyModal>
        </div>
    )
}

export default DemoModal
