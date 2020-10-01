import React, { useState, useEffect, useRef } from 'react'
import Wrapper from '../Wrapper'
import Breadcrumb from "../Components/Breadcrumb"
import { connect } from "react-redux"
import { getAll } from "../../Redux/Actions/ProductActions"
import DiscountModal from './DiscountModal'
import { newCart } from "../../Redux/Actions/OrderActions"
import { useHistory } from "react-router-dom"

function Pos(props) {

    const [barcode, setBarcode] = useState();

    const [cart, setCart] = useState([])

    const [summary, setSummary] = useState({
        total: 0,
        discount: 0,
        tax: 0,
        grandtotal: 0
    })

    const history = useHistory()

    const barcodeRef = useRef(null);

    useEffect(
        () => {
            if (props.cart.products) {
                setCart([
                    ...props.cart.products
                ])
                setSummary({
                    total: props.cart.total,
                    discount: props.cart.discount,
                    tax: props.cart.tax,
                    grandtotal: props.cart.grandtotal,
                })
            }
            barcodeRef.current.focus()
        }, []
    )

    const handleChange = (e) => {
        setBarcode(e.target.value)
    }

    const addToCart = (e) => {
        e.preventDefault()
        // SEARCH IF PRODUCT ALREADY IN CART
        let filterProduct = cart.filter(prod => prod.barcode === parseInt(barcode))

        if (filterProduct.length > 0) {
            // IF PRODUCT ALREADY IN CART THE INCREASE ITS QUANTITY BY 1 & TOTAL PLUS PRICE
            let index = cart.indexOf(filterProduct[0]);
            filterProduct[0].quantity += 1;
            filterProduct[0].total += filterProduct[0].price;
            let newCart = cart;
            newCart[index] = filterProduct[0]
            setCart([
                ...newCart
            ])
            setSummary({
                ...summary,
                total: summary.total + filterProduct[0].price,
                grandtotal: summary.grandtotal + filterProduct[0].price
            })

        } else {
            // FILTER THE PRODUCT FROM ALL PRODUCTS WITH BARCODE
            let newProduct = props.products.filter(product => product.barcode === parseInt(barcode))

            if (newProduct.length > 0) {
                newProduct[0].total = newProduct[0].price;
                newProduct[0].quantity = 1;
                newProduct[0].total = newProduct[0].price;
                // ADD PRODUCT TO CART
                let oldCart = cart;
                oldCart.push(newProduct[0]);
                setCart([
                    ...oldCart
                ])

                // SET TOTAL PRICE IN ORDER SUMMARY
                setSummary({
                    ...summary,
                    total: summary.total + newProduct[0].price,
                    grandtotal: summary.grandtotal + newProduct[0].price
                })
            } else {
                alert("No product found.")
            }

        }
        document.getElementById("searchBarcode").value = '';
        setBarcode()
    }

    const removeFromCart = (product) => {
        let newCart = cart.filter(prod => {
            return prod._id !== product._id
        })
        setCart([
            ...newCart
        ])
        setSummary({
            ...summary,
            total: summary.total - product.total,
            grandtotal: summary.grandtotal - product.total
        })
    }

    const changeQuantity = (method, product) => {
        let selectedProduct = cart.filter(prod => prod._id === product._id)
        let index = cart.indexOf(product)
        let newCart = cart;
        if (method === "add") {
            selectedProduct[0].total += selectedProduct[0].price;
            selectedProduct[0].quantity += 1;
            newCart[index] = selectedProduct[0];
            setCart([
                ...newCart
            ])

            // SET THE VALUE OF TOTAL IN ORDER SUMMARY
            setSummary({
                ...summary,
                total: summary.total + selectedProduct[0].price,
                grandtotal: summary.grandtotal + selectedProduct[0].price
            })


        } else if (method === "sub" && selectedProduct[0].quantity > 1) {
            selectedProduct[0].total -= selectedProduct[0].price;
            selectedProduct[0].quantity -= 1;
            newCart[index] = selectedProduct[0];
            setCart([
                ...newCart
            ])

            // SET THE VALUE OF TOTAL IN ORDER SUMMARY
            setSummary({
                ...summary,
                total: summary.total - selectedProduct[0].price,
                grandtotal: summary.grandtotal - selectedProduct[0].price
            })
        }
    }

    const calculateTax = (e) => {
        let gst = 0;
        if (summary.total === 0) {
            e.target.checked = false
        } else if (e.target.checked === false) {
            console.log("in ifelse")
            setSummary({
                ...summary,
                tax: 0,
                grandtotal: summary.grandtotal - summary.tax
            })
        } else {
            console.log("in else")
            gst = summary.total * 0.18;
            setSummary({
                ...summary,
                tax: gst,
                grandtotal: summary.grandtotal + gst
            })
        }
    }

    const calculateDiscount = (type, value) => {
        if (type === "price" & value !== 0) {
            setSummary({
                ...summary,
                discount: value,
                discountType: "price",
                grandtotal: summary.grandtotal - value
            })
        } else if (type === "percent" & value !== 0) {
            let dis = summary.total * (value / 100);

            setSummary({
                ...summary,
                discount: dis,
                discountType: "percent",
                grandtotal: summary.grandtotal - dis
            })
        } else {
            alert("no value")
        }
    }

    const clearDiscount = () => {
        if (summary.discountType === "price") {
            setSummary({
                ...summary,
                discount: 0,
                discountType: "",
                grandtotal: parseInt(summary.grandtotal) + parseInt(summary.discount)
            })
        } else {
            setSummary({
                ...summary,
                discount: 0,
                discountType: "",
                grandtotal: parseInt(summary.grandtotal) + parseInt(summary.discount)
            })
        }
    }

    const checkout = () => {
        let orderDetails = {
            products: [
                ...cart
            ],
            ...summary
        }
        props.makeNewOrder(orderDetails);
        history.push("/admin/pos/checkout")
    }





    return (
        <div className="main-content">
            <DiscountModal calculateDiscount={calculateDiscount} />
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="POS" parent="POS" subtitle="Cart" />



                    <div className="row">
                        <div className="col-xl-8">


                            <div className="search-box mr-2">
                                <div className="position-relative">
                                    <form onSubmit={addToCart}>
                                        <div className="input-group">

                                            <input ref={barcodeRef} id="searchBarcode" type="number" className="form-control form-control-lg border-0 rounded-0" placeholder="Search Barcode.." onChange={handleChange} />
                                            <i className="bx bx-search-alt search-icon" style={{ "zIndex": "5" }}></i>
                                            <button type="submit" className="btn btn-custom" id="button-addon2"><i className="bx bxs-cart"></i> ADD TO CART</button>
                                            {/* TODO: ADD A BUTTON AND MODAL TO QUICK ADD NEW PRODUCT TO DB */}
                                        </div>
                                    </form>
                                </div>
                            </div>


                            <div className="card border-0 mt-4 mb-2">
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-centered mb-0 table-nowrap min-width-40-rem">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th colSpan="2">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    cart.map(product => {
                                                        let index = cart.indexOf(product)
                                                        return (
                                                            <tr key={index} className="align-middle">
                                                                <td>
                                                                    <img src={product.displayurl} alt="product-img" title="product-img" className="img-thumbnail img-fluid pos-cart-img" />
                                                                </td>
                                                                <td style={{ "maxWidth": "8rem" }}>
                                                                    <h5 className="font-size-11 text-truncate text-dark">{product.name}</h5>
                                                                </td>
                                                                <td className="font-size-11"><i className="bx bx-rupee"></i> {product.price}</td>
                                                                <td className="w-25">
                                                                    <div className="input-group">
                                                                        <input type="text" className="form-control" placeholder={product.quantity} disabled />
                                                                        <button className="btn btn-custom btn-sm" type="button" onClick={() => changeQuantity("add", product)} >+</button>
                                                                        <button className="btn btn-custom btn-sm" type="button" onClick={() => changeQuantity("sub", product)}>-</button>
                                                                    </div>
                                                                </td>
                                                                <td className="font-size-11"> <i className="bx bx-rupee"></i> {product.total}</td>
                                                                <td>
                                                                    <i className="bx bxs-trash-alt text-danger pointer font-size-18" onClick={() => removeFromCart(product)} ></i>
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
                        <div className="col-xl-4">

                            <div className="card border-0">
                                <div className="card-body">
                                    <h4 className="card-title mb-3">Order Summary</h4>

                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>Total :</td>
                                                    <td><i className="bx bx-rupee"></i> {summary.total}</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount : </td>
                                                    <td>- <i className="bx bx-rupee"></i> {summary.discount}</td>
                                                </tr>
                                                <tr>
                                                    <td>GST (18%) : </td>
                                                    <td>+ <i className="bx bx-rupee"></i> {summary.tax}</td>
                                                </tr>
                                                <tr className="bg-dark text-white">
                                                    <th>Grand Total :</th>
                                                    <th><i className="bx bx-rupee"></i> {summary.grandtotal}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-check form-switch float-left mt-3">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={calculateTax} />
                                                <label className="form-check-label font-size-11" htmlFor="flexSwitchCheckDefault">Add Taxes</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            {
                                                summary.discount === 0 ?
                                                    <button data-toggle="modal" data-target="#discountModal" className="btn btn-link mt-3 font-size-11 text-info pt-0"> Add Discount </button> :
                                                    <button onClick={clearDiscount} className="btn btn-link mt-3 font-size-11 text-info pt-0"> Clear Discount </button>
                                            }
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <button onClick={checkout} className={`btn btn-success btn-block ${summary.grandtotal === 0 ? "disabled" : ""}`} ><i className='bx bxs-cart-alt'></i> Proceed to checkout</button>
                                        </div>
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
        products: state.products.allProducts,
        cart: state.orders.newCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: dispatch(getAll()),
        makeNewOrder: (orderDetails) => dispatch(newCart(orderDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(Pos))