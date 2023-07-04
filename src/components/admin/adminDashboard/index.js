import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Paper,
  Grid,
  Button,
  IconButton
} from '@mui/material/'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Loader from '../../shared/loader'
import PageHeader from '../../shared/page-header'
import ConfirmDialogBox from '../../shared/dailog/ConfirmDialogBox'
import AddZoneSensorsModal from '../../Zone/addsensors'
import moment from 'moment'
import './style.css'

export const AdminDashboard = ({
  fetchAdminList,
  adminList,
  addAdminZoneSensors,
  isAdminListLoading,
  deleteAdminZoneSensors
}) => {
  const [expandedRow, setExpandedRow] = useState({})
  const [expandedZoneRow, setExpandedZoneRow] = useState({})
  const [expandedZoneSensorsRow, setExpandedZoneSensorsRow] = useState({})
  const [openZoneSensors, setZoneSensors] = useState(false)
  const [zoneData, setZoneData] = useState({})
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
  React.useEffect(() => {
    fetchAdminList()
  }, [])
  const handleExpandClick = (id) => {
    setExpandedRow({ ...expandedRow, [id]: !expandedRow[id] })
  }
  const handleZoneSensorsModalToggle = (zoneData) => {
    setZoneData(zoneData)
    setZoneSensors(!openZoneSensors)
  }
  const handleAdminZoneSensordSave = (data) => {
    if (data) {
      addAdminZoneSensors({ ...data, zoneId: zoneData.zone_internal_id })
    }
    handleZoneSensorsModalToggle()
  }
  const handleDeleteDialogueToggle = (zoneDeleteData) => {
    setIsDeleteModelOpen(!isDeleteModelOpen)
    setZoneData(zoneDeleteData)
  }
  const handleConfirmRemove = () => {
    const { id } = zoneData
    deleteAdminZoneSensors(id)
    setZoneData({})
    handleDeleteDialogueToggle()
  }
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

  const handleZoneExpandClick = (id) => {
    setExpandedZoneRow({ ...expandedZoneRow, [id]: !expandedZoneRow[id] })
  }

  const handleZoneSensorsExpandClick = (id) => {
    setExpandedZoneSensorsRow({
      ...expandedZoneSensorsRow,
      [id]: !expandedZoneSensorsRow[id]
    })
  }

  const { users } = adminList || ''
  const getZoneSensors = (zone, userId, farmId, zoneId) => {
    return (zone.sensors || []).map((sensor, uIndex) => (
      <React.Fragment key={userId + farmId + zoneId + zone.id + sensor.id}>
        <TableRow key={userId + farmId + zoneId + sensor.id}>
          <TableCell component='th' scope='row'>
            {sensor.sensorId}
          </TableCell>
          <TableCell component='th' scope='row'>
            {moment(sensor.created_on).format('YYYY-MM-DD')}
          </TableCell>
          <TableCell component='th' scope='row'>
            <Button onClick={() => handleDeleteDialogueToggle(sensor)}>
              <DeleteOutlineOutlinedIcon sx={{ color: '#517223' }} />
            </Button>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ))
  }

  const getZoneDetails = (farm, userId, farmId) => {
    return (farm.farm.zones || []).map((zone, uIndex) => (
      <React.Fragment key={userId + farmId + zone.id}>
        <TableRow key={userId + farmId + zone.id}>
          <TableCell component='th' scope='row'>
            {zone.name}
          </TableCell>
          <TableCell component='th' scope='row'>
            {zone.farmArea}
          </TableCell>
          <TableCell component='th' scope='row'>
            <Button onClick={() => handleZoneSensorsModalToggle(zone)}>
              <AddIcon sx={{ color: '#517223' }} />
            </Button>
          </TableCell>

          <TableCell align='right'>
            <IconButton
              aria-label='expand row'
              onClick={() =>
                handleZoneSensorsExpandClick(userId + farmId + zone.id)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={10}>
            <Collapse
              in={expandedZoneSensorsRow[userId + farmId + zone.id]}
              timeout='auto'
              unmountOnExit
            >
              <TableContainer component={Paper}>
                <Table
                  sx={{
                    minWidth: '650',
                    width: '100'
                  }}
                  aria-label='simple table'
                >
                  <TableHead className='table-header-row'>
                    <TableRow
                      className='table-header'
                      onClick={() =>
                        handleZoneSensorsExpandClick(userId + farmId + zone.id)}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <TableCell>Sensors ID</TableCell>
                      <TableCell>Created on</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell align='right' />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getZoneSensors(zone, userId + farmId + zone.id)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ))
  }

  const getFarmDetails = (user) => {
    return (user.user.FarmUserMapping || []).map((farm, uIndex) => (
      <React.Fragment key={user.id + farm.id}>
        <TableRow key={user.id + farm.id}>
          <TableCell component='th' scope='row'>
            {farm.farm.name}
          </TableCell>
          <TableCell component='th' scope='row'>
            {farm.farm.farmArea}
          </TableCell>
          <TableCell component='th' scope='row'>
            {farm.farm.zones.length}
          </TableCell>
          <TableCell align='right'>
            <IconButton
              aria-label='expand row'
              onClick={() => handleZoneExpandClick(user.id + farm.id)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={10}>
            <Collapse
              in={expandedZoneRow[user.id + farm.id]}
              timeout='auto'
              unmountOnExit
            >
              <TableContainer component={Paper}>
                <Table
                  sx={{
                    minWidth: '650',
                    width: '100'
                  }}
                  aria-label='simple table'
                >
                  <TableHead className='table-header-row'>
                    <TableRow
                      className='table-header'
                      onClick={() => handleZoneExpandClick(user.id + farm.id)}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <TableCell>Zone Name</TableCell>
                      <TableCell>Zone Area</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell align='right' />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getZoneDetails(farm, user.id, farm.id)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ))
  }
  const getUsers = () => {
    return (users || []).map((user, index) => (
      <React.Fragment key={user.id}>
        <TableRow
          align='center'
          key={user.id}
          onClick={() => handleExpandClick(user.id)}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.address}</TableCell>
          <TableCell>{user.phone}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell align='right'>
            <IconButton
              aria-label='expand row'
              onClick={() => handleExpandClick(user.id)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={10}>
            <Collapse in={expandedRow[user.id]} timeout='auto' unmountOnExit>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: '650', width: '100' }}
                  aria-label='simple table'
                >
                  <TableHead className='table-header-row'>
                    <TableRow className='table-header'>
                      <TableCell>Farm Name</TableCell>
                      <TableCell>Farm Area</TableCell>
                      <TableCell>No of Zone</TableCell>
                      <TableCell align='right' />
                    </TableRow>
                  </TableHead>
                  <TableBody>{getFarmDetails(user)}</TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ))
  }
  return (
    <>
      <PageHeader title='Admin Dashboard' />
      {isAdminListLoading && <Loader title='Fetching Details' />}

      <div className='page-container'>
        <Grid container spacing={2}>
          <Grid className='card-outline-container' item xs={12} sm={12} md={12}>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead className='table-header-row'>
                  <TableRow className='table-header' align='left'>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email Id</TableCell>
                    <TableCell align='right' />
                  </TableRow>
                </TableHead>
                <TableBody>{getUsers()}</TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {openZoneSensors && (
          <AddZoneSensorsModal
            open={openZoneSensors}
            handleSave={handleAdminZoneSensordSave}
            handleClose={handleZoneSensorsModalToggle}
          />
        )}
        {isDeleteModelOpen && (
          <ConfirmDialogBox
            dialogState={isDeleteModelOpen}
            buttonArray={conFirmbuttons}
            subHeading={`Are you sure to delete "${zoneData.sensorId}"?`}
          />
        )}
      </div>
    </>
  )
}
