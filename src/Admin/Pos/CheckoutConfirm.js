import React from 'react'

export default function CheckoutConfirm({ orderDetails }) {
    let today = new Date()

    let day = today.toLocaleDateString();

    let totalMRP = 0;
    return (
        <div className="tab-pane fade" id="v-pills-confir" role="tabpanel" aria-labelledby="v-pills-confir-tab">
            <div className="card shadow-none border mb-0">
                <div className="card-body">
                    {/* TODO: CHANGE STORE NAME */}
                    <h4 className="text-center" >STORE NAME</h4>
                    <h4 className="card-title mb-4">Order Summary</h4>
                    <p><b>Date : </b> {day}</p>
                    <p><b>Customer ID : </b> {orderDetails.user ? orderDetails.user._id : ""}</p>
                    {/* TODO: ADD STAFF ID AS WELL */}

                    <div className="table-responsive">
                        <table className="table table-centered mb-0 table-nowrap min-width-40-rem">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">MRP</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderDetails.products && orderDetails.products.map(product => {

                                        let index = orderDetails.products.indexOf(product);
                                        totalMRP += (product.mrp * product.quantity);

                                        return (
                                            <tr key={index}>
                                                <th scope="row confirm-table-inline">
                                                    <p className="text-muted mb-0 text-truncate text-dark">{product.name}</p>
                                                </th>
                                                <td>
                                                    <p className="text-muted mb-0"><i className="bx bx-rupee"></i> {product.mrp} </p>
                                                </td>
                                                <td>

                                                    <p className="text-muted mb-0"><i className="bx bx-rupee"></i> {product.price} </p>
                                                </td>
                                                <td>{product.quantity}</td>
                                                <td><i className="bx bx-rupee"></i> {product.total}</td>
                                            </tr>
                                        )
                                    })
                                }

                                <tr>
                                    <td colSpan="4" className="border-0">
                                        <h6 className="m-0 text-right font-size-14">Sub Total :</h6>
                                    </td>
                                    <td className="border-0">
                                        <i className="bx bx-rupee"></i> {orderDetails.total}
                                    </td>
                                </tr>


                                <tr>
                                    <td colSpan="4" >
                                        <h6 className="m-0 text-right font-size-14">You Saved Rs. :</h6>
                                    </td>
                                    <td>
                                        <i className="bx bx-rupee"></i> {totalMRP - orderDetails.grandtotal}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan="4" className="border-0">
                                        <h6 className="m-0 text-right font-size-14">Total:</h6>
                                    </td>
                                    <td className="border-0">
                                        <i className="bx bx-rupee"></i> {orderDetails.grandtotal}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="border-0 pt-0 pb-0">
                                        <h6 className="m-0 text-right font-size-14">Recieved:</h6>
                                    </td>
                                    <td className="border-0 pt-0 pb-0">
                                        <i className="bx bx-rupee"></i> {orderDetails.recieved} ({orderDetails.paymentmode})
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" >
                                        <h6 className="m-0 text-right font-size-14">{parseInt(orderDetails.payback) === 0 ? "Pending" : "Return"}:</h6>
                                    </td>
                                    <td>
                                        <i className="bx bx-rupee"></i> {parseInt(orderDetails.payback) === 0 ? orderDetails.pending : orderDetails.payback}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}
