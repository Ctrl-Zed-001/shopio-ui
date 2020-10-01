import React from 'react'
import Select from "react-select"

const BasicDetails = (props) => {
    return (
        <div className="row mb-4">
            <div className="col-md-12">
                <div className="card border-light">
                    <div className="card-body">

                        <h4 className="card-title mb-4">Basic Information</h4>


                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="sku">Product SKU</label>
                                    <input id="sku" defaultValue={props.product && props.product.sku} name="sku" type="text" className="form-control" required onChange={props.setFields} />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="productname">Product Name</label>
                                    <input defaultValue={props.product && props.product.name} id="productname" name="name" type="text" className="form-control" required onChange={props.setFields} />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="brandname">Brand Name</label>
                                    <Select placeholder={props.product && props.product.brand} id="brandname" name="brand" options={props.allbrands} required onChange={props.setBrand} />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label" htmlFor="price">MRP</label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <div className="input-group-text"><i className='bx bx-rupee'></i></div>
                                            <input defaultValue={props.product && props.product.mrp} type="number" name="mrp" id="mrp" className="form-control" onChange={props.setFields} min="0" />
                                        </div>
                                        <div className="invalid-feedback"></div>
                                    </div>
                                    <div className="col">
                                        <label className="form-label" htmlFor="price">Sale price</label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <div className="input-group-text"><i className='bx bx-rupee'></i></div>
                                            <input defaultValue={props.product && props.product.price} type="number" name="price" id="price" className="form-control" onChange={props.setCost} min="0" />
                                        </div>
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="form-label" htmlFor="cost">Per unit cost</label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <div className="input-group-text"><i className='bx bx-rupee'></i></div>
                                            <input defaultValue={props.product && props.product.cost} type="number" name="cost" id="cost" className="form-control" onChange={props.setCost} min="0" />
                                        </div>
                                    </div>
                                    <div className="col-3 text-center">
                                        <p className="font-weight-lighter mb-0 mt-4">Margin</p>
                                        <p className="text-dark">{props.product ? props.product.margin : props.margin} %</p>
                                    </div>
                                    <div className="col-3 text-center">
                                        <p className="font-weight-lighter mb-0 mt-4">Profit</p>
                                        <p className="text-dark"><i className='bx bx-rupee'></i> {props.product ? props.product.profit : props.profit}</p>
                                    </div>
                                </div>

                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="category">Category</label>
                                    <Select placeholder={props.product && props.product.defaultcategories} id="category" name="category" options={props.allcategories} isMulti required onChange={props.setCategories} />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="category">Vendor</label>
                                    <Select placeholder={props.product && props.product.vendor} id="vendor" name="vendor" options={props.allVendors} required onChange={props.setVendor} />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="shortdescription">Short Description</label>
                                    <input defaultValue={props.product && props.product.shortdescription} id="shortdescription" name="shortdescription" type="text" className="form-control" required onChange={props.setFields} />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="longdescription">Long Description</label>
                                    <textarea defaultValue={props.product && props.product.longdescription} name="longdescription" id="longdscription" rows="5" required className="form-control" onChange={props.setFields}></textarea>
                                    <div className="invalid-feedback"></div>
                                </div>
                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicDetails