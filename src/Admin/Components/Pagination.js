import React from 'react'

const Pagination = (props) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${props.page === 0 ? "disabled" : ""}`}>
                        <button onClick={props.prevPage} className="page-link">Prev</button>
                    </li>
                    <li className={`page-item ${props.page >= props.allData.length ? "disabled" : ""}`}>
                        <button onClick={props.nextPage} className="page-link">Next</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Pagination
