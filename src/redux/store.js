import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counter from 'reducers/counter';
import userInfo  from 'reducers/userInfo';

const store = createStore(combineReducers({ counter, userInfo }), applyMiddleware(thunk))

export default store

