import React, { useState, useEffect } from 'react'
import Wrapper from "../Wrapper"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import Breadcrumb from "../Components/Breadcrumb"
import CheckoutCustomer from './CheckoutCustomer'
import CheckoutPayment from './CheckoutPayment'
import CheckoutConfirm from './CheckoutConfirm'
import { Link } from "react-router-dom"
import { getAllUsers, addNewUser } from "../../Redux/Actions/UserActions"
import { placeOrder } from "../../Redux/Actions/OrderActions"

function Checkout(props) {

    const [order, setOrder] = useState({})

    const history = useHistory()

    // GO BACK TO CART PAGE IF CART IS EMPTY
    useEffect(
        () => {
            if (!props.cart.grandtotal) {
                history.push("/admin/pos/cart")
            }
        }
    )

    useEffect(
        () => {
            if (props.users.length === 0) {
                props.getAllUsers();
            }
        }, []
    )
    useEffect(
        () => {
            setOrder({
                ...props.cart
            })
        }, []
    )

    const setUser = (userDetails) => {
        setOrder({
            ...order,
            user: userDetails
        })
    }

    const setPaymentDetails = (paymentDetails) => {
        setOrder({
            ...order,
            paymentmode: paymentDetails.paymentmode,
            recieved: paymentDetails.recieved,
            pending: paymentDetails.pending,
            payback: paymentDetails.payback,
            paymentstatus: paymentDetails.paymentstatus,
            orderstatus: "Completed"
        })
    }

    const quickAddUser = (data) => {
        props.quickAdd(data)
        document.querySelector("#v-pills-payment-tab").click()
    }

    const confirmOrder = (e) => {
        e.preventDefault();
        props.placeOrder(order);
        history.push("/admin/order/all")
    }


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="POS" parent="POS" subtitle="Checkout" />


                    <div className="checkout-tabs">
                        <div className="row">
                            <div className="col-xl-2 col-sm-3">
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a className="nav-link active" id="v-pills-shipping-tab" data-toggle="pill" href="#v-pills-shipping" role="tab" aria-controls="v-pills-shipping" aria-selected="true">
                                        <i className="bx bxs-user d-block check-nav-icon mt-4 mb-2"></i>
                                        <p className="font-weight-bold mb-4">Customer Info</p>
                                    </a>
                                    <a className="nav-link" id="v-pills-payment-tab" data-toggle="pill" href="#v-pills-payment" role="tab" aria-controls="v-pills-payment" aria-selected="false">
                                        <i className="bx bx-rupee d-block check-nav-icon mt-4 mb-2"></i>
                                        <p className="font-weight-bold mb-4">Payment Info</p>
                                    </a>
                                    <a className="nav-link" id="v-pills-confir-tab" data-toggle="pill" href="#v-pills-confir" role="tab" aria-controls="v-pills-confir" aria-selected="false">
                                        <i className="bx bx-check-double d-block check-nav-icon mt-4 mb-2"></i>
                                        <p className="font-weight-bold mb-4">Confirmation</p>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-10 col-sm-9">
                                <div className="card border-0">
                                    <div className="card-body">
                                        <div className="tab-content" id="v-pills-tabContent">

                                            <CheckoutCustomer users={props.users} setUser={setUser} quickAddUser={quickAddUser} />

                                            <CheckoutPayment grandtotal={props.cart.grandtotal} setPaymentDetails={setPaymentDetails} />

                                            <CheckoutConfirm orderDetails={order} />

                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-sm-6">
                                        <Link to="/admin/pos/cart" className="btn text-muted d-none d-sm-inline-block btn-link">
                                            <i className="mdi mdi-arrow-left mr-1"></i> Back to Shopping Cart </Link>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="text-sm-right">
                                            {/* PRINT INVOICE ON CLICK */}
                                            <button className="btn btn-success" onClick={confirmOrder}>
                                                <i className="bx bx-printer mr-1"></i> Confirm Order </button>
                                        </div>
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
        cart: state.orders.newCart,
        users: state.users.allUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        quickAdd: (data) => dispatch(addNewUser(data)),
        placeOrder: (newOrder) => dispatch(placeOrder(newOrder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(Checkout))