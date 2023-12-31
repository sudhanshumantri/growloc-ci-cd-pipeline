import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  fetchCropsLifecycleDetailsRequest,
  cropsLifecycleTransitionRequest,
  updateCropToLifecycleParametersRequest,
  updateCropToLifecycleScheduleRequest,
  updateCropToLifecycleDetailsRequest
} from '../../actions/life-cycle'
import {
  getRecentZoneSensorDataRequest,
  addFarmDashboardZoneTaskRequest
} from '../../actions/zone'
import LifecycleDetails from '../../components/crop/life-cycle/lifeCycleDetails'
import { fetchUsersRequest } from '../../actions/users'
import { fetchFarmInventoryRequest } from '../../actions/inventory'
import { selectPusherData } from '../../selectors/pucher'
import { selectAllUserZoneSensor } from '../../selectors/dashboard'
import {
  selectRecentZoneSensorData,
  selectIsRecentZoneSensorDataLoading,
  selectIsFarmDashboardZoneTaskLoading
} from '../../selectors/zone'
import {
  selectLifecycleDetails,
  selectIsLifecycleDetailsLoading,
  selectLifecycleDetailsError,
  selectIsTransitionLoading,
  selectIsLifecycleParametersLoading,
  selectIsUpdateLifeCycleDetailsLoading,
  selectIsUpdateLifeCycleDetailsError,
  selectIsUpdateLifecycleStageScheduleRequested
} from '../../selectors/life-cycle'
import { selectUsersList } from '../../selectors/users'
import { selectFarmInventoryList } from '../../selectors/inventory'
import { selectLoginObject } from '../../selectors/login'
const mapStateToProps = createStructuredSelector({
  lifecycleDetails: selectLifecycleDetails(),
  isLifecycleDetailsLoading: selectIsLifecycleDetailsLoading(),
  lifecycleDetailsError: selectLifecycleDetailsError(),
  isTransitionLoading: selectIsTransitionLoading(),
  isAddLifecycleParametersLoading: selectIsLifecycleParametersLoading(),
  usersList: selectUsersList(),
  farmInventoryList: selectFarmInventoryList(),
  loginObject: selectLoginObject(),
  allUserZoneSensorList: selectAllUserZoneSensor(),
  pusherData: selectPusherData(),
  recentZoneSensorData: selectRecentZoneSensorData(),
  isRecentZoneSensorDataLoading: selectIsRecentZoneSensorDataLoading(),
  recentZoneSensorDataLoadingError: selectIsRecentZoneSensorDataLoading(),
  isFarmDashboardZoneTaskLoading: selectIsFarmDashboardZoneTaskLoading(),
  isUpdateLifeCycleDetailsLoading: selectIsUpdateLifeCycleDetailsLoading(),
  isUpdateLifeCycleDetailsError: selectIsUpdateLifeCycleDetailsError(),
  isUpdateLifecycleStageScheduleRequested:
    selectIsUpdateLifecycleStageScheduleRequested()
})
const mapDispatchToProps = {
  fetchCropsLifecycleDetails: fetchCropsLifecycleDetailsRequest,
  cropsLifecycleTransition: cropsLifecycleTransitionRequest,
  addCropToLifecycleParameters: updateCropToLifecycleParametersRequest,
  updateCropToLifecycleSchedule: updateCropToLifecycleScheduleRequest,
  fetchUsers: fetchUsersRequest,
  fetchFarmInventory: fetchFarmInventoryRequest,
  addFarmDashboardZoneTask: addFarmDashboardZoneTaskRequest,
  fetchRecentZoneSensorData: getRecentZoneSensorDataRequest,
  updateCropToLifecycleDetails: updateCropToLifecycleDetailsRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(LifecycleDetails)
