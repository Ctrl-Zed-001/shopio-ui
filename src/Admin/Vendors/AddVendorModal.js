import React from 'react'

export default function AddVendorModal({ handleChange, handleSubmit }) {
    return (
        <div className="modal fade" id="addVendorModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-md">
                <div className="modal-content border-0">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Vendor</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name="name" className="form-control" id="name" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" id="email" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="number" name="phone" className="form-control" id="phone" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="line1" className="form-label">Address Line 1</label>
                                    <input type="text" name="line1" className="form-control" id="line1" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" name="city" className="form-control" id="city" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="zipcode" className="form-label">Zip Code</label>
                                    <input type="number" name="zipcode" className="form-control" id="zipcode" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" name="state" className="form-control" id="state" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" name="country" className="form-control" id="country" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Cancel</button>
                        <button onClick={handleSubmit} type="button" data-dismiss="modal" className="btn btn-custom btn-sm">Save Vendor</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
