import React, { useState } from 'react'
import Wrapper from "../Wrapper"
import Breadcrumb from "../Components/Breadcrumb"
import { getAllCategories, addNewCategory } from "../../Redux/Actions/ProductActions"
import { connect } from "react-redux"

function Categories(props) {

    const [form, setForm] = useState({})


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNewCategory(form)
    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="All Categories" parent="Categories" subtitle="All" />
                    <div className="row">
                        <div className="col-md-5">
                            <div className="card border-light">
                                <div className="card-body">
                                    <h4 className="card-title mb-4"><b>ADD NEW CATEGORY</b></h4>
                                    <form className="needs-validation" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Category Name</label>
                                            <input type="text" name="name" className="form-control" id="name" required onChange={handleChange} />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="slug">Category Slug</label>
                                            <input type="text" name="name" className="form-control" id="slug" required onChange={handleChange} />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="description">Category Description</label>
                                            <input type="text" name="name" className="form-control" id="description" required onChange={handleChange} />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <input type="submit" value="Add" className="btn btn-success float-right" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="card border-light">
                                <div className="card-body">

                                    <div className="table-responsive">
                                        <table className="table table-hover min-width-40-rem">

                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Category Name</th>
                                                    <th>Slug</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.categories.map(category => {
                                                    return <tr key={props.categories.indexOf(category)}>
                                                        <td>{props.categories.indexOf(category) + 1}</td>
                                                        <td>{category.name}</td>
                                                        <td>{category.slug}</td>
                                                        <td>{category.description}</td>
                                                    </tr>
                                                })}
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
        categories: state.products.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: dispatch(getAllCategories()),
        addNewCategory: (category) => dispatch(addNewCategory(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(Categories))
