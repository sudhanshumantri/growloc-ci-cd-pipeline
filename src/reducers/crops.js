import { fromJS, List } from 'immutable';
import {
    FETCH_ALL_CROP_REQUEST,
    FETCH_ALL_CROP_SUCCESS,
    FETCH_ALL_CROP_FAILURE
} from '../actions/actionTypes';

const INITIAL_STATE = fromJS({
    isCropListLoading: true,
    cropList: [],
    cropListError: null,

});
export default function cropsReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case FETCH_ALL_CROP_REQUEST:
            return state
                .set('isCropListLoading', true)
                .set('cropList', [])
                .set('cropListError', null)
        case FETCH_ALL_CROP_SUCCESS:
            return state
                .set('isCropListLoading', false)
                .set('cropList', action.data)
                .set('cropListError', null)
        case FETCH_ALL_CROP_FAILURE:
            return state
                .set('isCropListLoading', false)
                .set('cropList', [])
                .set('cropListError', action.error)

}
}