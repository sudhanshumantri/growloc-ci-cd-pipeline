import { createSelector } from 'reselect';
const selectProfile = state => state.get('profile');

export const selectUserProfile = () =>
    createSelector(
        selectProfile,
        services => services.toJS()['profileInfo']
    );
export const selectIsLoading = () =>
    createSelector(
        selectProfile,
        services => services.toJS()['isLoading']
    );
export const selectIsError = () =>
    createSelector(
        selectProfile,
        services => services.toJS()['error']
    );
export const selectIsSuccess = () =>
    createSelector(
        selectProfile,
        services => services.toJS()['isSucess']
    );
