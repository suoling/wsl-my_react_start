import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div>
            <ul>
                <li><Link to="/">home</Link></li>
                <li><Link to="/page">page</Link></li>
                <li><Link to="/counter">counter</Link></li>
                <li><Link to="/userinfo">userInfo</Link></li>
            </ul>
        </div>
    )
}