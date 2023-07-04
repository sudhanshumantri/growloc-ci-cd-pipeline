import React from 'react'
import { connect } from 'react-redux'
import SideBar from '../../components/shared/sidebar'
import { logout } from '../../actions/login'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
const mapStateToProps = null
const mapDispatchToProps = {
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
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
)
