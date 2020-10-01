import React, { useState } from 'react'
import Wrapper from "../Wrapper"
import Breadcrumb from "../Components/Breadcrumb"
import AddVendorModal from './AddVendorModal'
import { connect } from "react-redux"
import { addNewVendor, getAllVendors } from "../../Redux/Actions/VendorActions"

function Vendors(props) {

    const [form, setForm] = useState({})

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNewVendor(form)
    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="All Vendors" parent="Vendors" subtitle="All" />

                    <AddVendorModal handleSubmit={handleSubmit} handleChange={handleChange} />

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-sm-4">
                                            <div className="search-box mr-2 mb-2 d-inline-block">
                                                <div className="position-relative">
                                                    <input type="text" className="form-control" placeholder="Search..." />
                                                    <i className="bx bx-search-alt search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="text-sm-right">
                                                <button type="button" data-toggle="modal" data-target="#addVendorModal" className="rounded-pill btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i className="bx bx-plus mr-1"></i> New Vendor</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-centered table-nowrap min-width-50-rem">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Vendor</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    props.vendors && props.vendors.map(vendor => {
                                                        let index = props.vendors.indexOf(vendor);
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{vendor.name}</td>
                                                                <td>{vendor.email}</td>
                                                                <td>{vendor.phone}</td>
                                                                <td>{`${vendor.address.line1}, ${vendor.address.city}, ${vendor.address.zipcode}, ${vendor.address.state}, ${vendor.address.country}`}</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <a href="#" className="user-dd dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="false">
                                                                            <i className='bx bx-dots-horizontal-rounded font-size-18 text-dark'></i>
                                                                        </a>
                                                                        <ul className="dropdown-menu dropdown-menu-right">
                                                                            <li><a href="#" className="dropdown-item"><i className="bx bxs-pencil font-size-16 text-dark mr-1"></i> Edit</a></li>
                                                                            <li><a href="#" className="dropdown-item"><i className="bx bxs-trash-alt font-size-16 text-danger mr-1"></i> Delete</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        vendors: state.vendors.allVendors
    }
}

const mapdispatchToProps = (dispatch) => {
    return {
        addNewVendor: (data) => dispatch(addNewVendor(data)),
        getAllVendors: dispatch(getAllVendors())
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(Wrapper(Vendors))