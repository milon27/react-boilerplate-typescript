import React, { useContext } from 'react'
import Main from '../../layouts/dashboard/Main'
import { StateContext } from './../../../utils/context/MainContext';


const Home = () => {
    const { app } = useContext(StateContext)

    return (
        <Main title="Home Page">
            Home....
            {app?.loading === true ? "TRUE" : "FALSE"}
            {app?.response ? "have resopnse" : "no response"}
            {console.log(app)}
        </Main>
    )
}

export default Home
