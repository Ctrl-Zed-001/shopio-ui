const initState = {
    allProducts: [],
    selectedProduct: {},
    categories: [],
    brands: []
}

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case "GETALLPRODUCTS":
            return {
                ...state,
                allProducts: action.payload
            }
        case "ADDNEWPRODUCT":
            let newProductList = state.allProducts;
            newProductList.push(action.payload)
            return {
                ...state,
                allProducts: newProductList
            }
        case "GETALLCATEGORIES":
            return {
                ...state,
                categories: action.payload
            }
        case "ADDNEWCATEGORY":
            return {
                ...state,
                categories: [
                    ...state.categories,
                    action.payload
                ]
            }
        case "GETALLBRANDS":
            return {
                ...state,
                brands: action.payload
            }
        case "ADDNEWBRAND":
            return {
                ...state,
                brands: [
                    ...state.brands,
                    action.payload
                ]
            }
        case "CHANGESTATUS":
            return {
                ...state
                // THIS WONT CHANGE THE STATUS IN THE DETAIL VIEW..NEED TO UPDATE THE PRODUCT IN STATE
            }
        case "UPDATESTOCK":
            var newProducts = state.allProducts;
            var oldProduct = state.allProducts.filter(product => {
                return product.sku === action.payload.sku
            })
            var index = state.allProducts.indexOf(oldProduct[0])
            newProducts[index] = action.payload;
            return {
                ...state,
                allProducts: newProducts
            }
        default:
            return state;
    }
}
export default ProductReducer