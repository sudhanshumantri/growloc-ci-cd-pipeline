import React, { useMemo, useState } from "react";
import DataTable from "../../shared/dataTable";
import ConfirmDialogBox from "../../shared/dailog/ConfirmDialogBox";
import PageHeader from "../../shared/page-header";
import { useParams } from "react-router-dom";
import Loader from "../../shared/loader";
import AddUsersModal from "../adduser";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";

export default function ManageUsers({
  usersList,
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  isAddUserLoading,
  isUsersListLoading,
  isdeleteUserLoading,
  isUpdateUserLoading,
}) {
  let { farmId } = useParams();
  const [open, setOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userLat, setUserLat] = useState();
  const [userLong, setUserLong] = useState();

  const handleEdit = (userData) => {
    const { user, userId } = userData;
    const { profile } = user;
    const userDetails = {
      name: profile.name,
      // password: user.password,
      phone: profile.phone,
      role: profile.role || "farmmanager",
      isEditMode: true,
      userId,
    };
    setUserInfo(userDetails);
    setOpen(true);
  };
  const handleDelete = (userData) => {
    const { userId, user } = userData;
    const userDetails = { userId, name: user.profile.name };
    setUserInfo(userDetails);
    setIsDeleteModelOpen(true);
  };
  const handleConfirmRemove = () => {
    const { userId } = userInfo;
    deleteUser({ userId });
    handleDeleteDialogueToggle();
  };
  const handleDeleteDialogueToggle = () => {
    setIsDeleteModelOpen(!isDeleteModelOpen);
    setUserInfo({});
  };
  const headers = [
    {
      label: "Name",
      key: "user.profile.name",
    },

    {
      label: "Mobile Number",
      key: "user.profile.phone",
    },
    {
      label: "Role",
      key: "user.profile.role",
    },
    {
      label: "Actons",
      isButton: true,
      buttonArray: [
        {
          label: "Edit",
          handler: handleEdit,
          type: "icon",
          icon: <CreateIcon />,
          color: "primary",
          isAuthRequired: true,
          from: "users",
          action: "edit",
        },
        {
          label: "Delete",
          handler: handleDelete,
          type: "icon",
          icon: <DeleteIcon aria-label="delete" />,
          isAuthRequired: true,
          from: "users",
          action: "delete",
          // color:'warning'
        },
      ],
    },
  ];
  let conFirmbuttons = [
    {
      label: "Cancel",
      handler: handleDeleteDialogueToggle,
      isLight: true,
    },
    {
      label: "Delete",
      handler: handleConfirmRemove,
    },
  ];
  const handleCropSave = (data) => {
    if (userInfo.isEditMode) {
      const payload = {
        userId: userInfo.userId,
        userInfo: {
          name: data.name,
          role: data.role,
        },
      };
      updateUser(payload);
    } else {
      addUser(data);
    }
    handleModalToggle();
  };
  const handleModalToggle = () => {
    setOpen(!open);
    setUserInfo({});
  };
  let buttonArray = [
    {
      label: "Add New",
      ICON: <AddIcon />,
      handler: handleModalToggle,
      isAuthRequired: true,
      from: "users",
      action: "create",
    },
  ];
  React.useEffect(() => {
    fetchUsers({ farmId });
  }, []);

  // let test = {lat: parseFloat(userLat), lng: parseFloat(userLong)}
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
      console.log(userLat, userLong);
    });
  }, []);

  // { userId: parseInt(userId) }
  return (
    <div>
      <PageHeader title="Users" buttonArray={buttonArray} />
      {isAddUserLoading && <Loader title="Adding User" />}
      {isUsersListLoading && <Loader title="Fetching Users" />}
      {isUpdateUserLoading && <Loader title="Updating User  " />}
      {isdeleteUserLoading && <Loader title="Deleting  User" />}
      {open && (
        <AddUsersModal
          open={open}
          handleSave={handleCropSave}
          handleClose={handleModalToggle}
          userDetails={userInfo}
          data={usersList}
        />
      )}
      {isDeleteModelOpen && (
        <ConfirmDialogBox
          dialogState={isDeleteModelOpen}
          buttonArray={conFirmbuttons}
          subHeading={`Are you sure to delete ${userInfo.name} ?`}
        />
      )}
      <DataTable data={{ headers: headers, rows: usersList || [] }} />
    </div>
  );
}
