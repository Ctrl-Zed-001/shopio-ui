import Axios from "axios"
import { apiurl } from "../../Globals"

export const getAllUsers = () => {
    return (dispatch, getState) => {
        Axios.get(`${apiurl}/users/all`)
            .then(res => {
                dispatch({ type: "GETALLUSERS", payload: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addNewUser = (data) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/users/create`, data)
            .then(res => {
                dispatch({ type: "ADDNEWUSER", payload: res.data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}