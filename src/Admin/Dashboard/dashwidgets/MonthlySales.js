import React from 'react'
import { Bar } from 'react-chartjs-2';

export default function MonthlySales(props) {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: "Sales Per Month",
            data: props.data,
            backgroundColor: "#2B3143",
            borderColor: "#2B3143",
            borderWidth: 2,
            barThickness: 5
        }]
    }
    const options = {
        maintainAspectRatio: false,
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
                <Bar
                    data={data}
                    width={100}
                    height={400}
                    options={options}
                />
            </div>
        </div>
    )
}
