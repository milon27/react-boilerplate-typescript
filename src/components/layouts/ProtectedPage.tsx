import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import URL from './../../utils/URL';
import useLocalStorage from './../../utils/hooks/useLocalStorage';
import Define from './../../utils/Define';
import { iMyMember } from './../../utils/models/MyMember';
import { Spinner } from 'react-bootstrap';


interface iProtectedPage {
    children: React.ReactNode
}
export default function ProtectedPage({ children }: iProtectedPage) {
    const [user, setUser] = useLocalStorage<iMyMember>(Define.AUTH_KEY)
    //console.log(user)


    const [authv, setAuthV] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let run = true

        const ckLog = async () => {
            try {
                const ck = await axios.get('auth/is-loggedin')
                //give true or false
                if (run) {
                    if (!ck.data) {
                        //so clear the localStorage
                        setUser(null)
                        setAuthV(false)
                    } else {
                        //cookie available,ck local storage
                        if (user?.id) {
                            setAuthV(true)
                        } else {
                            //local data not available
                            setUser(null)
                            setAuthV(false)
                        }
                    }
                    setLoading(false)
                }
            } catch (e: any) {
                //so clear the localStorage
                setUser(null)
                console.log(e.message);
                setAuthV(false)
                setLoading(false)
            }
        }

        if (run) {
            console.log("inside run...")
            ckLog()
        }

        return () => {
            console.log("unmounted...")
            run = false
        }
    }, [loading])


    if (!loading && loading === false) {
        if (authv === true) {
            return (
                <>
                    {children}
                </>
            )
        } else {
            return <Redirect to={URL.LOGIN}></Redirect>
        }
    } else {
        return (<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Spinner animation="border" variant="primary" />
        </div>)
    }
}