import React, { useState } from 'react'
import moment from 'moment'
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Badge,
  Modal,
  Grid
} from '@mui/material/'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { SEVERITY_LEVEL } from '../../../config'
import Carousel from 'react-material-ui-carousel'
import './style.css'
function Row ({ row, handleCommentModalToggle, handleTaskStatusModal }) {
  const [open, setOpen] = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  let loginObject = localStorage.getItem('AUTH_OBJECT')
  if (loginObject) {
    loginObject = JSON.parse(loginObject)
  }
  const formatSerityLevel = (value) => {
    const sLevel = SEVERITY_LEVEL.find((level) => level.value === value) || {}
    return sLevel.name || '-'
  }

  const formatDueDate = (dueDate) => {
    const a = moment(dueDate)
    const b = moment(new Date()).format('YYYY-MM-DD')
    const diff = a.diff(b, 'days')
    if (diff === 1) {
      return 'Tommorow'
    } else if (diff === 0) {
      return 'Today'
    } else {
      return moment(dueDate).format('DD-MM-YYYY')
    }
  }

  const handleImageClick = (images) => {
    setSelectedImages(images)
    setOpenImage(true)
  }

  const handleClose = () => {
    setOpenImage(false)
  }

  const renderImageBadge = (historyRow) => {
    const images = historyRow.images
    return (
      <>
        <Badge
          color='secondary'
          badgeContent={images.length || 0}
          onClick={() => handleImageClick(images)}
        >
          {images.length === 0
            ? (
                ''
              )
            : (
              <img src={images[0].url} width='50' height='50' />
              )}
        </Badge>
        <Modal open={openImage} onClick={handleClose}>
          <div>
            <Carousel autoPlay={false}>
              {selectedImages.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image.url}
                    alt={image}
                    className='carsole-image'
                    width='30%'
                  />
                )
              })}
            </Carousel>
          </div>
        </Modal>
      </>
    )
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className='table-header' align='left'>
          <Chip
            label={formatSerityLevel(row.severity)}
            style={{
              backgroundColor:
                (row.severity === 0 && 'red') ||
                (row.severity === 1 && '#EB955D')
            }}
          />
        </TableCell>
        <TableCell className='table-header' align='left'>
          {row.category}
        </TableCell>
        <TableCell className='table-header' align='left'>
          {row.taskName}
        </TableCell>
        <TableCell className='table-header' align='left'>
          {row.description}
        </TableCell>
        <TableCell className='table-header' align='left'>
          {row.createdByProfile.name}
        </TableCell>
        <TableCell className='table-header' align='left'>
          {row.createdByProfile.name}
        </TableCell>
        <TableCell className='table-header' align='left'>
          {row.itemName}
        </TableCell>
        <TableCell className='table-header' align='left'>
          <Chip
            label={formatDueDate(row.dueDate)}
            style={{ backgroundColor: '#EB955D' }}
          />
        </TableCell>
        <TableCell className='table-header' align='left'>
          {row.status}
        </TableCell>
        <TableCell
          align='center'
          sx={{ width: '15%', paddingLeft: '0px', paddingRight: '0px' }}
        >
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            {loginObject.profile.role === 'farmowner' ||
            loginObject.profile.role === 'farmmanager' ||
            loginObject.profile.role === 'agronomist'
              ? (
                <Grid item>
                  <IconButton
                    title='Edit Task'
                    onClick={() => handleTaskStatusModal(row)}
                  >
                    <EditOutlinedIcon sx={{ color: '#517223' }} />,
                  </IconButton>
                </Grid>
                )
              : (
                  ''
                )}
            <Grid item>
              <IconButton
                title='Add New'
                onClick={() => handleCommentModalToggle(row)}
              >
                <AddCommentOutlinedIcon sx={{ color: '#517223' }} />,
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <p className='label-light label-bold'>History</p>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row.TasksHistory || []).map((historyRow) => (
                    <TableRow key={historyRow.createdOn}>
                      <TableCell>
                        {moment(historyRow.createdOn).format(
                          'YYYY-MM-DD: hh:mm:ss '
                        )}
                      </TableCell>
                      <TableCell>{historyRow.user?.name}</TableCell>
                      <TableCell component='th' scope='row'>
                        {historyRow.comment}
                      </TableCell>
                      <TableCell>{renderImageBadge(historyRow)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function CollapsibleTable ({
  data,
  handleCommentModalToggle,
  handleTaskStatusModal
}) {
  const { headers, rows } = data

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead className='table-header-row'>
          <TableRow>
            <TableCell>#</TableCell>
            {headers.map((header, index) => (
              <TableCell key={index} align='left'>
                {header.label}
              </TableCell>
            ))}
            <TableCell align='left'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              handleCommentModalToggle={handleCommentModalToggle}
              handleTaskStatusModal={handleTaskStatusModal}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
