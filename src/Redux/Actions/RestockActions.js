import Axios from "axios"
import { apiurl } from "../../Globals"

export const getAllRestocks = () => {
    return (dispatch, getState) => {
        Axios.get(`${apiurl}/restock/getAll`)
            .then(res => {
                let allRestocks = res.data;
                allRestocks.map(restock => {
                    let recievedP = 0;
                    let canceledP = 0;
                    let returnedP = 0;
                    let incomming = 0;
                    restock.products.map(product => {
                        recievedP = recievedP + product.recieved;
                        canceledP = canceledP + product.canceled;
                        returnedP = returnedP + product.returned;
                        incomming = incomming + product.incomming
                    })
                    restock.recievedP = ((recievedP / incomming) * 100).toFixed(0);
                    restock.canceledP = ((canceledP / incomming) * 100).toFixed(0)
                    restock.returnedP = ((returnedP / incomming) * 100).toFixed(0)

                })
                dispatch({ type: "GETALLRESTOCK", payload: allRestocks })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}

export const addNewRestock = (newRestock) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/restock/addNew`, newRestock)
            .then(res => {
                dispatch({ type: "ADDNEWRESTOCK", payload: res.data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}

export const updateRestockData = (restockindex, id, data) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/restock/update`, { id, data })
            .then(res => {
                let newRestock = res.data;
                let recievedP = 0;
                let canceledP = 0;
                let returnedP = 0;
                let totalIncomming = 0;
                newRestock.products.map(product => {
                    recievedP = recievedP + product.recieved;
                    canceledP = canceledP + product.canceled;
                    returnedP = returnedP + product.returned;
                    totalIncomming = totalIncomming + product.incomming;
                })

                recievedP = ((recievedP / totalIncomming) * 100).toFixed(0)
                canceledP = ((canceledP / totalIncomming) * 100).toFixed(0)
                returnedP = ((returnedP / totalIncomming) * 100).toFixed(0)

                dispatch({ type: "UPDATERESTOCK", payload: { restockindex, data: res.data, recievedP, returnedP, canceledP } })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}