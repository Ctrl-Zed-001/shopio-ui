import React, { useState } from 'react'

export default function RecievePaymentModal(props) {

    const [amount, setAmount] = useState()

    const handleChange = (e) => {
        setAmount(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.recievePayment(amount);
    }

    return (
        <div className="modal fade" id="recievePaymentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Recieve Amount</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="mb-3">
                            <label htmlFor="amountrecieved" className="form-label">Enter the amount recieved</label>
                            <input type="number" className="form-control" id="amountrecieved" onChange={handleChange} />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSubmit} data-dismiss="modal" aria-label="Close" type="button" className="btn btn-success btn-sm">Accept</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
