import React, { useState, useEffect } from "react"
import Wrapper from "../Wrapper"
import { connect } from "react-redux"
import { getAllOrders } from "../../Redux/Actions/OrderActions"
import { Link } from "react-router-dom"
import Breadcrumb from "../Components/Breadcrumb"
import Pagination from "../Components/Pagination"

const OrderList = (props) => {

    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(0);

    useEffect(
        () => {
            let current_page_orders = [...props.allOrders]
            setOrders(current_page_orders.slice(page, page + 20))
        }, [props.allOrders, page]
    )

    const searchOrder = (e) => {
        let filteredOrders = props.allOrders.filter(order => {
            return order._id.toString().includes(e.target.value)
        })
        setOrders(filteredOrders)
    }

    const prevPage = () => {
        setPage(page - 15)
    }

    const nextPage = () => {
        setPage(page + 15)
    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="All Orders" parent="Orders" subtitle="All" />
                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-sm-4">
                                            <div className="search-box mr-2 mb-2 d-inline-block">
                                                <div className="position-relative">
                                                    <input onChange={searchOrder} type="text" className="form-control" placeholder="Search..." />
                                                    <i className="bx bx-search-alt search-icon"></i>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-centered table-nowrap min-width-50-rem">
                                            <thead>
                                                <tr>
                                                    <th>#OrderId</th>
                                                    <th>Date</th>
                                                    <th>Total</th>
                                                    <th>Payment Mode</th>
                                                    <th>Payment Status</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    orders.map(order => {
                                                        let date = new Date(order.date)
                                                        return (
                                                            <tr key={order._id}>
                                                                <td className="text-dark pointer ">
                                                                    <Link to={`/admin/order/${order._id}`}>
                                                                        #{order._id}
                                                                    </Link>
                                                                </td>
                                                                <td>{date.toDateString()}</td>
                                                                <td><i className="bx bx-rupee"></i> {order.grandtotal}</td>
                                                                <td>{order.paymentmode}</td>
                                                                <td><span className={`badge badge-pill badge-${order.paymentstatus === "Completed" ? "success" : "warning"}-lighten`}>{order.paymentstatus}</span></td>

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

                    <Pagination prevPage={prevPage} nextPage={nextPage} page={page} allData={props.allOrders} />


                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allOrders: state.orders.allOrders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllOrders: dispatch(getAllOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(OrderList))