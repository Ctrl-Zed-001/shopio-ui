import React, { useState, useEffect } from 'react'
import Wrapper from "../Wrapper"
import { connect } from "react-redux"
import Breadcrumb from "../Components/Breadcrumb"
import ProductBox from './ProductBox'
import { getAll, changeStatus } from "../../Redux/Actions/ProductActions"
import Pagination from "../Components/Pagination"

function AllProducts(props) {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(
        () => {
            let current_page_products = [...props.allProducts]
            setProducts(current_page_products.slice(page, page + 15))
        }, [props.allProducts, page]
    )

    const changeStatus = (id) => {
        props.changeStatus(id)
    }


    const filterProducts = (e) => {
        let allP = props.allProducts.filter(product => {
            return product.name.toLowerCase().includes(e.target.value)
        }).slice(0, 15)
        setProducts([
            ...allP
        ])
    }

    const nextPage = () => {
        setPage(page + 15)
    }

    const prevPage = () => {
        setPage(page - 15)
    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="All Products" parent="Products" subtitle="All" />
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row mb-3">
                            <div className="col-lg-12 col-sm-6">

                                <div className="search-box mr-2 w-25 w-xs-50 float-right">
                                    <div className="position-relative">
                                        <input onChange={filterProducts} type="text" className="form-control border-0" placeholder="Search..." />
                                        <i className="bx bx-search-alt search-icon"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {
                    products.length === 0 ?
                        <div className="row">
                            <div className="col-12">
                                <p className="text-center"><i className="bx bx-sad"></i> No products Found!!</p>
                            </div>
                        </div> :
                        <div className="row">
                            {
                                products.map(product => {
                                    return <ProductBox key={product._id} product={product} changeStatus={changeStatus} />
                                })
                            }
                        </div>
                }

                <Pagination prevPage={prevPage} nextPage={nextPage} page={page} allData={props.allProducts} />

            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        allProducts: state.products.allProducts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAll: dispatch(getAll()),
        changeStatus: (id) => dispatch(changeStatus(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(AllProducts))