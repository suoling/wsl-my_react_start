import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counter from 'reducers/counter';
import userInfo  from 'reducers/userInfo';

// 使用redux提供的applyMiddleware方法来启动redux-thunk中间件，使actions支持异步函数。
const store = createStore(combineReducers({ counter, userInfo }), applyMiddleware(thunk))

export default store

// store的具体功能介绍：
// 维持应用的 state；
// 提供 getState() 方法获取 state；
// 提供 dispatch(action) 触发reducers方法更新 state；
// 通过 subscribe(listener) 注册监听器;
// 通过 subscribe(listener) 返回的函数注销监听器。

// 梳理一下redux的工作流：
// 调用store.dispatch(action)提交action。
// redux store调用传入的reducer函数。把当前的state和action传进去。
// 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
// Redux store 保存了根 reducer 返回的完整 state 树。

