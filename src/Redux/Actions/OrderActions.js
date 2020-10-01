import Axios from "axios"
import { apiurl } from "../../Globals"

export const getAllOrders = () => {
    return (dispatch, getState) => {
        Axios.get(`${apiurl}/order/all`)
            .then(orders => {
                dispatch({ type: "ALLORDERS", payload: orders.data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}

export const newCart = (orderDetails) => {
    return {
        type: "NEWCART",
        payload: orderDetails
    }
}

export const placeOrder = (neworder) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/order/new`, neworder)
            .then(res => {
                dispatch({ type: "PLACEORDER", payload: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
}
