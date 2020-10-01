import React, { useState } from 'react'
import QuickAddUser from './QuickAddUser';


export default function CheckoutCustomer(props) {

    const [field, setField] = useState();

    const [selectedUser, setSelectedUser] = useState({
        status: "",
        address: {}
    })

    const handleChange = (e) => {
        setField(e.target.value)
    }

    const findUser = (e) => {
        e.preventDefault()
        let users = props.users;
        let userByPhone = users.filter(user => {
            return user.phone === parseInt(field)
        })
        let userByEmail = users.filter(user => {
            return user.email === field
        })
        if (userByPhone.length > 0) {
            setSelectedUser(userByPhone[0])
            props.setUser(userByPhone[0])
        } else if (userByEmail.length > 0) {
            setSelectedUser(userByEmail[0])
            props.setUser(userByEmail[0])
        } else {
            setSelectedUser({
                status: "No users found"
            })
        }

    }

    const quickAddUser = (data) => {
        props.quickAddUser(data)
    }

    return (
        <div className="tab-pane fade show active" id="v-pills-shipping" role="tabpanel" aria-labelledby="v-pills-shipping-tab">
            <QuickAddUser quickAdd={quickAddUser} />
            <div>
                <div className="row">
                    <div className="col">
                        <h4 className="card-title">Customer information</h4>
                        <p className="card-title-desc">Select Existing customer or add new</p>
                    </div>

                </div>

                <div className="row">

                    <div className="col-md-6">
                        <div className="mt-3 mb-3">
                            <label className="form-label">Select Customer</label>
                            <form onSubmit={findUser}>
                                <div className="input-group">

                                    <input className="form-control" type="text" name="selectcustomer" placeholder="Enter phone number or email" onChange={handleChange} />
                                    <button type="submit" className="btn btn-custom" type="button" id="button-addon2" onClick={findUser}>Find</button>

                                </div>
                            </form>

                        </div>
                    </div>

                    <div className="col-md-2 offset-md-2 text-center col-xs-12">
                        <h6 className="mt-5"> - OR -</h6>
                    </div>

                    <div className="col-md-2 text-center col-xs-12 pt-3">
                        <button data-toggle="modal" data-target="#quickAdd" className="btn btn-custom btn-sm mt-4">Quick Add</button>
                    </div>

                </div>

                {
                    selectedUser.phone ?
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Name :</b></td>
                                    <td>{selectedUser.name}</td>
                                </tr>
                                <tr>
                                    <td><b>Email :</b></td>
                                    <td>{selectedUser.email}</td>
                                </tr>
                                <tr>
                                    <td><b>Phone :</b></td>
                                    <td>{selectedUser.phone}</td>
                                </tr>
                                <tr>
                                    <td><b>Address :</b></td>
                                    <td>{selectedUser.address.line1}, {selectedUser.address.city}, {selectedUser.address.state}, {selectedUser.address.pincode}</td>
                                </tr>
                            </tbody>
                        </table> :
                        <p className="text-danger font-size-16 mt-4 ml-2">{selectedUser.status}</p>
                }

            </div>
        </div>
    )
}

