import React from 'react'

export default function Breadcrumb(props) {
    return (
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">{props.title}</h4>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">{props.parent}</li>
                            <li className="breadcrumb-item active">{props.subtitle}</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
    )
}
