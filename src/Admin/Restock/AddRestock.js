import React, { useState } from 'react'
import Wrapper from "../Wrapper"
import Breadcrumb from "../Components/Breadcrumb"
import SelectVendorModal from "./SelectVendorModal"
import { connect } from "react-redux"
import { getAll } from "../../Redux/Actions/ProductActions"
import { getAllVendors } from "../../Redux/Actions/VendorActions"
import { addNewRestock } from "../../Redux/Actions/RestockActions"
import { useHistory } from "react-router-dom"

const AddRestock = (props) => {

    const history = useHistory()

    const [restockData, setRestockData] = useState({
        products: [],
        vendor: {},
    })

    const [filterProducts, setFilterProducts] = useState([])


    const selectVendor = (id) => {
        const selectedVendor = props.vendors.filter(vendor => {
            return vendor._id === id
        })
        setRestockData({
            ...restockData,
            vendor: selectedVendor[0]
        })

    }

    const applyFilter = (e) => {
        if (e.target.value === "") {
            setFilterProducts([])
        } else {
            let filterArray = props.products.filter(product => {
                return product.name.toLowerCase().includes(e.target.value.toLowerCase())
            })
            filterArray = filterArray.splice(0, 3)
            setFilterProducts([
                ...filterArray
            ])
        }
    }

    const selectProduct = (product) => {
        // ADD THE CLICKED PRODUCT TO SELECTEDPRODUCTS STATE
        setRestockData({
            ...restockData,
            products: [
                ...restockData.products,
                {
                    _id: product._id,
                    sku: product.sku,
                    name: product.name,
                    displayurl: product.displayurl
                }
            ]
        })
        setFilterProducts([])
        document.querySelector("#productFinder").value = "";
    }

    const removeProduct = (id) => {
        // REMOVE PRODUCT FROM SELECTED PRODUCT STATE
        let oldProducts = restockData.products;
        let newProducts = oldProducts.filter(product => product._id !== id)

        setRestockData({
            ...restockData,
            products: newProducts,
        })

    }


    const handleChange = (e) => {
        setRestockData({
            ...restockData,
            [e.target.name]: e.target.value
        })
    }

    const setvalue = (e) => {
        let selectedProduct = restockData.products.filter(product => {
            return product._id === e.target.name
        });
        let index = restockData.products.indexOf(selectedProduct[0]);
        selectedProduct = {
            ...selectedProduct[0],
            incomming: e.target.value,
        }
        let updatedProducts = restockData.products;
        updatedProducts[index] = selectedProduct
        setRestockData({
            ...restockData,
            products: updatedProducts
        })
    }

    const handleSubmit = () => {
        props.addNewRestock(restockData)
        history.push("/admin/restock")
    }

    return (
        <div className="main-content">
            <SelectVendorModal vendors={props.vendors} selectVendor={selectVendor} />

            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="Add Restock" parent="Restock" subtitle="Add" />

                    <div className="row mt-3">

                        <div className="col-md-7 col-xs-12 mb-4">
                            <div className="card border-0">
                                <div className="card-body">

                                    <h6 className="d-inline-flex mt-1">Products</h6>

                                    <div className="dropdown">
                                        <div className="input-group mb-3" id="dropdownMenuButton" data-toggle="dropdown">
                                            <input id="productFinder" type="text" className="form-control" placeholder="Search for product name..." aria-label="Enter Product Name..." aria-describedby="basic-addon2" onChange={applyFilter} />
                                            <button className="btn btn-success btn-sm disabled" id="basic-addon2"><i className="bx bx-plus"></i> Add Product</button>
                                        </div>
                                        <ul className="dropdown-menu w-100 border-0" aria-labelledby="dropdownMenuButton">
                                            {
                                                filterProducts.map(product => {
                                                    return (
                                                        <li className="p-2 hover-light pointer" key={product._id} onClick={() => selectProduct(product)} >
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <img alt="product display" src={product.displayurl} className="img-fluid" />
                                                                </div>
                                                                <div className="col-6">
                                                                    <p className="font-size-12 mt-2"><b>{product.name}</b></p>
                                                                </div>
                                                                <div className="col-4">
                                                                    <p className="font-size-12 mt-2"><i>Available stock :</i> <b>{product.stock}</b></p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>

                                    <div className="restock-list-items mt-4">
                                        {
                                            restockData.products.length > 0 ?
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Product
                                                            </th>
                                                            <th>Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            restockData.products.map(product => {
                                                                let index = restockData.products.indexOf(product)
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <div className="row">
                                                                                <div className="col-1">
                                                                                    <i className="bx bxs-trash-alt text-danger pointer mt-2" onClick={() => removeProduct(product._id)} ></i>
                                                                                </div>
                                                                                <div className="col-2 d-none d-sm-block">
                                                                                    <img alt="product display " className="img-fluid" src={product.displayurl} />
                                                                                </div>
                                                                                <div className="col-8">
                                                                                    <p className="text-dark mb-0">{product.name}</p>
                                                                                    <p>SKU : {product.sku}</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                        <td className="w-25 w-xs-50">
                                                                            <div className="input-group">
                                                                                <input type="text" className="form-control" name={product._id} onChange={setvalue} />
                                                                                <span className="input-group-text"><i className='bx bx-x'></i></span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </table> :
                                                <></>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-5 col-xs-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5 className="card-title">Vendor</h5>
                                    {
                                        restockData.vendor.name ?
                                            <div className="mt-2">
                                                <p className="m-0"><b>{restockData.vendor.name}</b></p>
                                                <p className="m-0" >{restockData.vendor.phone}</p>
                                                <p className="m-0">{restockData.vendor.email}</p>
                                                <p className="m-0">
                                                    {`${restockData.vendor.address.line1}, ${restockData.vendor.address.city}, ${restockData.vendor.address.state}, ${restockData.vendor.address.zipcode}, ${restockData.vendor.address.country}`}
                                                </p>
                                                <button className="mt-3 btn btn-link btn-sm" data-toggle="modal" data-target="#selectVendorModal">
                                                    Change vendor
                                                </button>
                                            </div>
                                            :
                                            <button className="btn btn-custom btn-sm mt-4" data-toggle="modal" data-target="#selectVendorModal">Add Vendor</button>
                                    }

                                </div>
                            </div>
                            <div className="card mt-4 border-0">
                                <div className="card-body">
                                    <h5 className="card-title">Shipment</h5>
                                    <div className="mt-3">
                                        <label className="form-label">Expected Arrival</label>
                                        <input className="form-control form-control-sm" type="date" name="expected" onChange={handleChange} />
                                    </div>
                                    <div className="mt-3">
                                        <label className="form-label">Tracking Number</label>
                                        <input type="text" name="tracking" className="form-control form-control-sm" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <hr />

                    <div>

                        <button className="btn btn-success float-right btn-sm" onClick={handleSubmit}>Save</button>
                        <button className="btn btn-danger float-right btn-sm mr-3">Cancel</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        vendors: state.vendors.allVendors,
        products: state.products.allProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: dispatch(getAll()),
        getAllVendors: dispatch(getAllVendors()),
        addNewRestock: (newRestock) => dispatch(addNewRestock(newRestock))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(AddRestock))