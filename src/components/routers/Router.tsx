import { BrowserRouter, Switch, Route } from 'react-router-dom'
//pages
import NotFound from './../pages/_404';
import Home from './../pages/dashboard/Home';
import URL from './../../utils/URL';
import Login from './../pages/auth/Login';
import Register from './../pages/auth/Register';


export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={URL.HOME} component={Home} ></Route>
                <Route path={URL.LOGIN} component={Login}></Route>
                <Route path={URL.REGISTER} component={Register}></Route>


                <Route component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )
}