/**
 * Create the store with asynchronously loaded reducers
 */
 import { applyMiddleware, createStore, compose } from 'redux';
 import createSagaMiddleware from 'redux-saga';
 import { routerMiddleware } from 'react-router-redux';
 import { createHashHistory } from 'history';
 import { fromJS } from 'immutable';
 import createReducer from '../reducers';
 
 const sagaMiddleware = createSagaMiddleware();
 export let  browserHistory = createHashHistory();
 
 // Create the store with the middlewares
 // 1. sagaMiddleware: Makes redux-sagas work
 const enhancers = [];
 const middlewares = [sagaMiddleware, routerMiddleware(browserHistory)];
 if (process.env.NODE_ENV === 'development') {
     const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
 
     if (typeof devToolsExtension === 'function') {
         enhancers.push(devToolsExtension());
     }
 }
 const composedEnhancers = compose(
     applyMiddleware(...middlewares),
     ...enhancers
 );
 const store = createStore(createReducer(), fromJS({}), composedEnhancers);
 
 store.runSaga = sagaMiddleware.run;
 store.asyncReducers = {}; // Async reducer registry
 export default store;
 