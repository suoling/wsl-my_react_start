import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from 'components/Loading'
import loadable from 'react-loadable'

const Home = loadable({
    loader: () => import('pages/home'),
    loading: Loading,
    timeout: 10000
})

const Page = loadable({
    loader: () => import('pages/page'),
    loading: Loading,
    timeout: 10000
})

const Counter = loadable({
    loader: () => import('pages/counter'),
    loading: Loading,
    timeout: 10000
})

const NotFound = loadable({
    loader: () => import('pages/notfound'),
    loading: Loading,
    timeout: 10000
})

const UserInfo = loadable({
    loader: () => import('pages/userInfo'),
    loading: Loading,
    timeout: 10000
})

const getRouter = () => (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/page' component={Page}></Route>
        <Route path='/counter' component={Counter}></Route>
        <Route path="/userinfo" component={UserInfo}/>
        <Route component={NotFound}></Route>
    </Switch>
)

export default getRouter