import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './Admin/Authentication/Login'
import Signup from './Admin/Authentication/Signup'
import Dashboard from './Admin/Dashboard/Dashboard'
import AllProducts from './Admin/Products/AllProducts'
import ProductDetail from './Admin/Products/ProductDetail'
import Categories from './Admin/Categories/Categories'
import Users from "./Admin/Users/Users"
import AddProduct from './Admin/Products/AddEditProduct/AddProduct'
import Brands from './Admin/Brands/Brands'
import Inventory from './Admin/Inventory/Inventory'
import Vendors from './Admin/Vendors/Vendors'
import Restock from './Admin/Restock/Restock'
import AddRestock from './Admin/Restock/AddRestock'
import UserDetails from './Admin/Users/UserDetails'
import Pos from "./Admin/Pos/Pos"
import Checkout from './Admin/Pos/Checkout'
import OrderList from './Admin/Orders/OrderList'
import OrderDetail from './Admin/Orders/OrderDetail'
import EditProduct from './Admin/Products/AddEditProduct/EditProduct'
import NoPage from "./NoPage"

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/admin" component={Login} exact />
                <Route path="/admin/signup" component={Signup} exact />
                <Route path="/admin/dashboard" component={Dashboard} exact />
                <Route path="/admin/product/all" component={AllProducts} exact />
                <Route path="/admin/product/single/:id" component={ProductDetail} exact />
                <Route path="/admin/product/categories" component={Categories} exact />
                <Route path="/admin/product/add" component={AddProduct} exact />
                <Route path="/admin/product/brands" component={Brands} exact />
                <Route path="/admin/inventory" component={Inventory} exact />
                <Route path="/admin/vendors" component={Vendors} exact />
                <Route path="/admin/restock" component={Restock} exact />
                <Route path="/admin/restock/add" component={AddRestock} exact />
                <Route path="/admin/user/all" component={Users} exact />
                <Route path="/admin/user/:id" component={UserDetails} exact />
                <Route path="/admin/pos/cart" component={Pos} exact />
                <Route path="/admin/pos/checkout" component={Checkout} exact />
                <Route path="/admin/order/all" component={OrderList} />
                <Route path="/admin/order/:orderid" component={OrderDetail} />
                <Route path="/admin/product/:id/edit" component={EditProduct} />
                <Route path="*" component={NoPage} />
            </Switch>
        </Router>
    )
}