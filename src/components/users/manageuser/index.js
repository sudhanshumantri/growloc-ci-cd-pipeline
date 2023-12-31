import React, { useState, useEffect } from 'react'
import DataTable from '../../shared/dataTable'
import ConfirmDialogBox from '../../shared/dailog/ConfirmDialogBox'
import PageHeader from '../../shared/page-header'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../../shared/loader'
import AddUsersModal from '../adduser'
import AddIcon from '@mui/icons-material/Add'
import { Grid } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

export default function ManageUsers ({
  usersList,
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  isAddUserLoading,
  isUsersListLoading,
  isdeleteUserLoading,
  isUpdateUserLoading
}) {
  const farmId = useParams()
  const [open, setOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [userLat, setUserLat] = useState(null)
  const [userLong, setUserLong] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers(farmId)
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLat(position.coords.latitude)
      setUserLong(position.coords.longitude)
    })
  }, [])

  console.log(userLat, userLong)

  const handleEdit = (userData) => {
    const { user, userId } = userData
    const { profile } = user
    const userDetails = {
      name: profile.name,
      phone: profile.phone,
      role: profile.role || 'farmmanager',
      isEditMode: true,
      userId
    }
    setUserInfo(userDetails)
    setOpen(true)
  }
  const handleDelete = (userData) => {
    const { userId, user } = userData
    const userDetails = { userId, name: user.profile.name }
    setUserInfo(userDetails)
    setIsDeleteModelOpen(true)
  }
  const handleConfirmRemove = () => {
    const { userId } = userInfo
    deleteUser({ userId })
    handleDeleteDialogueToggle()
  }
  const handleDeleteDialogueToggle = () => {
    setIsDeleteModelOpen(!isDeleteModelOpen)
    setUserInfo({})
  }

  const handleBackButton = () => {
    navigate(-1)
  }

  const headers = [
    {
      label: 'Name',
      key: 'user.profile.name'
    },

    {
      label: 'Mobile Number',
      key: 'user.profile.phone'
    },
    {
      label: 'Role',
      key: 'user.profile.role'
    },
    {
      label: 'Actons',
      isButton: true,
      align: 'center',
      buttonArray: [
        {
          label: 'Edit',
          handler: handleEdit,
          type: 'icon',
          icon: <EditOutlinedIcon sx={{ color: '#517223' }} />,
          color: 'primary',
          isAuthRequired: true,
          from: 'users',
          action: 'edit'
        },
        {
          label: 'Delete',
          handler: handleDelete,
          type: 'icon',
          icon: <DeleteOutlineOutlinedIcon sx={{ color: '#517223' }} />,
          isAuthRequired: true,
          from: 'users',
          action: 'delete'
        }
      ]
    }
  ]
  const conFirmbuttons = [
    {
      label: 'Cancel',
      handler: handleDeleteDialogueToggle,
      isLight: true
    },
    {
      label: 'Delete',
      handler: handleConfirmRemove
    }
  ]
  const handleCropSave = (data) => {
    if (userInfo.isEditMode) {
      const payload = {
        userId: userInfo.userId,
        userInfo: {
          name: data.name,
          role: data.role
        }
      }
      updateUser(payload)
    } else {
      addUser(data)
    }
    handleModalToggle()
  }
  const handleModalToggle = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    setOpen(!open)
    setUserInfo({})
  }
  const buttonArray = [
    {
      label: 'Add New',
      ICON: <AddIcon />,
      handler: handleModalToggle,
      isAuthRequired: true,
      from: 'users',
      action: 'create'
    }
  ]
  const showBackButton = [
    {
      handler: handleBackButton
    }
  ]
  return (
    <div>
      <PageHeader
        title='Users'
        buttonArray={buttonArray}
        showBackButton={showBackButton}
      />
      <div className='page-container'>
        <Grid container spacing={2}>
          <Grid className='card-outline-container' item xs={12} sm={12} md={12}>
            <DataTable data={{ headers, rows: usersList || [] }} />
          </Grid>
        </Grid>
        {isAddUserLoading && <Loader title='Adding User' />}
        {isUsersListLoading && <Loader title='Fetching Users' />}
        {isUpdateUserLoading && <Loader title='Updating User  ' />}
        {isdeleteUserLoading && <Loader title='Deleting  User' />}
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
            subHeading={`Are you sure to delete "${userInfo.name}" ?`}
          />
        )}
      </div>
    </div>
  )
}
