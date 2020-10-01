import React, { useState } from 'react'

export default function QuickAddUser(props) {

    const [field, setField] = useState({})

    const handleChange = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.quickAdd(field)
    }

    return (
        <div className="modal fade" id="quickAdd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Quick Add User</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" id="name" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="number" name="phone" className="form-control" id="phone" onChange={handleChange} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button data-dismiss="modal" type="submit" onClick={handleSubmit} className="btn btn-success btn-sm">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
