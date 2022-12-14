import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import PageHeader from "../shared/page-header";
import DataTable from "../shared/dataTable";
import Loader from "../shared/loader";
import CollapsibleTable from "../shared/collapsibleDataTable";
import AddFarmTaskComment from "../dashboard/addfarmtaskcomment";
export default function ManageTasks({
  FarmTaskList,
  fetchFarmTask,
  isFarmTaskListLoading,
  addTaskComment,
  isTaskCommentLoading,

}) {
  let { farmId } = useParams();
  const [openCommetTask,setCommetTask] = useState(false)
  const [rowdata,setRowData] = useState({});

  React.useEffect(() => {
    fetchFarmTask(farmId || "universal");
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
      label: "Item Name",
      key: "itemName",
    },
    {
      label: "Due Date",
      key: "dueDate",
      redirection: false,
      isDate: true,
  
    }

  ];
  const handleTaskCommentSave = (data) => {
    if (data) {
      addTaskComment({...data, taskId:parseInt(rowdata.id), userId:parseInt(rowdata.createdByProfile.id)});
    }
    handleCommentModalToggle();
  };

  const handleCommentModalToggle = (rowData) => {
    setRowData(rowData)
    setCommetTask(!openCommetTask);
  };
  return (
    <div>
      <PageHeader title="Task" />
      {isFarmTaskListLoading && <Loader title="Fetching Tasks" />}
      {isTaskCommentLoading && <Loader title="Adding comments" />}

      <div className="page-container">
        <Grid container spacing={2}>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            {/* <DataTable
              data={{ headers: headers, rows: FarmTaskList || [] }}
            /> */}
            <CollapsibleTable data={{ headers: headers, rows: FarmTaskList || [] }} handleCommentModalToggle={handleCommentModalToggle}/>
            
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
