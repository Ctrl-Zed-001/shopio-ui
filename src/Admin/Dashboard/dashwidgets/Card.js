import React from 'react'

export default function Card(props) {
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
                <div className="float-right">
                    <i className="mdi mdi-account-multiple widget-icon"></i>
                </div>
                <h5 className="text-muted font-size-14 mt-0" title="Number of Customers">{props.heading}</h5>
                <h3 className="mt-4 mb-4 text-dark"><i className={props.icon}></i> {props.data}</h3>
                {/* {
                    props.display ?
                        <p className="mb-0 text-secondary">
                            <span className="text-success mr-2"><i className={`bx bxs-${props.arrow}-arrow-alt`}></i> {props.percent}%</span><br />
                            <span className="text-nowrap">Since last month</span>
                        </p> :
                        ""
                } */}
            </div>
        </div>
    )
}
