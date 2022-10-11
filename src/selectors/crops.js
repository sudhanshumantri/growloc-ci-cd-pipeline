import { createSelector } from 'reselect';
const selectCrop = state => state.get('crops');

export const selectCropList = () =>
    createSelector(
        selectCrop,
        services => services.toJS()['cropList']
    );
export const selectIsCropListLoading = () =>
    createSelector(
        selectCrop,
        services => services.toJS()['isCropListLoading']
    );
export const selectCropListError = () =>
    createSelector(
        selectCrop,
        services => services.toJS()['cropListError']
    );
