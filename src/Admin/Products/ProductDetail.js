import React, { useState, useEffect } from 'react'
import Wrapper from '../Wrapper'
import Breadcrumb from '../Components/Breadcrumb'
import { useHistory, useParams } from "react-router-dom"
import Axios from 'axios'
import { apiurl } from '../../Globals'
import { Link } from "react-router-dom"


function ProductDetail() {
    const [selectedProduct, setSelectedProduct] = useState({
        additionalurls: [],
        dimensions: {}
    })

    const { id } = useParams()

    useEffect(
        () => {
            if (!selectedProduct.sku) {
                Axios.get(`${apiurl}/products/${id}`)
                    .then(res => {
                        setSelectedProduct(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        [selectedProduct]
    )

    // TODO: DELETE PRODUCT
    // const deleteProduct = () => {
    //     Axios.delete(`${apiurl}/products/delete/${selectedProduct._id}`)
    //         .then(res => {
    //             history.push("/admin/product/all")
    //             console.log(res.data)
    //         })
    //         .catch(err => console.log(err.response))

    // }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="Product Detail" parent="Product" subtitle="Details" />

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="product-detai-imgs">
                                                <div className="row">
                                                    <div className="col-md-2 col-sm-3 col-4">
                                                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                            <a className="nav-link" id="v-pills-main-tab" data-toggle="pill" href="#v-pills-main" role="tab" aria-controls="v-pills-main" aria-selected="false">
                                                                <img alt="product display image" className="img-fluid" src={selectedProduct.displayurl} />
                                                            </a>
                                                            {
                                                                selectedProduct.additionalurls && selectedProduct.additionalurls.map(image => {
                                                                    let index = selectedProduct.additionalurls.indexOf(image);
                                                                    return (
                                                                        <a key={index} className="nav-link" id={`v-pills-${index}-tab`} data-toggle="pill" href={`#v-pills-${index}`} role="tab" aria-controls={`v-pills-${index}`} aria-selected="false">
                                                                            <img className="img-fluid" src={image} />
                                                                        </a>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 offset-md-1 col-sm-9 col-8">
                                                        <div className="tab-content" id="v-pills-tabContent">
                                                            <div className="tab-pane fade show active" id="v-pills-main" role="tabpanel" aria-labelledby="v-pills-main-tab">
                                                                <img className="img-fluid" src={selectedProduct.displayurl} />
                                                            </div>
                                                            {
                                                                selectedProduct.additionalurls && selectedProduct.additionalurls.map(image => {
                                                                    let index = selectedProduct.additionalurls.indexOf(image);
                                                                    return (
                                                                        <div key={index} className="tab-pane fade" id={`v-pills-${index}`} role="tabpanel" aria-labelledby={`v-pills-${index}-tab`}>
                                                                            <img className="img-fluid" src={image} />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="mt-4 mt-xl-3">

                                                <div className="dropdown float-right">
                                                    <i className="bx bx-dots-vertical-rounded" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false"> </i>

                                                    <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenuLink">
                                                        <li className="mb-2"><Link to={`/admin/product/${selectedProduct._id}/edit`} className="btn btn-warning btn-warning-imp btn-sm text-light dropdown-item"><i className="bx bxs-pencil"></i> Edit</Link></li>
                                                        <li><button className="btn btn-danger btn-sm dropdown-item"><i className="bx bxs-trash-alt"></i> Delete</button></li>
                                                    </ul>
                                                </div>
                                                <h4 className="mt-1 mb-3">{selectedProduct.name}</h4>

                                                <p>Product SKU : <b>{selectedProduct.sku}</b></p>
                                                <p>Brand : <b>{selectedProduct.brand}</b></p>

                                                {/* <p className="text-muted float-left mr-3">
                                                    <span className="bx bxs-star text-warning"></span>
                                                    <span className="bx bxs-star text-warning"></span>
                                                    <span className="bx bxs-star text-warning"></span>
                                                    <span className="bx bxs-star text-warning"></span>
                                                    <span className="bx bx-star"></span>
                                                </p>
                                                <p className="text-muted mb-4">( 152 Customers Review )</p> */}
                                                <p className="mb-4">
                                                    MRP :
                                                    <b><i className="bx bx-rupee"></i> {selectedProduct.mrp}</b>
                                                    <span className="ml-3">
                                                        Price :
                                                        <b><i className="bx bx-rupee"></i> {selectedProduct.price}</b>
                                                    </span>
                                                </p>
                                                <p className="mb-4">
                                                    Cost : <b><i className="bx bx-rupee"></i>{selectedProduct.cost}</b>
                                                    <span className="ml-3 mr-3">Margin : <b>{selectedProduct.margin}</b> %</span>
                                                    <span>Profit : <b><i className="bx bx-rupee"></i>{selectedProduct.profit}</b></span>
                                                </p>
                                                <p className="mb-0"><b>Category: </b></p>
                                                {selectedProduct.category && selectedProduct.category.map(item => {
                                                    return <span className="ctlist" key={selectedProduct.category.indexOf(item)}><i className='bx bxs-circle ctdot'></i>{item}</span>
                                                })}
                                                <p className="mb-0 mt-4"><b>Vendor:</b></p>
                                                <p className="text-muted mb-4">{selectedProduct.vendor}</p>
                                                <p className="mb-0 mt-4"><b>Short description:</b></p>
                                                <p className="text-muted mb-4">{selectedProduct.shortdescription}</p>
                                                <p className="mb-0"><b>Long description:</b></p>
                                                <p className="text-muted mb-4">{selectedProduct.longdescription}</p>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5 className="mb-3">Dimensions </h5>

                                    <div className="table-responsive">
                                        <table className="table mb-0 table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th >Height</th>
                                                    <td>{selectedProduct.dimensions.height} cm</td>
                                                </tr>
                                                <tr>
                                                    <th >Weight</th>
                                                    <td>{selectedProduct.dimensions.weight} kg</td>
                                                </tr>
                                                <tr>
                                                    <th >Length</th>
                                                    <td>{selectedProduct.dimensions.length} cm</td>
                                                </tr>
                                                <tr>
                                                    <th >Width</th>
                                                    <td>{selectedProduct.dimensions.width} cm</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5 className="mb-3">Inventory &nbsp; <b className="font-size-11">Barcode : {selectedProduct.barcode}</b> </h5>

                                    <div className="table-responsive">
                                        <table className="table mb-0 table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th >Available Stock</th>
                                                    <td>{selectedProduct.stock}</td>
                                                </tr>
                                                <tr>
                                                    <th >Min quantity to sell</th>
                                                    <td>{selectedProduct.minquantity}</td>
                                                </tr>
                                                <tr>
                                                    <th >Max quantity to sell</th>
                                                    <td>{selectedProduct.maxquantity}</td>
                                                </tr>
                                                <tr>
                                                    <th >Low threshold</th>
                                                    <td>{selectedProduct.lowstock}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5 className="mb-3">Product Meta SEO </h5>

                                    <div className="table-responsive">
                                        <table className="table mb-0 table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th>Meta Title</th>
                                                    <td>{selectedProduct.metatitle}</td>
                                                </tr>
                                                <tr>
                                                    <th>Meta Keywords</th>
                                                    <td>{selectedProduct.metakeywords}</td>
                                                </tr>
                                                <tr>
                                                    <th>Meta Description</th>
                                                    <td>{selectedProduct.metadescription}</td>
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
        </div >
    )
}



export default Wrapper(ProductDetail)
