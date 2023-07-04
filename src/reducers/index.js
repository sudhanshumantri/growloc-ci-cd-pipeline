import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'
const baseReducer = (state = {}) => state
export default function createReducer (asyncReducers) {
  return combineReducers({
    baseReducer,
    ...asyncReducers,
    router: routerReducer
  })
}
