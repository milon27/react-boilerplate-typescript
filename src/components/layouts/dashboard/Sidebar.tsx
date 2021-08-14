import { NavLink } from 'react-router-dom';
import URL from './../../../utils/URL';
//global.d.ts
import logo from '../../../assets/img/logo.svg'

// const logo = require('../../../assets/img/logo.svg')
//logo.default
export default function Sidebar() {
    return (
        <>
            {/* <!-- Sidebar --> */}
            <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    {/* rotate-n-15 */}
                    <div className="sidebar-brand-icon ">
                        <img src={logo} style={{ width: "100%", height: "50px" }} alt="" />
                    </div>
                    <div className="sidebar-brand-text mx-3"><sup>Admin</sup></div>
                </a>
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />


                <li className="nav-item ">
                    <NavLink exact activeClassName="active" className="nav-link " to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Options
                </div>
                <li className="nav-item ">
                    <NavLink exact activeClassName="active" className="nav-link" to={URL.HOME}>
                        <i className="fas fa-fw fa-award"></i>
                        <span>Home</span>
                    </NavLink>
                </li>
                <hr className="sidebar-divider d-none d-md-block" />



                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline mt-2">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => {
                        document.getElementById("accordionSidebar")?.classList.toggle("toggled");
                    }}></button>
                </div>
            </ul>
            {/* <!-- End of Sidebar --> */}
        </>
    )
}