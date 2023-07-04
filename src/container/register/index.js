import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Register from '../../components/register'
import { registerRequest } from '../../actions/register'
import { selectisLoading, selecisSucess } from '../../selectors/register'

const mapStateToProps = createStructuredSelector({
  isLoading: selectisLoading(),
  isSuccess: selecisSucess()
})

const mapDispatchToProps = {
  registerRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
