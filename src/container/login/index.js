import React from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { loginRequest } from '../../actions/login'
import {
  isLoginLoading,
  isLoginSuccess,
  isLoginError,
  selectToken
} from '../../selectors/login'
import Login from '../../components/login'
const mapStateToProps = createStructuredSelector({
  isLoginRequested: isLoginLoading(),
  isLoginSuccess: isLoginSuccess(),
  isLoginError: isLoginError(),
  token: selectToken()
})
const mapDispatchToProps = {
  loginRequest
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
