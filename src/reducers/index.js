import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux'

const baseReducer = (state = {}) => state;
/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    baseReducer,
    ...asyncReducers,
    router: routerReducer
  });
}
