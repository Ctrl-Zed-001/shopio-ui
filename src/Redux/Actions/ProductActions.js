import Axios from 'axios'
import { apiurl } from "../../Globals"

export const getAll = () => {
    return (dispatch, getState) => {
        Axios.get(`${apiurl}/products/getall`)
            .then(res => {
                dispatch({ type: "GETALLPRODUCTS", payload: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addNewProduct = (product) => {
    return {
        type: "ADDNEWPRODUCT",
        payload: product
    }
}

export const getAllCategories = () => {
    return (dispatch, getState) => {
        Axios.get(`${apiurl}/products/category/all`)
            .then(res => {
                dispatch({ type: "GETALLCATEGORIES", payload: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addNewCategory = (newCategory) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/products/category/add`, newCategory)
            .then(res => {
                dispatch({ type: "ADDNEWCATEGORY", payload: newCategory })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getAllBrands = () => {
    return (dispatch, getState) => {
        Axios.get(`${apiurl}/products/brands/all`)
            .then(res => {
                dispatch({ type: "GETALLBRANDS", payload: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addNewBrand = (newBrand) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/products/brands/add`, newBrand)
            .then(res => {
                dispatch({ type: "ADDNEWBRAND", payload: newBrand })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const changeStatus = (id) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/products/publish`, { id })
            .then(res => {
                dispatch({ type: "CHANGESTATUS" })
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
}

export const updateStock = (id, field, newstock) => {
    return (dispatch, getState) => {
        Axios.post(`${apiurl}/products/stock/update`, { id, field, newstock })
            .then(res => {
                dispatch({ type: "UPDATESTOCK", payload: res.data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}
