import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import PageHeader from "../shared/page-header";
import DataTable from "../shared/dataTable";
import Loader from "../shared/loader";
import CollapsibleTable from "../shared/collapsibleDataTable";
import AddFarmTaskComment from "../shared/addfarmtaskcomment";
import TableDynamicPagination from "../shared/tablepagination";
import { useNavigate } from 'react-router-dom';

export default function ManageTasks({
  FarmTaskList,
  fetchFarmTask,
  isFarmTaskListLoading,
  addTaskComment,
  isTaskCommentLoading,
}) {
  let { farmId } = useParams();
  const [openCommetTask, setCommetTask] = useState(false);
  const [rowdata, setRowData] = useState({});
  const navigate = useNavigate();


  React.useEffect(() => {
    fetchFarmTask({
      farmId: farmId || "universal",
      queryParams: { skip: 0, take: 10 },
    });
  }, []);

  const headers = [
    {
      label: "Category",
      key: "category",
    },
    {
      label: "Task Name",
      key: "taskName",
    },
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Created By",
      key: "createdByProfile.name",
    },
    { 
      label: "Created On",
      key: "dueDate",
      redirection: false,
      isDate: true,
    },
    {
      label: "Created For",
      key: "createdForProfile.name",
    },
    {
      label: "Inventory Name",
      key: "",
    },
    {
      label: "Due Date",
      key: "dueDate",
      redirection: false,
      isDate: true,
    },
  ];

  const handleBackButton = () => {
    navigate(-1)
  }


  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];



  const handleTaskCommentSave = (data) => {
    if (data) {
      addTaskComment({
        ...data,
        taskId: parseInt(rowdata.id),
        userId: parseInt(rowdata.createdByProfile.id),
      });
    }
    handleCommentModalToggle();
  };

  const handleCommentModalToggle = (rowData) => {
    setRowData(rowData);
    setCommetTask(!openCommetTask);
  };

  const handleChangePagination = (queryParams) => {
    fetchFarmTask({ farmId: farmId || "universal", queryParams });
  };

  return (
    <div>
      <PageHeader title="Task" showBackButton={showBackButton}
/>
      {isFarmTaskListLoading && <Loader title="Fetching Tasks" />}
      {isTaskCommentLoading && <Loader title="Adding comments" />}

      <div className="page-container">
        <Grid container spacing={2}>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <CollapsibleTable
              data={{ headers: headers, rows: FarmTaskList.tasks || [] }}
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
  );
}
