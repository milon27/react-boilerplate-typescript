import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//pages
import URL from './../../utils/URL';
import Login from './../pages/auth/Login';
import Register from './../pages/auth/Register';
//lazy page
const NotFound = React.lazy(() => import('./../pages/_404'));
const Home = React.lazy(() => import('./../pages/dashboard/Home'));





export default function Router() {
    return (
        <Suspense fallback={<div>Screen Loading...</div>}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={URL.HOME} component={Home} ></Route>
                    <Route path={URL.LOGIN} component={Login}></Route>
                    <Route path={URL.REGISTER} component={Register}></Route>


                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}