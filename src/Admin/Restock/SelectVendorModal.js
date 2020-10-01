import React from 'react'

export default function SelectVendorModal({ vendors, selectVendor }) {
    return (
        <div className="modal fade" id="selectVendorModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content  border-0">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Select Vendor</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="table-responsive">
                            <table className="table table-striped min-width-40-rem">
                                <thead>
                                    <tr>
                                        <th>Vendor Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        vendors.map(vendor => {
                                            let index = vendors.indexOf(vendor)
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <button data-dismiss="modal" aria-label="Close" className="btn btn-link pt-0 text-info pointer font-weight-bold" onClick={() => selectVendor(vendor._id)}>
                                                            {vendor.name}
                                                        </button>
                                                    </td>
                                                    <td>{vendor.email}</td>
                                                    <td>{vendor.phone}</td>
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
