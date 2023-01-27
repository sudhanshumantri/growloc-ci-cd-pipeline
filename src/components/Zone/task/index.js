import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PageHeader from "../../shared/page-header";
import { Grid } from "@mui/material";
import CollapsibleTable from "../../shared/collapsibleDataTable";
import TableDynamicPagination from "../../shared/tablepagination";
import Loader from "../../shared/loader";
import AddFarmTaskComment from "../../shared/addfarmtaskcomment";


export default function ManageZoneTasks({
    fetchZoneTask,
    zoneTaskList,
    isZoneTaskListLoading,
    isZoneTaskCommentLoading,
    addZoneTaskComment,
    
}) {

  let { zoneId } = useParams();
  const navigate = useNavigate();
  const [openCommetTask, setCommetTask] = useState(false);
  const [rowdata, setRowData] = useState({});


  React.useEffect(() => {
    fetchZoneTask({
      zoneId: zoneId ,
      queryParams: { skip: 0, take: 10 },
    })
  }, []);

  const handleCommentModalToggle = (rowData) => {
    setRowData(rowData);
    setCommetTask(!openCommetTask);
  };

  const handleZoneTaskCommentSave = (data) => {
    if (data) {
      addZoneTaskComment({
        ...data,
        taskId: parseInt(rowdata.id),
        userId: parseInt(rowdata.createdByProfile.id),
      });
    }
    handleCommentModalToggle();
  };
  const headers = [

    {
      label: "Severity",
      key: "severity",
      redirection: false,
      isDate: true,
    },
    {
      label: "Category",
      key: "task.category",
    },
    {
      label: "Task Name",
      key: "task.taskName",
    },
    {
      label: "Description",
      key: "task.description",
    },
    {
      label: "Created By",
      key: "task.createdByProfile.name",
    },
    {
      label: "Created For",
      key: "task.createdForProfile.name",
    },
    {
      label: "Inventory Name",
      key: "",
    },
    {
      label: "Due Date",
      key: "task.dueDate",
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

  const handleChangePagination = (queryParams) => {
    fetchZoneTask({ zoneId: zoneId , queryParams });
  };




  return (
    <div>
      <PageHeader title="Zone-Task" showBackButton={showBackButton}
   />
         {isZoneTaskListLoading && <Loader title="Fetching tasks" />}
         {isZoneTaskCommentLoading && <Loader title="Adding Comment" />}

       <div className="page-container">
        <Grid container spacing={2}>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <CollapsibleTable
              data={{ headers: headers, rows: zoneTaskList?.tasks || [] }}
              handleCommentModalToggle={handleCommentModalToggle}

            />
            <TableDynamicPagination
              count={zoneTaskList.total}
              handleChangePagination={handleChangePagination}
            />
          </Grid>
        </Grid>
      </div>
      {openCommetTask && (
        <AddFarmTaskComment
          open={openCommetTask}
          handleSave={handleZoneTaskCommentSave}
          handleClose={handleCommentModalToggle}
        />
      )}


    </div> 
  );
}
