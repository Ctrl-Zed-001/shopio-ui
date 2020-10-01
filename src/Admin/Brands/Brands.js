import React, { useState, useEffect } from 'react'
import Breadcrumb from "../Components/Breadcrumb"
import Wrapper from '../Wrapper'
import { connect } from "react-redux"
import { addNewBrand, getAllBrands } from "../../Redux/Actions/ProductActions"

function Brands(props) {

    const [form, setForm] = useState({})

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNewBrand(form)
    }

    useEffect(
        () => {
            if (props.brands.length === 0) {
                props.getAllBrands();
            }
        })

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="All Brands" parent="Brands" subtitle="All" />

                    <div className="row">
                        <div className="col-md-5">
                            <div className="card border-light">
                                <div className="card-body">
                                    <h6 className="mb-4"><b>ADD NEW BRAND</b></h6>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Brand name</label>
                                            <input className="form-control" name="name" onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Slug</label>
                                            <input className="form-control" name="slug" onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <input className="form-control" name="description" onChange={handleChange} />
                                        </div>
                                        <input type="submit" value="Add" className="btn btn-success float-right" onClick={handleSubmit} />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="card border-light">
                                <div className="card-body">

                                    <div className="table-responsive">
                                        <table className="table mb-0 min-width-40-rem">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Brand Name</th>
                                                    <th>Slug</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.brands.map(brand => {
                                                        return <tr key={props.brands.indexOf(brand)} >
                                                            <td>{props.brands.indexOf(brand) + 1}</td>
                                                            <td>{brand.name}</td>
                                                            <td>{brand.slug}</td>
                                                            <td>{brand.description}</td>
                                                        </tr>
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
        brands: state.products.brands
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBrands: () => dispatch(getAllBrands()),
        addNewBrand: (newBrand) => dispatch(addNewBrand(newBrand))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(Brands))