import React, { PureComponent } from 'react';
import style from './index.css'
import imgTest from 'images/wsl.jpg'

export default class Page extends PureComponent {
    render () {
        return (
            // 重启webpack后打开控制台，发现class样式变成了class="page-box--1wbxe
            <div className={style['page-box']}>
                <div>this is page</div>
                <img className={style['img-test']} src={imgTest}/>
            </div>
        )
    }
}