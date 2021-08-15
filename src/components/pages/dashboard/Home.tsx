import React, { useContext } from 'react'
import Main from '../../layouts/dashboard/Main'
import ProtectedPage from '../../layouts/ProtectedPage';
import { StateContext } from './../../../utils/context/MainContext';


const Home = () => {


    return (
        <ProtectedPage>
            <Main title="Home Page">
                Home....
            </Main>
        </ProtectedPage>
    )
}

export default Home
