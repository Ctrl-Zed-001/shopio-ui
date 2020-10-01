import React, { useState } from 'react'
import Wrapper from "../Wrapper"
import Breadcrumb from '../Components/Breadcrumb'
import { connect } from 'react-redux'
import { updateStock } from "../../Redux/Actions/InventoryActions"
import { getAll } from "../../Redux/Actions/ProductActions"

const Inventory = (props) => {

    const [stock, setStock] = useState({})

    const [savebutton, setSavebutton] = useState({
        id: ""
    })

    const handleChange = (e) => {
        setStock({
            newstock: e.target.value
        })
        setSavebutton({
            id: e.target.id
        })

    }

    const updateStock = (id) => {
        props.updateStock(id, stock.newstock)
    }



    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="Inventory" parent="Products" subtitle="Inventory" />

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table min-width-50-rem">
                                            <thead>
                                                <tr>
                                                    <th scope="col">SKU</th>
                                                    <th scope="col" colSpan="2">Product</th>
                                                    <th scope="col">Vendor / Supplier</th>
                                                    <th scope="col">Incomming ReStock</th>
                                                    <th scope="col" colSpan="2">Available</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.products.map(product => {
                                                        return (
                                                            <tr key={product._id} className="align-middle inventory-list">
                                                                <td scope="row">{product.sku}</td>
                                                                <td>
                                                                    <img alt="product displau image" className="img-fluid img-thumbnail" src={product.displayurl} />
                                                                </td>
                                                                <td>{product.name}</td>
                                                                <td>{product.brand}</td>
                                                                <td>
                                                                    {/* TODO: get the incomming restock from restock collection and show it here */}
                                                                    <p>0</p>
                                                                </td>
                                                                <td className="wd20">
                                                                    <input id={product._id} name="stock" type="number" min="0" defaultValue={product.stock} className="form-control form-control-sm" onChange={handleChange} />
                                                                </td>
                                                                <td><button className={`btn btn-success btn-sm btn-stock ${savebutton.id != product._id ? "disabled" : ""}`} onClick={() => updateStock(product._id)}>Save</button></td>
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

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.allProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStock: (id, newstock) => dispatch(updateStock(id, newstock)),
        getAllProducts: dispatch(getAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(Inventory))