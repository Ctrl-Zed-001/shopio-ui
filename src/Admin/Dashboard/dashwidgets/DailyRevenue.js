import React from 'react'
import { Line } from "react-chartjs-2"

export default function WeeklyRevenue(props) {
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        datasets: [{
            label: "Sales this Month",
            data: props.data,
            backgroundColor: "white",
            borderColor: "#39AFD1"
        }]
    }
    const options = {
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,

                }
            }],
            yAxes: [{
                gridLines: {
                    display: false,
                    color: "#F1F3FA",
                    offsetGridLines: true
                }
            }]
        }
    }
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body">
                <h4 className="card-title">Daily Revenue</h4>

                <div className="row text-center mb-4 mt-3">
                    <div className="col-md-6 bg-light text-dark">
                        <p className="mb-0 mt-3">Today</p>
                        <h2 className="font-weight-normal mb-3">
                            <small className="bx bxs-circle font-size-12 text-info align-middle mr-1"></small>
                            <span><i className="bx bx-rupee"></i>{props.compare.today}</span>
                        </h2>
                    </div>
                    <div className="col-md-6 bg-light text-dark">
                        <p className="mb-0 mt-3">Yesterday</p>
                        <h2 className="font-weight-normal mb-3">
                            <small className="bx bxs-circle font-size-12 text-warning align-middle mr-1"></small>
                            <span><i className="bx bx-rupee"></i>{props.compare.yesterday}</span>
                        </h2>
                    </div>
                </div>

                <Line
                    data={data}
                    width={100}
                    height={55}
                    options={options}
                />

            </div>
        </div>
    )
}
