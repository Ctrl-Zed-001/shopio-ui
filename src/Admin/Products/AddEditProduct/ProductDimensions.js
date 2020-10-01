import React from 'react'

export default function ProductDimensions(props) {

    return (
        <div className="card border-light">
            <div className="card-body">
                <h4 className="card-title mb-4">Product dimensions</h4>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Weight (Kg)</label>
                            <input placeholder={props.product ? props.product.dimensions.weight : ""} type="number" name="weight" className="form-control" onChange={props.setFields} min="0" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Height (cm)</label>
                            <input placeholder={props.product ? props.product.dimensions.height : ""} type="number" name="height" className="form-control" onChange={props.setFields} min="0" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Length (cm)</label>
                            <input placeholder={props.product ? props.product.dimensions.length : ""} type="number" name="length" className="form-control" onChange={props.setFields} min="0" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Width (cm)</label>
                            <input placeholder={props.product ? props.product.dimensions.width : ""} type="number" name="width" className="form-control" onChange={props.setFields} min="0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
