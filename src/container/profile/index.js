import React from 'react';
import { connect } from 'react-redux';

import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

import { createStructuredSelector } from 'reselect';
import Account from '../../component/account';
import ProfileInformation from '../../components/profileinformation'
import { selectLoginObject } from '../../selectors/login';
import { selectIsLoading, selectUserProfile, selectIsError, selectIsSuccess } from '../../selectors/profile';
import { fetchUserProfileRequest, updateUserProfileRequest, updateUserPhoneOrPasswordRequest } from '../../actions/profile'
import { logout } from '../../actions/login';

const mapStateToProps = createStructuredSelector({
    loginObject: selectLoginObject(),
    isLoading: selectIsLoading(),
    userProfile: selectUserProfile(),
    isError: selectIsError(),
    isSuccess: selectIsSuccess(),
});
const mapDispatchToProps = {
    fetchUserProfile: fetchUserProfileRequest,
    updateUserProfile: updateUserProfileRequest,
    updateUserPhoneOrPassword: updateUserPhoneOrPasswordRequest,
    logout: logout,
    }
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProfileInformation)
);