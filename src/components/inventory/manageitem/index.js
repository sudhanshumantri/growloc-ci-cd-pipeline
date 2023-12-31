import React, { useEffect, useState } from 'react'
import PageHeader from '../../shared/page-header'
import AddIcon from '@mui/icons-material/Add'
import AddInventoryItems from '../additems'
import { useParams, useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import DataTable from '../../shared/dataTable'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ConfirmDialogBox from '../../shared/dailog/ConfirmDialogBox'
import Loader from '../../shared/loader'

export default function ManageItem ({
  fetchFarmInventory,
  FarmInventoryList,
  addFarmInventory,
  deleteFarmInventory,
  updateFarmInventory,
  isFarmInventoryListLoading,
  isAddFarmInventoryLoading,
  isUpdateFarmInventoryLoading,
  isDeleteFarmInventoryLoading
}) {
  const { farmId } = useParams()
  const [open, setOpen] = useState(false)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  const [itemInfo, setItemInfo] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchFarmInventory(farmId)
  }, [])
  const handleModalToggle = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return
    setOpen(!open)
    setItemInfo({})
  }

  const handleEdit = (userData) => {
    const { id, name, qty, units } = userData
    const itemDetails = {
      name,
      qty,
      units,
      id
    }
    setItemInfo(itemDetails)
    setOpen(true)
  }
  const handleDelete = (itemData) => {
    const { id, name } = itemData
    const itemDetails = { id, name }
    setItemInfo(itemDetails)
    setIsDeleteModelOpen(true)
  }

  const handleDeleteDialogueToggle = () => {
    setIsDeleteModelOpen(!isDeleteModelOpen)
    setItemInfo({})
  }

  const handleConfirmRemove = () => {
    const { id } = itemInfo
    deleteFarmInventory(id)
    handleDeleteDialogueToggle()
  }

  const handleBackButton = () => {
    navigate(-1)
  }

  const headers = [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Quantity',
      key: 'qty'
    },
    {
      label: 'Units',
      key: 'units'
    },
    {
      label: 'Actons',
      isButton: true,
      align: 'center',
      buttonArray: [
        {
          label: 'Edit',
          type: 'icon',
          handler: handleEdit,
          icon: <EditOutlinedIcon sx={{ color: '#517223' }} />,
          isAuthRequired: true,
          from: 'farmItems',
          action: 'edit'
        },
        {
          label: 'Delete',
          type: 'icon',
          icon: <DeleteOutlineOutlinedIcon sx={{ color: '#517223' }} />,
          handler: handleDelete,
          isAuthRequired: true,
          from: 'farmItems',
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

  const buttonArray = [
    {
      label: 'Add New',
      ICON: <AddIcon />,
      handler: handleModalToggle,
      isAuthRequired: true,
      from: 'farmItems',
      action: 'create'
    }
  ]

  const showBackButton = [
    {
      handler: handleBackButton
    }
  ]

  const handleFarmIneventorySave = (data) => {
    if (itemInfo.id) {
      const payload = {
        name: data.name,
        units: data.units,
        qty: data.qty
      }
      updateFarmInventory({ payload, id: itemInfo.id })
    } else {
      addFarmInventory(data)
    }
    handleModalToggle()
  }

  return (
    <div>
      <PageHeader
        title='Inventory'
        buttonArray={buttonArray}
        showBackButton={showBackButton}
      />
      <div className='page-container'>
        <Grid container spacing={2}>
          <Grid className='card-outline-container' item xs={12} sm={12} md={12}>
            <DataTable data={{ headers, rows: FarmInventoryList || [] }} />
          </Grid>
        </Grid>
        {isFarmInventoryListLoading && <Loader title='Fetching items' />}
        {isAddFarmInventoryLoading && <Loader title='Adding item' />}
        {isUpdateFarmInventoryLoading && <Loader title='Updating items  ' />}
        {isDeleteFarmInventoryLoading && <Loader title='Deleting  items' />}
        {open && (
          <AddInventoryItems
            open={open}
            handleSave={handleFarmIneventorySave}
            handleClose={handleModalToggle}
            itemDetails={itemInfo}
            data={FarmInventoryList}
          />
        )}

        {isDeleteModelOpen && (
          <ConfirmDialogBox
            dialogState={isDeleteModelOpen}
            buttonArray={conFirmbuttons}
            subHeading={`Are you sure to delete "${itemInfo.name}" ?`}
          />
        )}
      </div>
    </div>
  )
}
