import { fromJS, List } from 'immutable';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE

} from '../actions/actionTypes'

const INITIAL_STATE = fromJS({
    isLoading: false,
    isSucess: false
});

export default function loginReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return state
                .set('isLoading', true)
                .set('isSucess', false)
        case REGISTER_SUCCESS:
            return state.set('isSucess', true)
                .set('isLoading', false)
        case REGISTER_FAILURE:
            return state
                .set('isSucess', false)
                .set('isLoading', false)
        /////check for this.. 
        default:
            return state;

    }
}