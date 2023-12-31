import { call, all, put, takeLatest } from 'redux-saga/effects'
import {
  callFetchUsersList,
  callAddUser,
  callUpdateUser,
  callDeleteUser
} from '../utils/api'
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserSuccess,
  addUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure
} from '../actions/users'
import { addNotification } from '../components/shared/notification'
export function * fetchUsersList ({ data }) {
  const responseData = yield call(callFetchUsersList, data)
  if (responseData?.status === 200 && responseData.data.status) {
    yield put(fetchUsersSuccess(responseData.data.data))
  } else {
    yield put(fetchUsersFailure('Something went wrong'))
  }
}
export function * addUser ({ data }) {
  const responseData = yield call(callAddUser, data)
  if (responseData?.status === 200) {
    const { status } = responseData.data
    if (status) {
      yield put(addUserSuccess(responseData.data.data))
    } else {
      const errorMessage = responseData.data?.error
        ? responseData.data?.error
        : 'Something went wrong'
      addNotification(errorMessage, 5000, true, 'danger')
      yield put(addUserFailure('Something went wrong'))
    }
  } else {
    yield put(addUserFailure('Something went wrong'))
  }
}
export function * updateUser ({ data }) {
  const responseData = yield call(callUpdateUser, data)
  if (responseData?.status === 200) {
    yield put(updateUserSuccess(responseData.data))
  } else {
    yield put(updateUserFailure('Something went wrong'))
  }
}
export function * deleteUser ({ data }) {
  const responseData = yield call(callDeleteUser, data)
  if (responseData?.status === 200) {
    yield put(deleteUserSuccess(data))
  } else {
    yield put(deleteUserFailure('Something went wrong'))
  }
}
export function * userSagas () {
  yield all([
    takeLatest('FETCH_USERS_REQUEST', fetchUsersList),
    takeLatest('ADD_USER_REQUEST', addUser),
    takeLatest('DELETE_USER_REQUEST', deleteUser),
    takeLatest('UPDATE_USER_REQUEST', updateUser)
  ])
}
export default [userSagas]
