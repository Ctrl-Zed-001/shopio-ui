import React from 'react'

export default function ProductStock(props) {
    return (
        <div className="card border-light">
            <div className="card-body">
                <h4 className="card-title mb-4">Inventory</h4>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">Stock Quantity</label>
                            <input defaultValue={props.product && props.product.stock} type="number" name="stock" className="form-control" onChange={props.setFields} min="0" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">Low stock notifier</label>
                            <input defaultValue={props.product && props.product.lowstock ? props.product.lowstock : 2} type="number" name="lowstock" className="form-control" onChange={props.setFields} min="2" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">Min Quantity to sell</label>
                            <input defaultValue={props.product && props.product.minquantity ? props.product.minquantity : 1} type="number" name="minquantity" className="form-control" onChange={props.setFields} min="0" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">Max quantity to sell</label>
                            <input defaultValue={props.product && props.product.maxquantity} type="number" name="maxquantity" className="form-control" onChange={props.setFields} min="1" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">Barcode (ISBN, UPC, GTIN, etc.)</label>
                            <input defaultValue={props.product && props.product.barcode} type="number" name="barcode" className="form-control" onChange={props.setFields} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
