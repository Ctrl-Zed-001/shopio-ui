import React, { useState } from 'react'

export default function AddCustomerModal(props) {

    const [fields, setFields] = useState({
        password: ""
    })

    const generatePassword = () => {
        let randomPassword = Math.random().toString(36).slice(-8);
        setFields({
            ...fields,
            password: randomPassword
        })
    }

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        props.addUser(fields)
    }

    return (
        <div className="modal fade" id="addCustomerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Customer</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="number" className="form-control" name="phone" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="text" className="form-control" name="password" disabled placeholder={fields.password} />
                                </div>
                            </div>
                            <div className="col">
                                <button className="btn btn-light btn-sm mt-4 btn-block pb-2 pt-2" onClick={generatePassword}>Generate Password</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">Address line 1</label>
                                    <input type="text" className="form-control" name="line1" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" name="city" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">State</label>
                                    <input type="text" className="form-control" name="state" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">PinCode</label>
                                    <input type="text" className="form-control" name="pincode" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">Country</label>
                                    <input type="text" className="form-control" name="country" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Cancel</button>
                        <button type="button" data-dismiss="modal" className="btn btn-custom btn-sm" onClick={handleSubmit}>Save user</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
