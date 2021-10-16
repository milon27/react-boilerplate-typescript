import { Link, useHistory } from 'react-router-dom'
import URL from './../../utils/URL';
import useLocalStorage from './../../utils/hooks/useLocalStorage';
import Define from '../../utils/Define';
import AxiosHelper from './../../utils/AxiosHelper';
import { iMyMember } from './../../utils/models/MyMember';

interface iHeaderType {
    title: string
}

//todo : auth action / logout option

const Header = ({ title }: iHeaderType) => {
    const history = useHistory()

    const [user, setUser] = useLocalStorage<iMyMember>(Define.AUTH_KEY)

    const logout = async () => {
        //clear cookie
        await AxiosHelper.simpleGet('auth/logout')
        //clear localstate/storage
        setUser(null)
        history.push(URL.LOGIN)
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3"
                onClick={() => {
                    document.getElementById("page-top")?.classList.toggle("sidebar-toggled");
                    document.getElementById("accordionSidebar")?.classList.toggle("toggled");
                }}
            >
                <i className="fa fa-bars"></i>
            </button>

            <h5>{title}</h5>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">

                    <Link to="#" className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.mem_name}</span>
                        <i className="fas fa-user-circle text-primary  " style={{ fontSize: 23 }}></i>
                    </Link>

                    {/* <!-- Dropdown - User Information --> */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">

                        {/* <Link className="dropdown-item"
                            to={{ pathname: `tel:${CUser.getCurrentuser() && CUser.getCurrentuser().phone}` }}
                            target="_blank"
                        >
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Phone: {CUser.getCurrentuser() && CUser.getCurrentuser().phone}
                        </Link> 
                        <div className="dropdown-divider"></div>*/}
                        <Link className="dropdown-item" to={{ pathname: `mailto:${user?.mem_email}` }}
                            target="_top">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Email: {user?.mem_email}
                        </Link>
                        <div className="dropdown-divider"></div>

                        <div className="dropdown-item" onClick={logout} >
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </div>
                    </div>
                </li>

            </ul>

        </nav >
    )
}

export default Header
