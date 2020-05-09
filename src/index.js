import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Nav from 'components/Nav'
import getRouter from 'router'
import { Provider } from 'react-redux'
import store from './redux/store'
import '../mock/mock.js'

ReactDom.render(
    <Provider store={store}>
        <Router>
            <Nav />
            {getRouter()}
        </Router>
    </Provider>,
     document.getElementById('app')
)

// Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。