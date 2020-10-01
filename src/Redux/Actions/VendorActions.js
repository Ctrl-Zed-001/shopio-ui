import Axios from "axios"
import { apiurl } from "../../Globals"

export const getAllVendors = () => {
    return (dispatch, getState) => {
        Axios.get(`${apiurl}/vendor/getall`)
            .then(res => {
                dispatch({ type: "GETALLVENDORS", payload: res.data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}

export const addNewVendor = (data) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/vendor/addnew`, data)
            .then(res => {
                dispatch({ type: "ADDNEWVENDOR", payload: res.data })
            })
            .catch(err => {
                console.log(err.response)
            })

    }
}