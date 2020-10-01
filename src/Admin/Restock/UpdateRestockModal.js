import React, { useState, useEffect } from 'react'

export default function UpdateRestockModal(props) {

    const [restock, setRestock] = useState([])

    useEffect(
        () => {
            let cleanedRestock = props.products
            props.products && props.products.map(product => {
                let index = cleanedRestock.indexOf(product)
                product.incomming -= (product.recieved + product.canceled)
                product.recieved = 0;
                product.canceled = 0;
                product.returned = 0;
                cleanedRestock[index] = product

            });
            setRestock(cleanedRestock)

        }, [props.products]
    )


    const handleChange = (e) => {

        // DUPLICATE PRODUCTS ARRAY
        let newArray = restock;

        // FILTER THE PRODUCT WHICH JUST GOT UPDATED
        let product = newArray.filter(product => product._id === e.target.id)

        // FIND INDEX OF THE UPDATED PRODUCT
        let index = newArray.indexOf(product[0])

        // CHANGE VALUE OF CHANGED FIELD
        product[0] = {
            ...product[0],
            [e.target.name]: e.target.value
        }

        newArray[index] = product[0]

        setRestock(newArray)

    }

    const handleSubmit = (id) => {
        props.updateRestock(id, restock)
        let inputs = document.getElementsByClassName("unitupdate");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = 0;
        }
    }

    return (
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Restock Data</h5>
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
                                    <th>Incomming</th>
                                    <th><i className='bx bxs-check-circle text-success'></i> Accepted</th>
                                    <th><i className='bx bxs-x-circle text-warning' ></i> Canceled</th>
                                    <th><i className='bx bx-rotate-left text-danger'></i> Returned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.products && props.products.map(product => {
                                        return (
                                            <tr key={product._id}>
                                                <td><b>{product.sku}</b></td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <img alt="Product display pic" className="img-fluid" src={product.displayurl} />
                                                        </div>
                                                        <div className="col-9">
                                                            <p>{product.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{product.incomming}</td>
                                                <td>
                                                    <input placeholder="0" type="number" className="unitupdate form-control form-control-sm" id={product._id} name="recieved" onChange={handleChange} />
                                                </td>
                                                <td>
                                                    <input placeholder="0" type="number" className="unitupdate form-control form-control-sm" id={product._id} name="canceled" onChange={handleChange} />
                                                </td>
                                                <td>
                                                    <input placeholder="0" type="number" className="unitupdate form-control form-control-sm" id={product._id} name="returned" onChange={handleChange} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="btn btn-success btn-sm" onClick={() => handleSubmit(props.restockId)}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
