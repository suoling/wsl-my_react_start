import React, { PureComponent } from 'react';
import style from './index.css'
import imgTest from 'images/wsl.jpg'

export default class Page extends PureComponent {
    render () {
        return (
            <div className={style['page-box']}>
                <div>this is page</div>
                <img className={style['img-test']} src={imgTest}/>
            </div>
        )
    }
}