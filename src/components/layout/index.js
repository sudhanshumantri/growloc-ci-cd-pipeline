import React from 'react'
import store from '../../store'
import { getAsyncInjectors } from '../../utils/asyncInjectors'
import loginReducer from '../../reducers/login'
import usersReducer from '../../reducers/users'
import userSagas from '../../sagas/users'
import Adminlayout from './adminlayout'
import Userlayout from './userlayout'
import { selectToken } from '../../selectors/login'
import { loadAuthToken } from '../../actions/login'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
const { injectReducer, injectSagas } = getAsyncInjectors(store)
injectReducer('login', loginReducer)
injectReducer('users', usersReducer)
injectSagas(userSagas)
// injectSagas(loginSagas);

const Layout = ({ loadAuthToken }) => {
  // let loginObject = localStorage.getItem("AUTH_OBJECT");
  // if (loginObject) {
  //   loginObject = JSON.parse(loginObject);
  // }
  const token = localStorage.getItem('AUTH_TOKEN')
  let loginObject = localStorage.getItem('AUTH_OBJECT')
  if (loginObject) {
    loginObject = JSON.parse(loginObject)
  }
  loadAuthToken({
    token,
    loginObject
  })
  const { profile } = loginObject || ''
  console.log(profile, 'profile')

  return <>{profile?.role === 'admin' ? <Adminlayout /> : <Userlayout />}</>
}
const mapDispatchToProps = {
  loadAuthToken
}
const mapStateToProps = createStructuredSelector({
  token: selectToken()
})
function withRouter (Component) {
  function ComponentWithRouterProp (props) {
    return <Component {...props} />
  }
  return ComponentWithRouterProp
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))

// export default withRouter(Layout);
