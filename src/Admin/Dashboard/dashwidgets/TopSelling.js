import React from 'react'

export default function TopSelling(props) {
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body">
                <h3 className="card-title mb-3">Top Selling Products</h3>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="bg-light">
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity Sold</th>
                                <th>Stock Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data.map(product => {
                                    return (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity_sold}</td>
                                            <td>{product.stock}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
