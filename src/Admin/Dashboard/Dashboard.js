import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrapper'
import Card from './dashwidgets/Card'
import MonthlySales from './dashwidgets/MonthlySales'
import DailyRevenue from "./dashwidgets/DailyRevenue"
import TopSelling from "./dashwidgets/TopSelling"
import Axios from "axios"
import { apiurl } from "../../Globals"

function Dashboard() {

    const [customerCount, setCustomerCount] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const [productCount, setProductCount] = useState(0)
    const [monthlySales, setMonthlySales] = useState(0)
    const [dailySales, setDailySales] = useState(0)
    const [compareSales, setCompareSales] = useState({})
    const [topSelling, setTopSelling] = useState([]);

    const getCustomerCount = Axios.get(`${apiurl}/report/customercount`);
    const getOrdersCount = Axios.get(`${apiurl}/report/ordercount`);
    const getRevenue = Axios.get(`${apiurl}/report/revenue`);
    const getProductCount = Axios.get(`${apiurl}/report/productCount`);
    const getMonthlySales = Axios.get(`${apiurl}/report/monthlysales`);
    const getDailySales = Axios.get(`${apiurl}/report/dailysales`);
    const getcompareSales = Axios.get(`${apiurl}/report/comparesales`);
    const getTopSelling = Axios.get(`${apiurl}/report/topselling`);

    useEffect(
        () => {
            Axios.all([getCustomerCount, getOrdersCount, getRevenue, getProductCount, getMonthlySales, getDailySales, getcompareSales, getTopSelling])
                .then(Axios.spread((...responses) => {
                    setCustomerCount(responses[0].data.count)
                    setOrderCount(responses[1].data.count)
                    setRevenue(responses[2].data.revenue)
                    setProductCount(responses[3].data.count)
                    setMonthlySales(responses[4].data)
                    setDailySales(responses[5].data)
                    setCompareSales(responses[6].data)
                    setTopSelling(responses[7].data)
                }))
                .catch(err => {
                    console.log(err.response)
                })
        }, []
    )
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <h5>Dashboard</h5>
                    <div className="row mt-4">


                        <div className="col-md-3 col-xs-12 mb-2">
                            <Card heading="Revenue This Month" icon="bx bx-rupee" data={revenue} />
                        </div>
                        <div className="col-md-3 col-xs-12 mb-2">
                            <Card heading="Orders This Month" icon="bx bxs-inbox" data={orderCount} />
                        </div>


                        <div className="col-md-3 col-xs-12 mb-2">
                            <Card heading="Customers" icon="bx bx-user" data={customerCount} />
                        </div>
                        <div className="col-md-3 col-xs-12 mb-2">
                            <Card heading="Available Product" icon="bx bx-layer" data={productCount} />
                        </div>



                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6 mb-2">
                            <MonthlySales data={monthlySales} />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <DailyRevenue data={dailySales} compare={compareSales} />
                        </div>
                        {/* <div className="col-6">
                            <CategorySales />
                        </div> */}
                    </div>

                    <div className="row mt-4">
                        <div className="col">
                            <TopSelling data={topSelling} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Wrapper(Dashboard)