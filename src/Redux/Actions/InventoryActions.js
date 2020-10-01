import Axios from "axios"
import { apiurl } from "../../Globals"

export const updateStock = (id, newstock) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/inventory/updatestock`, { id, newstock })
            .then(res => {
                dispatch({ type: "UPDATESTOCK", payload: res.data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}