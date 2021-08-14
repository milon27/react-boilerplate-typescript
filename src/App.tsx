import Router from "./components/routers/Router";
import axios from 'axios'
import Define from './utils/Define';

//setup axios
axios.defaults.baseURL = Define.API_BASE_URL
axios.defaults.withCredentials = true

export default function App() {

  return (
    <div>


      <Router />
    </div>
  )
}