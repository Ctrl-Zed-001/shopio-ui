import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function ProductBox({ product, changeStatus }) {

    const [status, setStatus] = useState({
        published: product.published
    })

    const updateStatus = () => {
        changeStatus(product._id)
        setStatus({
            published: !status.published
        })
    }

    return (
        <div className="col-xl-4 col-sm-6 mb-4">
            <div className="card border-light">
                <div className="card-body">
                    <span className={status.published ? `hand badge badge-success-lighten` : `hand badge badge-danger-lighten`}
                        onClick={updateStatus}
                    >
                        {status.published ? "Published" : "Un-Published"}
                    </span>
                    <div className="product-img position-relative">
                        <img src={product.displayurl} alt="" className="img-fluid mx-auto d-block product-img" />
                    </div>
                    <div className="mt-3 text-center">
                        <Link className="text-dark" to={`single/${product._id}`}><h5 className="font-size-16 text-truncate pointer" >{product.name}</h5></Link>
                        {
                            product.stock === 0 ?
                                <p className="text-danger">Out Of Stock</p> :
                                ""
                        }
                        {/* <p className="text-muted">
                            <i className="bx bxs-star text-warning"></i>
                            <i className="bx bxs-star text-warning"></i>
                            <i className="bx bxs-star text-warning"></i>
                            <i className="bx bxs-star text-warning"></i>
                            <i className="bx bx-star"></i>
                        </p> */}
                        <h6 className="my-0">
                            {product.slashedprice &&
                                <span className="text-muted mr-2"><del><i className='bx bx-rupee'></i>{product.slashedprice}</del></span>
                            }
                            <b><i className='bx bx-rupee'></i>{product.price}</b>
                        </h6>

                    </div>
                </div>
            </div>
        </div>
    )
}
