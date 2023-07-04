import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectisLoading, selecisSucess } from '../../selectors/register'
import { forgotPasswordRequest } from '../../actions/login'

const mapStateToProps = createStructuredSelector({
  isLoading: selectisLoading(),
  isSuccess: selecisSucess()
})

const mapDispatchToProps = {
  forgotPassword: forgotPasswordRequest
}

// function withRouter (Component) {
//   function ComponentWithRouterProp (props) {
//     const location = useLocation()
//     const navigate = useNavigate()
//     const params = useParams()
//     return <Component {...props} router={{ location, navigate, params }} />
//   }
//   return ComponentWithRouterProp
// }
export default connect(mapStateToProps, mapDispatchToProps)(forgotPasswordRequest)
