import React, { useState, useEffect } from 'react'
import Wrapper from "../Wrapper"
import { Link, useParams } from "react-router-dom"
import { connect } from "react-redux"
import Axios from 'axios'
import { apiurl } from '../../Globals'
import Breadcrumb from "../Components/Breadcrumb"

function UserDetails() {

    const [selectedUser, setSelectedUser] = useState({
        address: "",
        orders: []
    })

    const [orderList, setOrderList] = useState([])

    const { id } = useParams()

    let joindate = new Date(selectedUser.joindate);

    useEffect(
        () => {
            Axios.get(`${apiurl}/users/${id}`)
                .then(res => {
                    setSelectedUser(res.data)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }, []
    )

    useEffect(
        () => {
            Axios.get(`${apiurl}/order/byuser/${id}`)
                .then(res => {
                    setOrderList([
                        ...res.data
                    ])
                })
                .catch(err => {
                    console.log(err.response)
                })
        }, []
    )

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="User Detail" parent="Users" subtitle="Detail" />

                    <div className="card border-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <img alt="user pic" className="img-fluid" src={selectedUser.profileurl ? selectedUser.profileurl : "https://www.teachersvent.com/templates/default/images/default-avatar.png"} />
                                </div>
                                <div className="col-9">
                                    <h4 className="mb-3 mt-2">{selectedUser.name}</h4>
                                    <p>Email : <b>{selectedUser.email}</b></p>
                                    <p>Contact no. : <b>{selectedUser.phone}</b></p>
                                    <p>Address : <b>{selectedUser.address.line1}, {selectedUser.address.city}, {selectedUser.address.pincode}, {selectedUser.address.state}, {selectedUser.address.Country}</b></p>
                                    <p>Customer Since : <b>{joindate.toDateString()}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col">
                            <h6>Orders</h6>
                        </div>
                    </div>

                    <div className="card border-0">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Payment Status</th>
                                        <th>Products</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderList.map(order => {
                                            let date = new Date(order.date)
                                            return (
                                                <tr key={order._id}>
                                                    <td><Link to={`/admin/order/${order._id}`}>{order._id}</Link></td>
                                                    <td>{date.toDateString()}</td>
                                                    <td>{order.grandtotal}</td>
                                                    <td>
                                                        <span className={`badge badge-pill badge-${order.paymentstatus === "Completed" ? "success" : "warning"}-lighten`}>{order.paymentstatus}</span>
                                                    </td>
                                                    <td>{order.products.length}</td>
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
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users.allUsers
    }
}

export default connect(mapStateToProps)(Wrapper(UserDetails))