import React from 'react';
import { connect } from 'react-redux';
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import Register from '../../components/register';
import { registerRequest } from '../../actions/register';
import { selectisLoading, selecisSucess } from '../../selectors/register'

const mapStateToProps = createStructuredSelector({
    isLoading: selectisLoading(),
    isSuccess: selecisSucess(),
})

const mapDispatchToProps = {
    registerRequest: registerRequest
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

