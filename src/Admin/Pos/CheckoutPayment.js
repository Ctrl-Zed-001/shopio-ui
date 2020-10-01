import React, { useState } from 'react'

export default function CheckoutPayment(props) {

    const [activebutton, setActivebutton] = useState({});

    const [field, setField] = useState({
        pending: 0,
        payback: 0
    })

    const handlePaymentType = (paymentType) => {
        setField({
            ...field,
            paymentmode: paymentType
        })
        setActivebutton({
            [paymentType]: "active"
        })
    }

    const handleChange = (e) => {
        let pending = props.grandtotal - e.target.value;
        let payment_status = "Completed";
        if (pending <= 0) {
            pending = 0;
        } else {
            payment_status = "Pending"
        }
        let payback = e.target.value - props.grandtotal;
        if (payback < 0) {
            payback = 0;
        }
        setField({
            ...field,
            recieved: parseInt(e.target.value),
            pending: pending,
            payback: payback,
            paymentstatus: payment_status
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        document.querySelector("#v-pills-confir-tab").click()
        props.setPaymentDetails(field)
    }



    return (
        <div className="tab-pane fade" id="v-pills-payment" role="tabpanel" >
            <div className="payment-tyoe">
                <h4 className="card-title">Payment information</h4>
                <p className="card-title-desc">Select payment type</p>

                <button className={`btn btn-light btn-pay ${activebutton.cash && activebutton.cash}`} onClick={() => handlePaymentType("cash")}>
                    <i className='bx bx-money' ></i>
                    <br />
                    <b>CASH</b>
                </button>


                <button className={`btn btn-light btn-pay ${activebutton.card && activebutton.card}`} onClick={() => handlePaymentType("card")} >
                    <i className='bx bxs-credit-card-alt' ></i>
                    <br />
                    <b>CARD</b>
                </button>


                <button className={`btn btn-light btn-pay ${activebutton.UPI && activebutton.UPI}`} onClick={() => handlePaymentType("UPI")} >
                    <i className='bx bx-transfer' ></i>
                    <br />
                    <b>UPI</b>
                </button>
            </div>

            <div className="payment-recieved">
                <p className="mt-4 mb-2 card-title-desc">Payment</p>
                <div className="p-4 border rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-2 mb-2">
                                <p className="mb-2">Grand Total</p>
                                <p><b><i className="bx bx-rupee"></i> {props.grandtotal}</b></p>
                            </div>
                            <div className="col-md-4 mb-2 col-xs-12">

                                <label htmlFor="exampleFormControlInput1" className="form-label">Amount recieved</label>
                                <input type="number" className="form-control form-control-sm" onChange={handleChange} />

                            </div>
                            <div className="col-md-2 mb-2 col-xs-12">
                                <p className="mb-2">Amount Pending</p>
                                <p><b><i className="bx bx-rupee"></i> {field.pending}</b></p>
                            </div>
                            <div className="col-md-2 mb-2 col-xs-12">
                                <p className="mb-2">Amount Return</p>
                                <p><b><i className="bx bx-rupee"></i> {field.payback}</b></p>
                            </div>
                            <div className="col-md-2 mb-2 col-xs-12">
                                <button type="submit" onClick={handleSubmit} className="btn btn-success btn-sm mt-3">Accepted</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
