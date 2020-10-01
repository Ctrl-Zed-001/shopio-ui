import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import * as serviceWorker from "./serviceWorker"
import RootReducer from './Redux/RootReducer'
import thunk from "redux-thunk"

const store = createStore(RootReducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"))
serviceWorker.register()