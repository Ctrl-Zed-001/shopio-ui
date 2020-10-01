import React, { useState, useEffect } from 'react'
import Breadcrumb from "../Components/Breadcrumb"
import Wrapper from '../Wrapper'
import { connect } from "react-redux"
import { getAllUsers, addNewUser } from "../../Redux/Actions/UserActions"
import AddUserModal from "./AddUserModal"
import { Link } from "react-router-dom"
import Pagination from "../Components/Pagination"

const Customers = (props) => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(
        () => {
            let current_page_users = props.allUsers.slice(page, page + 15);
            setUsers(current_page_users)
        }, [props.allUsers, page]
    )

    const searchUser = (e) => {
        if (e.target.value !== "") {
            let filter_users = props.allUsers.filter(user => {
                return user.phone.toString().includes(e.target.value)
            })
            setUsers(filter_users)
        }
    }

    const addNewUser = (data) => {
        props.addNewUser(data)
    }

    const prevPage = () => {
        setPage(page - 15)
    }

    const nextPage = () => {
        setPage(page + 15)
    }

    return (
        <div className="main-content">
            <AddUserModal addUser={addNewUser} />
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="All Users" parent="Users" subtitle="All" />

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-sm-4">
                                            <div className="search-box mr-2 mb-2 d-inline-block">
                                                <div className="position-relative">
                                                    <input onChange={searchUser} type="text" className="form-control" placeholder="Search..." />
                                                    <i className="bx bx-search-alt search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="text-sm-right">
                                                <button data-toggle="modal" data-target="#addCustomerModal" type="button" className="rounded-pill btn-md btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i className="bx bx-plus mr-1"></i> New Customers</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-centered table-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    users.map(user => {
                                                        let index = users.indexOf(user)
                                                        return (
                                                            <tr key={index}>
                                                                <td>C00{index + 1}</td>
                                                                <td><Link to={`/admin/user/${user._id}`}>{user.name}</Link></td>
                                                                <td>{user.email}</td>
                                                                <td>{user.phone}</td>
                                                                <td>{user.address && user.address.line1} {user.address && user.address.city} {user.address && user.address.pincode}</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <a className="user-dd dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="false">
                                                                            <i className='bx bx-dots-horizontal-rounded font-size-18 text-dark'></i>
                                                                        </a>
                                                                        <ul className="dropdown-menu dropdown-menu-right">
                                                                            <li><a className="dropdown-item"><i className="bx bxs-pencil font-size-16 text-success mr-1"></i> Edit</a></li>
                                                                            <li><a className="dropdown-item"><i className="bx bxs-trash-alt font-size-16 text-danger mr-1"></i> Delete</a></li>
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

                    <Pagination prevPage={prevPage} nextPage={nextPage} page={page} allData={props.allUsers} />

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.users.allUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: dispatch(getAllUsers()),
        addNewUser: (data) => dispatch(addNewUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(Customers))