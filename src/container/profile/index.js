import React from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import ProfileInformation from '../../components/profileinformation'
import { selectLoginObject } from '../../selectors/login'
import {
  selectIsLoading,
  selectUserProfile,
  selectIsError,
  selectIsSuccess
} from '../../selectors/profile'
import {
  fetchUserProfileRequest,
  updateUserProfileRequest,
  updateUserPhoneOrPasswordRequest,
  updateUserNewPasswordRequest
} from '../../actions/profile'
import { logout } from '../../actions/login'
const mapStateToProps = createStructuredSelector({
  loginObject: selectLoginObject(),
  isLoading: selectIsLoading(),
  userProfile: selectUserProfile(),
  isError: selectIsError(),
  isSuccess: selectIsSuccess()
})
const mapDispatchToProps = {
  fetchUserProfile: fetchUserProfileRequest,
  updateUserProfile: updateUserProfileRequest,
  updateUserPhone: updateUserPhoneOrPasswordRequest,
  updateNewPassword: updateUserNewPasswordRequest,
  logout
}
function withRouter (Component) {
  function ComponentWithRouterProp (props) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    return <Component {...props} router={{ location, navigate, params }} />
  }
  return ComponentWithRouterProp
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileInformation)
)
