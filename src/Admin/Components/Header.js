import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { toggleSidenav } from "../../Redux/Actions/ThemeActions"
import { Link } from "react-router-dom"

const Header = (props) => {

    useEffect(
        () => {
            if (props.sidenav) {
                document.body.classList.add("sidebar-enable")
                document.body.classList.remove("vertical-collpsed")
            } else {
                document.body.classList.remove("sidebar-enable")
                document.body.classList.add("vertical-collpsed")
            }
        }, [props.sidenav]
    )

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    }

    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">

                    <div className="navbar-brand-box">
                        {/* <Link to="/admin/dashboard" className="logo logo-dark">
                            <span className="logo-sm">
                                <img src="/images/logo.svg" alt="" height="22" />
                            </span>
                            <span className="logo-lg">
                                <img src="/images/logo-dark.png" alt="" height="17" />
                            </span>
                        </Link> */}

                        <Link to="/admin/dashboard" className="logo logo-light">
                            <span className="logo-sm">
                                <img src="/logo-light.svg" alt="small logo" height="22" />
                            </span>
                            <span className="logo-lg">
                                <img src="/logo-light.png" alt="" height="19" />
                            </span>
                        </Link>
                    </div>

                    <button onClick={props.toggleSidenav} type="button" className="btn btn-sm px-3 font-size-20 header-item waves-effect" id="vertical-menu-btn">
                        <i className="bx bx-menu"></i>
                    </button>


                </div>

                <div className="d-flex">



                    <div className="dropdown d-none d-lg-inline-block ml-1">
                        <button type="button" className="btn header-item noti-icon waves-effect" onClick={toggleFullscreen}>
                            <i className="bx bx-fullscreen"></i>
                        </button>
                    </div>

                    <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="bx bx-bell"></i>
                            <span className="badge badge-danger badge-pill">3</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                            aria-labelledby="page-header-notifications-dropdown">
                            <div className="p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="m-0"> Notifications </h6>
                                    </div>

                                </div>
                            </div>
                            <div data-simplebar>

                            </div>

                        </div>
                    </div>

                    <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="rounded-circle header-profile-user" src="/avatar.jpg"
                                alt="Header Avatar" />
                            <span className="d-none d-xl-inline-block ml-1">Zaid</span>
                            <i className="bx bx-chevron-down d-none d-xl-inline-block"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">

                            <Link className="dropdown-item font-size-12 text-secondary" to="#"><i className="bx bx-user font-size-16 align-middle mr-1"></i> Profile</Link>
                            <Link className="dropdown-item font-size-12 text-secondary" to="#"><i className="bx bxs-store font-size-16 align-middle mr-1"></i> My Store</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item text-danger font-size-12" to="/admin"><i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i> Logout</Link>
                        </div>
                    </div>

                </div>

            </div>
        </header>
    )

}

const mapStateToProps = (state) => {
    return {
        sidenav: state.theme.sidenav
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSidenav: () => dispatch(toggleSidenav())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)