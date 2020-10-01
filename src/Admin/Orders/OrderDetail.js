import React, { useState, useEffect } from "react"
import Wrapper from "../Wrapper"
import Breadcrumb from "../Components/Breadcrumb"
import { useParams } from "react-router-dom"
import Axios from "axios"
import { apiurl } from "../../Globals"
import RecievePaymentModal from "./RecievePaymentModal"

const OrderDetail = (props) => {

    const [selectedOrder, setSelectedOrder] = useState({})

    let { orderid } = useParams();

    useEffect(
        () => {
            if (!selectedOrder._id) {
                Axios.get(`${apiurl}/order/${orderid}`)
                    .then(order => {
                        let total = 0;
                        order.data.products.map(product => {
                            total += (product.price * product.quantity)
                        })
                        // GET USER DETAILS WITH USER ID FROM ORDER
                        if (order.data.user) {
                            Axios.get(`${apiurl}/users/${order.data.user}`)
                                .then(res => {
                                    setSelectedOrder({
                                        ...order.data,
                                        total: total,
                                        user: res.data
                                    })
                                })
                                .catch(err => {
                                    console.log(err.response)
                                })
                        } else {
                            setSelectedOrder({
                                ...order.data,
                                total: total
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            }
        }, [selectedOrder]
    )

    const recievePayment = (amount) => {
        Axios.post(`${apiurl}/order/update_pending`, { orderid: selectedOrder._id, amount: amount })
            .then(res => {

                let paymentstatus = selectedOrder.paymentstatus
                if (selectedOrder.pending - amount === 0) {
                    paymentstatus = "Completed"
                }
                setSelectedOrder({
                    ...selectedOrder,
                    pending: selectedOrder.pending - parseInt(amount),
                    recieved: selectedOrder.recieved + parseInt(amount),
                    paymentstatus: paymentstatus
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div className="main-content">
            <RecievePaymentModal recievePayment={recievePayment} />
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="Order Detail" parent="Order" subtitle="Details" />
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h4 className="card-title mb-3">PRODUCTS</h4>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    selectedOrder.products && selectedOrder.products.map(product => {
                                                        return (
                                                            <tr key={product._id}>
                                                                <td>{product.name}</td>
                                                                <td>{product.quantity}</td>
                                                                <td><i className="bx bx-rupee"></i> {product.price}</td>
                                                                <td><i className="bx bx-rupee"></i> {product.price * product.quantity}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>


                            {
                                selectedOrder.user ?
                                    <div className="col mt-3">
                                        <div className="card border-0">
                                            <div className="card-body">
                                                <h4 className="card-title mb-3">CUSTOMER DETAIL</h4>
                                                <table className="table">
                                                    <thead className="bg-light">
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{selectedOrder.user && selectedOrder.user.name}</td>
                                                            <td>{selectedOrder.user && selectedOrder.user.email}</td>
                                                            <td>{selectedOrder.user && selectedOrder.user.phone}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> :
                                    <></>
                            }


                        </div>

                        <div className="col-md-4">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h4 className="card-title">PAYMENT SUMMARY</h4>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td><b>Total :</b></td>
                                                <td><i className="bx bx-rupee"></i> {selectedOrder.total}</td>
                                            </tr>
                                            <tr>
                                                <td><b>GST :</b></td>
                                                <td><i className="bx bx-rupee"></i> {selectedOrder.tax}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Discount :</b></td>
                                                <td><i className="bx bx-rupee"></i> {selectedOrder.discount}</td>
                                            </tr>
                                            <tr className="bg-dark text-light">
                                                <th><b>Grand Total :</b></th>
                                                <th><i className="bx bx-rupee"></i> {selectedOrder.grandtotal}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="card border-0 mt-3">
                                <div className="card-body">
                                    <h4 className="card-title mb-3">PAYMENT DETAIL</h4>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Status :</th>
                                                <td className={`text-${selectedOrder.paymentstatus === "Completed" ? "success" : "warning"} font-weight-bold`}>{selectedOrder.paymentstatus}</td>
                                            </tr>
                                            <tr>
                                                <th>Paid By :</th>
                                                <td>{selectedOrder.paymentmode}</td>
                                            </tr>
                                            <tr>
                                                <th>Recieved :</th>
                                                <td><i className="bx bx-rupee"></i> {selectedOrder.recieved}</td>
                                            </tr>
                                            <tr>
                                                <th>Pending :</th>
                                                <td className="border-bottom">
                                                    <i className="bx bx-rupee"></i> {selectedOrder.pending} &nbsp;
                                                    {
                                                        selectedOrder.pending !== 0 ?
                                                            <span data-toggle="modal" data-target="#recievePaymentModal" className="pointer font-size-10 text-info"><i className="bx bx-pencil"></i> Accept Payment</span> :
                                                            ""
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}



export default Wrapper(OrderDetail)