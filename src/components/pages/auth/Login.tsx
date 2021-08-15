import React, { useContext, useState } from "react"
import AppAction from "../../../utils/context/actions/AppAction"
import { DispatchContext } from "../../../utils/context/MainContext"
import { ColorType } from "../../../utils/models/Response"
import Response from './../../../utils/models/Response';
import AxiosHelper from './../../../utils/AxiosHelper';
import User from "../../../utils/models/User";
import useLocalStorage from './../../../utils/hooks/useLocalStorage';
import Define from './../../../utils/Define';
import { Link, Redirect } from "react-router-dom";
import URL from './../../../utils/URL';
import Input from "../../layouts/form/Input";
import { StateContext } from './../../../utils/context/MainContext';
import AlertLoading from "../../layouts/AlertLoading";
import { Button } from "react-bootstrap";
import { TypeClickEvent, TypeOnChange } from "../../../utils/interface/CommonInterface";

const Login = () => {

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext)

    //local state
    const initvalue = {
        email: "",
        password: ""
    }
    const [user, setUser] = useState(initvalue)
    const [cUser, setcUser] = useLocalStorage<User>(Define.AUTH_KEY)


    //local method
    const onSubmit = async (e: TypeClickEvent) => {
        e.preventDefault()
        const app = new AppAction(appDispatch!)
        //ck password & confirm pass is same or not
        if (user.password.length <= 6) {
            app.SET_RESPONSE(Response(false, "Password length should be more than 6 character.", ColorType.DANGER))
            return
        }
        //start loding..
        app.START_LOADING()
        //signup user
        try {
            const response = await AxiosHelper.addData<User>('auth/login', user)
            console.log(response)
            if (response.obj) {
                setcUser(response.obj)
                //it will update state also update localstorage
            }
            app.STOP_LOADING()

        } catch (e) {
            app.SET_RESPONSE(Response(false, "Sign In failed." + e.message, ColorType.DANGER))
            app.START_LOADING()
        }
    }


    const onChange = (e: TypeOnChange) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // check alrady logged in or not
    //though we will update the state so it will re-run
    if (cUser?.id) {
        return <Redirect to={URL.HOME}></Redirect>
    }

    return (
        <>
            <div className="auth">
                <div className="inner">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center mb-2">
                            {/* <img src={logo} width={50} alt="" /> */}
                        </div>
                        <div className="d-flex justify-content-center">
                            <h3>Sign In as a Client</h3>
                        </div>
                    </div>

                    <form onSubmit={onSubmit}>
                        <Input name="email" type="email" title="Email" value={user.email} onChange={onChange} disable={app?.loading!} />

                        <Input name="password" type="password" title="Password" value={user.password} onChange={onChange} disable={app?.loading!} />

                        <AlertLoading loadColor={ColorType.INFO} />

                        <Button variant="primary" type="submit" className="btn btn-dark btn-lg btn-block " >Sign In</Button>

                        <p className="forgot-password text-right">
                            Not Yet registered, <Link to={URL.REGISTER}>Register Now</Link>
                        </p>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Login
