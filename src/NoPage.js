import React from 'react'
import { Link } from "react-router-dom"

const NoPage = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="text-center">
                        <img src="/404.svg" className="img-fluid" alt="File not found Image" />
                        <p className="text-muted mt-3">It's looking like you may have taken a wrong turn. Don't worry... it
                        happens to the best of us. Here's a
                                        little tip that might help you get back on track.</p>

                        <Link className="btn btn-custom mt-3 text-white" to="/"><i className="mdi mdi-reply"></i> Return Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoPage
