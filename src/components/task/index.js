import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import PageHeader from '../shared/page-header'
import Loader from '../shared/loader'
import CollapsibleTable from '../shared/collapsibleDataTable'
import AddFarmTaskComment from '../shared/addfarmtaskcomment'
import TableDynamicPagination from '../shared/tablepagination'
export default function ManageTasks ({
  FarmTaskList,
  fetchFarmTask,
  isFarmTaskListLoading,
  addTaskComment,
  isTaskCommentLoading
}) {
  const { farmId } = useParams()
  const [openCommetTask, setCommetTask] = useState(false)
  const [rowdata, setRowData] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    fetchFarmTask({
      farmId: farmId || 'universal',
      queryParams: { skip: 0, take: 10 }
    })
  }, [])

  const headers = [
    {
      label: 'Severity',
      key: 'severity',
      redirection: false,
      isDate: true
    },
    {
      label: 'Category',
      key: 'category'
    },
    {
      label: 'Task Name',
      key: 'taskName'
    },
    {
      label: 'Description',
      key: 'description'
    },
    {
      label: 'Created By',
      key: 'createdByProfile.name'
    },

    {
      label: 'Created For',
      key: 'createdForProfile.name'
    },
    {
      label: 'Inventory Name',
      key: ''
    },
    {
      label: 'Due Date',
      key: 'dueDate',
      redirection: false,
      isDate: true
    },
    {
      label: 'Status',
      key: 'status',
      redirection: false,
      isDate: true
    }
  ]

  const handleBackButton = () => {
    navigate(-1)
  }

  const showBackButton = [
    {
      handler: handleBackButton
    }
  ]

  const handleTaskCommentSave = (data) => {
    if (data) {
      addTaskComment({
        ...data,
        taskId: parseInt(rowdata.id),
        userId: rowdata.createdByProfile.userId
      })
    }
    handleCommentModalToggle()
  }

  const handleCommentModalToggle = (rowData) => {
    setRowData(rowData)
    setCommetTask(!openCommetTask)
  }

  const handleChangePagination = (queryParams) => {
    fetchFarmTask({ farmId: farmId || 'universal', queryParams })
  }

  return (
    <div>
      <PageHeader title='Task' showBackButton={showBackButton} />
      {isFarmTaskListLoading && <Loader title='Fetching Tasks' />}
      {isTaskCommentLoading && <Loader title='Adding comments' />}

      <div className='page-container'>
        <Grid container spacing={2}>
          <Grid className='card-outline-container' item xs={12} sm={12} md={12}>
            <CollapsibleTable
              data={{ headers, rows: FarmTaskList.tasks || [] }}
              handleCommentModalToggle={handleCommentModalToggle}
            />
            <TableDynamicPagination
              count={FarmTaskList.total}
              handleChangePagination={handleChangePagination}
            />
          </Grid>
        </Grid>
      </div>
      {openCommetTask && (
        <AddFarmTaskComment
          open={openCommetTask}
          handleSave={handleTaskCommentSave}
          handleClose={handleCommentModalToggle}
        />
      )}
    </div>
  )
}
