import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { apiurl } from "../../Globals"
import { useHistory } from "react-router-dom"

export default function Signup() {

    const [field, setField] = useState({})

    const history = useHistory()

    const handleChange = (e) => {
        setField(
            {
                ...field,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(`${apiurl}/Auth/create`, field)
            .then(res => {
                history.push("/admin")
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(
        () => {
            // CHECK IF ADMIN ALREADY PRESENT IN DB, IF YES THEN REDIRECT TO LOGIN
        }, []
    )

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-4 bg-white full-height">
                    <div className="align-items-center d-flex h-100">
                        <div className="card-body">


                            <div className="auth-brand text-center text-lg-left">
                                <a href="index.html" className="logo-light">
                                    <span><img src="/logo-dark.png" alt="" height="28" /></span>
                                </a>
                            </div>


                            <h6 className="mt-4">Sign Up For Shop.IO</h6>
                            <p className="text-muted mb-4">Enter your details below to create an account.</p>

                            <div id="signUpCarousel" className="carousel slide" data-ride="carousel" data-interval="false">
                                <form onSubmit={handleSubmit}>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">

                                            <div className="form-group mb-3">
                                                <label className="form-label" htmlFor="username">User Name</label>
                                                <input className="form-control" type="text" name="username" id="username" placeholder="Enter a username" required onChange={handleChange} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-label" htmlFor="emailaddress">Email address</label>
                                                <input className="form-control" type="email" name="email" id="emailaddress" required onChange={handleChange} placeholder="Enter your email" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input className="form-control" type="password" name="password" required onChange={handleChange} id="password" placeholder="Enter your password" />
                                            </div>

                                            <div className="form-group mb-0 text-center">
                                                <a href="#signUpCarousel" data-slide="next" className="btn btn-custom btn-block" ><i className="bx bx-store"></i> Enter Store Details </a>
                                            </div>


                                        </div>
                                        <div className="carousel-item">
                                            <div className="form-group mb-3">
                                                <label className="form-label" htmlFor="storename">Store Name</label>
                                                <input className="form-control" type="text" name="storename" id="storename" placeholder="Enter store name" required onChange={handleChange} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-label" htmlFor="storenumber">Phone Number</label>
                                                <input className="form-control" name="phone" type="number" id="storenumber" required onChange={handleChange} placeholder="Enter store number" />
                                            </div>
                                            <h6>Address</h6>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label" htmlFor="line1">Line 1</label>
                                                        <input className="form-control" type="text" required onChange={handleChange} name="line1" id="line1" placeholder="shop no, area, building etc..." />
                                                    </div>

                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label" htmlFor="city">City</label>
                                                        <input className="form-control" type="text" required onChange={handleChange} name="city" id="city" placeholder="Enter city" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label" htmlFor="pincode">Pincode</label>
                                                        <input className="form-control" type="number" required onChange={handleChange} name="pincode" id="pincode" placeholder="Enter pincode" />
                                                    </div>

                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label" htmlFor="state">State</label>
                                                        <input className="form-control" type="text" required onChange={handleChange} name="state" id="state" placeholder="Enter state" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group mb-0 text-center">
                                                <button className="btn btn-custom btn-block" type="submit"><i className="mdi mdi-account-circle"></i> LETS GO! </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-8 bg-pos">

                </div>

            </div>
        </div>
    )
}
