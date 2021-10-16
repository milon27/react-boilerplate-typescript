import { useContext, useState } from "react"
import AppAction from "../../../utils/context/actions/AppAction"
import { DispatchContext } from "../../../utils/context/MainContext"
import AxiosHelper from './../../../utils/AxiosHelper';
import useLocalStorage from './../../../utils/hooks/useLocalStorage';
import Define from './../../../utils/Define';
import { Link, Redirect } from "react-router-dom";
import URL from './../../../utils/URL';
import Input from "../../layouts/form/Input";
import { StateContext } from './../../../utils/context/MainContext';
import AlertLoading from "../../layouts/AlertLoading";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TypeOnChange } from "../../../utils/interface/CommonInterface";
import { iMyMember } from "../../../utils/models/MyMember";
import ColorType from './../../../utils/interface/ColorType';

const Login = () => {

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext)

    //local state
    const initvalue = {
        email: "",
        password: ""
    }
    const [user, setUser] = useState(initvalue)
    const [cUser, setcUser] = useLocalStorage<iMyMember>(Define.AUTH_KEY)


    //local method
    const onSubmit = async () => {
        const app = new AppAction(appDispatch)
        //ck password & confirm pass is same or not
        if (user.password.length <= 6) {
            app.SET_MESSAGE("Password length should be more than 6 character.")
            return
        }
        //start loding..
        app.START_LOADING()
        //login user
        try {
            const result = await AxiosHelper.addData<iMyMember>('auth/login', user)
            const { error, message, response } = result

            console.log(result, "message-", message)
            if (error === false) {
                setcUser(response!!)
                //it will update state also update localstorage
            } else {
                app.SET_MESSAGE(message)
            }
            app.STOP_LOADING()

        } catch (e: any) {
            console.log(e);
            app.SET_MESSAGE("Sign In failed.Error: " + e.message)
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
                    <Col md={5} className="d-flex align-items-center ">
                        <img className="mb-3 w-100 rounded hide-mobile" src='/img/auth/login.jpg' alt="" />
                    </Col>
                    <Col md={5} className="d-flex align-items-center">

                        <div className="w-100">
                            <div className="w-100 text-center">
                                <img className="mb-3" style={{ width: "20%" }} src='/img/logo/logo.png' alt="" />
                                <h2 className="text-primary"><b>Welcome To Mess Manager</b></h2>
                                <h4>Login Now</h4>
                            </div>

                            <Input name="email" type="email" title="Email" value={user.email} onChange={onChange} disabled={app.loading} />

                            <Input name="password" type="password" title="Password" value={user.password} onChange={onChange} disabled={app.loading} />

                            <AlertLoading loadColor={ColorType.PRIMARY} />

                            <Button variant="primary" type="submit" className="btn btn-dark btn-lg btn-block " onClick={onSubmit} disabled={app.loading}>Sign In</Button>

                            <p className="mt-2 forgot-password text-right">
                                Not Yet registered? <Link to={URL.REGISTER}>Register Now</Link>
                            </p>
                        </div>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default Login
