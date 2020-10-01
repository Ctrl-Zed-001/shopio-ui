import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="vertical-menu">

            <div data-simplebar className="h-100">


                <div id="sidebar-menu">

                    <ul className="list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>

                        <li>
                            <Link to="/admin/dashboard" className="waves-effect">
                                <i className="bx bxs-home-circle"></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/pos/cart" className="waves-effect">
                                <i className='bx bxs-dollar-circle'></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>POS</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/order/all" className="waves-effect">
                                <i className='bx bxs-receipt'></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user/all" className="waves-effect">
                                <i className='bx bxs-user-circle'></i>
                                <span className="badge badge-pill badge-info float-right"></span>
                                <span>All Customers</span>
                            </Link>
                        </li>
                        <li className="menu-title">Products</li>
                        <li>
                            <Link to="/admin/product/all" className="waves-effect">
                                <i className="bx bx-package"></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>All Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/product/add" className="waves-effect">
                                <i className='bx bx-layer-plus'></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>Add Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/product/categories" className="waves-effect">
                                <i className="bx bx-list-ul"></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>Categories</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/product/brands" className="waves-effect">
                                <i className="bx bx-badge-check"></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>Brands</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/inventory" className="waves-effect">
                                <i className='bx bxs-layer'></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>Inventory</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/restock" className="waves-effect">
                                <i className='bx bx-download'></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>Restocks</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/vendors" className="waves-effect">
                                <i className='bx bxs-factory'></i><span
                                    className="badge badge-pill badge-info float-right"></span>
                                <span>Vendors</span>
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>
        </div >
    )
}
