
const initState = {
    allOrders: [],
    newCart: {}
}

const CartReducer = (state = initState, action) => {
    switch (action.type) {
        case "ALLORDERS":
            return {
                ...state,
                allOrders: action.payload
            }
        case "NEWCART":
            return {
                ...state,
                newCart: action.payload
            };
        case "PLACEORDER":
            let orderList = state.allOrders;
            orderList.push(action.payload)
            return {
                ...state,
                newCart: {},
                allOrders: [
                    ...orderList
                ]
            }
        default:
            return state
    }
}

export default CartReducer