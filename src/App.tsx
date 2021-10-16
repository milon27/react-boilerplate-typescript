import Router from "./components/routers/Router";
import axios from 'axios'
import Define from './utils/Define';
import MainContext from './utils/context/MainContext';

//setup axios
axios.defaults.baseURL = Define.API_BASE_URL
axios.defaults.withCredentials = true

export default function App() {


  return (
    <MainContext>
      <Router />
    </MainContext>
  )
}