import React, { useState } from 'react'

export default function DiscountModal(props) {

    const [discount, setDiscount] = useState({
        type: "",
        value: 0
    })

    const handleChange = (e) => {
        setDiscount({
            type: e.target.name,
            value: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.calculateDiscount(discount.type, discount.value)
    }

    return (
        <div className="modal fade" id="discountModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Apply Discount</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">

                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Price</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Percent</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">

                                <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" ><i className="bx bx-rupee"></i></span>
                                        <input type="text" className="form-control" placeholder="00" name="price" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="00" name="percent" onChange={handleChange} />
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>



                        </div>



                        <div className="modal-footer">

                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={handleSubmit}>calculate</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
