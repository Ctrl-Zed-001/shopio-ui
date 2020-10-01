import React, { Component } from 'react'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'



const Wrapper = WrappedComponents => {

    return class extends Component {
        render() {
            return (
                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />
                    <WrappedComponents {...this.props} />
                </div>
            )
        }
    }

}


export default Wrapper