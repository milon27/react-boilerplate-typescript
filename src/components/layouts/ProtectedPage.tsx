import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import URL from './../../utils/URL';
import useLocalStorage from './../../utils/hooks/useLocalStorage';
import Define from './../../utils/Define';
import User from '../../utils/models/User';


export default function ProtectedPage(props: { children: React.ReactChild }) {
    const [user, setUser] = useLocalStorage<User>(Define.AUTH_KEY)


    const [authv, setAuthV] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const ckLog = async () => {
            try {
                const ck = await axios.get('auth/is-loggedin')
                //give true or false
                if (!ck.data) {
                    //so clear the localStorage
                    setUser(null)
                    setAuthV(false)
                } else {
                    setAuthV(true)
                }
                setLoading(false)

            } catch (e) {
                //so clear the localStorage
                setUser(null)
                console.log(e.message);
                setAuthV(false)
                setLoading(false)
            }
        }
        ckLog()
    }, [loading])


    if (!loading && loading === false) {
        if (authv === true) {
            return (
                <>
                    {props.children}
                </>
            )
        } else {
            return <Redirect to={URL.LOGIN}></Redirect>
        }
    } else {
        return (<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="loader"></div>
        </div>)
    }
}