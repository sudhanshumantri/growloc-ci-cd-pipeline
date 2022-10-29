import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchUsersRequest,addUserRequest,deleteUserRequest, updateUserRequest } from "../../actions/users";
import ManageUsers from "../../components/users/manageuser";
import {
    selectUsersList,
    selectIsUsersListLoading,
    selectUsersListError,
    selectIsAddUserLoading,
    selectAddUserError,
    selectIsDeleteUserLoading,
    selectIsUpdateUserLoading
} from "../../selectors/users";

const mapStateToProps = createStructuredSelector({
    usersList: selectUsersList(),
    isUsersListLoading: selectIsUsersListLoading(),
    UsersListError: selectUsersListError(),
    isAddUserLoading:selectIsAddUserLoading(),
    addUserError:selectAddUserError(),
    isdeleteUserLoading:selectIsDeleteUserLoading(),
    updateUserLoading :selectIsUpdateUserLoading(),
});
const mapDispatchToProps = {
  fetchUsers: fetchUsersRequest,
  addUser:addUserRequest,
  updateUser: updateUserRequest,
  deleteUser:deleteUserRequest,
};
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    let params = useParams();
    // return React.createElement(Component, {...props, router:{ location, navigate, params }})
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageUsers)
);
