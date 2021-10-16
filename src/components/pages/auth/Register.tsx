import React, { useContext, useState } from "react"
import AppAction from "../../../utils/context/actions/AppAction"
import { DispatchContext } from "../../../utils/context/MainContext"
import AxiosHelper from './../../../utils/AxiosHelper'
import useLocalStorage from './../../../utils/hooks/useLocalStorage';
import Define from './../../../utils/Define';
import { Link, Redirect } from "react-router-dom";
import URL from './../../../utils/URL';
import Input from "../../layouts/form/Input";
import { StateContext } from './../../../utils/context/MainContext';
import AlertLoading from "../../layouts/AlertLoading";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TypeOnChange } from "../../../utils/interface/CommonInterface";
import Helper from "../../../utils/Helper";
import { iMyMember } from './../../../utils/models/MyMember';
import ColorType from './../../../utils/interface/ColorType';


const Register = () => {

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext)

    //local state
    const initvalue = {
        name: "",
        email: "",
        password: "",
        conf_password: "",
    }
    const [user, setUser] = useState(initvalue)
    const [cUser, setcUser] = useLocalStorage<iMyMember>(Define.AUTH_KEY)


    //local method
    const onSubmit = async () => {

        const app = new AppAction(appDispatch)
        //Helper 
        if (!Helper.validateField([user.name, user.email, user.password, user.conf_password])) {
            app.SET_MESSAGE("Enter All Field!")
            return
        }
        //ck password & confirm pass is same or not
        if (user.password.length <= 6) {
            app.SET_MESSAGE("Password length should be more than 6 character.")
            return
        }
        if (user.password !== user.conf_password) {
            app.SET_MESSAGE("Password and Confirm Password Should be same.")
            return
        }
        //start loding..
        app.START_LOADING()
        //signup user
        try {
            const result = await AxiosHelper.addData<iMyMember>('auth/signup', user)
            console.log(result)
            if (result.error === false) {
                setcUser(result.response!!)
                //it will update state also update localstorage
            } else {
                app.SET_MESSAGE(result.message)
            }
            app.STOP_LOADING()

        } catch (e: any) {

            app.SET_MESSAGE("Failed: " + e.message)
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
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="d-flex justify-content-center">
                    <Col md={5} className="d-flex align-items-center">
                        <img className="mb-3 w-100 rounded hide-mobile" src='/img/auth/login.png' alt="" />
                    </Col>
                    <Col md={5} className="d-flex align-items-center">

                        <div className="w-100">
                            <div className="w-100 text-center">
                                {/* <img className="mb-3" style={{ width: "20%" }} src='/img/logo/logo.png' alt="" /> */}
                                <h2 className="text-primary"><b>Welcome </b></h2>
                                <h4>Login Now</h4>
                            </div>

                            <Input name="name" type="text" title="Name" value={user.name} onChange={onChange} disabled={app.loading} />

                            <Input name="email" type="email" title="Email" value={user.email} onChange={onChange} disabled={app.loading} />

                            <Input name="password" type="password" title="Password" value={user.password} onChange={onChange} disabled={app.loading} />

                            <Input name="conf_password" type="password" title="Confrim Password" value={user.conf_password} onChange={onChange} disabled={app.loading} />

                            <AlertLoading loadColor={ColorType.PRIMARY} />

                            <Button onClick={onSubmit} variant="primary" type="submit" className="btn btn-dark btn-lg btn-block " disabled={app.loading} >Register now</Button>

                            <p className="mt-2 forgot-password text-right">
                                Already have an accout? <Link to={URL.LOGIN}>Login Now</Link>
                            </p>
                        </div>
                    </Col>

                </Row>
            </Container>


        </>
    )
}

export default Register

