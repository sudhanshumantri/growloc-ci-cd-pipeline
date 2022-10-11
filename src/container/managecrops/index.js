import React from 'react';
import { connect } from 'react-redux';

import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { fetchCropRequest} from '../../actions/crops';
import ManageCrop from '../../components/crop/managecorp';
import {
    selectCropList,
    selectIsCropListLoading,
    selectCropListError
} from '../../selectors/crops';

const mapStateToProps = createStructuredSelector({
    cropList: selectCropList(),
    isCropListLoading: selectIsCropListLoading(),
    cropListError:selectCropListError(),

});
const mapDispatchToProps = {
    fetchCrop: fetchCropRequest,
}
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        // return React.createElement(Component, {...props, router:{ location, navigate, params }})
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
    )(ManageCrop)
);