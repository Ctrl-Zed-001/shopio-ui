import React, { useEffect } from 'react'

export default function RestockHistoryModal(props) {
    useEffect(
        () => {
            console.log(props.products)
        }
    )
    return (
        <div className="modal fade" id="restockHistory" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Restock History</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>SKU</th>
                                    <th>Product</th>
                                    <th>Orderd</th>
                                    <th>Recieved</th>
                                    <th>Calceled</th>
                                    <th>Returned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.products && props.products.map(product => {
                                        return (
                                            <tr key={product.sku}>
                                                <td>{product.sku}</td>
                                                <td>{product.name}</td>
                                                <td>{product.incomming}</td>
                                                <td>{product.recieved}</td>
                                                <td>{product.canceled}</td>
                                                <td>{product.returned}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
