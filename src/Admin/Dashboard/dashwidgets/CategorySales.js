import React from 'react'
import { Doughnut } from "react-chartjs-2"

export default function CategorySales() {

    let randomColor = [];

    for (var i = 0; i <= 3; i++) {
        randomColor.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    }

    const data = {
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ],
        datasets: [{
            data: [12, 19, 3],
            backgroundColor: [...randomColor],
            borderWidth: 1,
            weight: 1
        }]
    }
    const options = {
        maintainAspectRatio: true,
        scales: {

            xAxes: [{
                ticks: {
                    display: false
                },
                gridLines: {
                    display: false,

                }
            }],
            yAxes: [{
                ticks: {
                    display: false
                },
                gridLines: {
                    display: false,
                }
            }]
        }
    }
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body">
                <h3 className="card-title">Revenue By Category</h3>
                <Doughnut
                    data={data}
                    width={100}
                    height={97}
                    options={options}
                />
            </div>
        </div>
    )
}
