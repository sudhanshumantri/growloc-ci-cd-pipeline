import { createSelector } from 'reselect';
const selectCrop = state => state.get('cropList');

export const selectCropList = () =>
    createSelector(
        selectCrop,
        services => services && services.toJS()['cropList']
    );
export const selectIsCropListLoading = () =>
    createSelector(
        selectCrop,
        services => services && services.toJS()['isCropListLoading']
    );
export const selectCropListError = () =>
    createSelector(
        // selectCrop,
        services => services && services.toJS()['cropListError']
    );
