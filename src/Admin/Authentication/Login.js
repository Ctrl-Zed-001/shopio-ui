import React, { useState } from 'react'
import Axios from "axios"
import { apiurl } from "../../Globals"
import { useHistory } from "react-router-dom"

const Login = () => {

    const history = useHistory()

    const [show, setShow] = useState({
        type: true,
        hide: true
    })

    const [field, setField] = useState({});

    const showHidePassword = (e) => {
        setShow({
            type: !show.type,
            hide: !show.hide
        })
    }

    const handleChange = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(`${apiurl}/Auth/login`, field)
            .then(res => {
                history.push("/admin/dashboard")
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }

    return (
        <div className="account-pages login-bg">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <div className="card">


                            <div className="card-header pt-4 pb-4 text-center bg-dark">
                                <a href="index.html">
                                    <span><img src="/logo-light.png" alt="" height="30" /></span>
                                </a>
                            </div>

                            <div className="card-body p-4">

                                <div className="text-center w-75 m-auto">
                                    <h4 className="text-dark-50 text-center mt-0 font-weight-bold">Sign In</h4>
                                    <p className="text-muted mb-4">Enter your User Id and password to access admin panel.</p>
                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="form-group mb-3">
                                        <label htmlFor="userid" className="form-label">User Name</label>
                                        <input className="form-control" type="text" id="userid" required="" placeholder="Enter your User Name" name="username" onChange={handleChange} />
                                    </div>

                                    <div className="form-group mb-3">

                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className="input-group input-group-merge">
                                            <input type={show.type ? "password" : "text"} id="password" className="form-control" placeholder="Enter your password" name="password" onChange={handleChange} />
                                            <div className="input-group-append" data-password="false">
                                                <div className="input-group-text p-2" onClick={showHidePassword}>
                                                    <i className={`bx bx-${show.hide ? "show" : "hide"}`}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="form-group mb-0 text-center">
                                        <button className="btn btn-custom" type="submit"> Log In </button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login