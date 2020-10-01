import React, { useState, useEffect } from "react"
import Wrapper from "../Wrapper"
import Breadcrumb from "../Components/Breadcrumb"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getAllRestocks } from "../../Redux/Actions/RestockActions"
import UpdateRestockModal from "./UpdateRestockModal"
import { updateRestockData } from "../../Redux/Actions/RestockActions"
import RestockHistoryModal from "./RestockHistoryModal"
import Pagination from "../Components/Pagination"

const Restock = (props) => {

    const [restocks, setRestocks] = useState([]);
    const [selectedRestock, setSelectedRestock] = useState([])
    const [page, setPage] = useState(0);


    useEffect(
        () => {
            let current_page_restocks = props.allRestocks
            setRestocks(current_page_restocks.slice(page, page + 20))
        }, [props.allRestocks, page]
    )

    const selectRestock = (index) => {
        setSelectedRestock(restocks[index])
    }

    const updateRestock = (id, data) => {
        let findrestock = props.allRestocks.filter(restock => restock._id === id)
        let restockindex = props.allRestocks.indexOf(findrestock[0]);
        props.updateRestockData(restockindex, id, data)
    }

    const nextPage = () => {
        setPage(page + 15)
    }

    const prevPage = () => {
        setPage(page - 15)
    }

    return (
        <div className="main-content">
            <UpdateRestockModal restockId={selectedRestock._id} products={selectedRestock.products} updateRestock={updateRestock} />
            <RestockHistoryModal products={selectedRestock.products} />
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="All Restock" parent="Restock" subtitle="All" />

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-sm-4">
                                            <div className="search-box mr-2 mb-2 d-inline-block">
                                                <div className="position-relative">
                                                    <input type="text" className="form-control" placeholder="Search..." />
                                                    <i className="bx bx-search-alt search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="text-sm-right">
                                                <Link to="/admin/restock/add" type="button" className="rounded-pill btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"><i className="bx bx-plus mr-1"></i> New Restock</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table min-width-50-rem">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Tracking #</th>
                                                    <th scope="col">Vendor</th>
                                                    <th scope="col">Store</th>
                                                    <th scope="col">Total Products</th>
                                                    <th scope="col">Expected date</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    restocks.map(restock => {
                                                        let index = restocks.indexOf(restock)
                                                        let date = new Date(restock.expected);
                                                        date = date.toDateString();
                                                        return (
                                                            <tr key={index} >
                                                                <td>{restock.tracking_number}</td>
                                                                <td>{restock.vendor && restock.vendor.name}</td>
                                                                <td>Store Name</td>
                                                                <td className="text-center">{restock.products.length}</td>
                                                                <td>{date}</td>
                                                                <td>
                                                                    <span className={`badge badge-pill ${restock.status === "Completed" ? "badge-success-lighten" : "badge-warning-lighten"}`}>{restock.status}</span>
                                                                    <div className="progress rounded-pill">

                                                                        <div className="progress-bar bg-success" style={{ width: `${restock.recievedP}%` }} role="progressbar" ></div>
                                                                        <div className="progress-bar bg-warning" style={{ width: `${restock.canceledP}%` }} role="progressbar" ></div>
                                                                        <div className="progress-bar bg-danger" style={{ width: `${restock.returnedP}%` }} role="progressbar" ></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <a className="user-dd dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="false">
                                                                            <i className='bx bx-dots-horizontal-rounded font-size-18 text-dark'></i>
                                                                        </a>
                                                                        <ul className="dropdown-menu dropdown-menu-right">
                                                                            <li><a className="dropdown-item font-size-12" data-toggle="modal" data-target="#updateModal" onClick={() => selectRestock(index)}><i className="bx bxs-pencil text-dark mr-1"></i> Update</a></li>
                                                                            <li><a className="dropdown-item font-size-12" data-toggle="modal" data-target="#restockHistory" onClick={() => selectRestock(index)}><i className="bx bxs-info-circle text-secondary mr-1"></i> View</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>

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
                    <Pagination prevPage={prevPage} nextPage={nextPage} page={page} allData={props.allRestocks} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allRestocks: state.restocks.allRestocks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRestocks: dispatch(getAllRestocks()),
        updateRestockData: (restockindex, id, data) => dispatch(updateRestockData(restockindex, id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(Restock))