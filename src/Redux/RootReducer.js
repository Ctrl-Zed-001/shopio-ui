import { combineReducers } from 'redux'
import ThemeReducer from './Reducers/ThemeReducer'
import ProductReducer from "./Reducers/ProductsReducer"
import UserReducer from "./Reducers/UserReducer"
import VendorReducer from "./Reducers/VendorReducer"
import RestockReducer from "./Reducers/RestockReducer"
import OrderReducer from "./Reducers/OrderReducer"

const RootReducer = combineReducers({
    theme: ThemeReducer,
    products: ProductReducer,
    users: UserReducer,
    vendors: VendorReducer,
    restocks: RestockReducer,
    orders: OrderReducer
})
export default RootReducer