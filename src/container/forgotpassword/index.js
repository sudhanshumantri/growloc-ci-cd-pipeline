import React from 'react';
import { connect } from 'react-redux';
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { selectisLoading, selecisSucess } from '../../selectors/register'
import { forgotPasswordRequest } from '../../actions/login';

const mapStateToProps = createStructuredSelector({
    isLoading: selectisLoading(),
    isSuccess: selecisSucess(),
})

const mapDispatchToProps = {
    forgotPassword: forgotPasswordRequest
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
export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Register);

