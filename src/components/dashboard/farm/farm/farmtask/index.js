import React, { useState } from "react";
import { Grid } from "@mui/material";
import AuthOutlet from "../../../../shared/authoutlet";
import CollapsibleTable from "../../../../shared/collapsibleDataTable";
import TableDynamicPagination from "../../../../shared/tablepagination";
import ButtonCustom from "../../../../shared/button";
import AddIcon from "@mui/icons-material/Add";
import AddTaskModal from "../../../../shared/addtask/addtask";
import AddFarmTaskComment from "../../../../shared/addfarmtaskcomment";

const FarmDashbaordTaskList = ({
  farmDashboardTaskList,
  usersList,
  farmInventoryList,
  fetchUsers,
  fetchFarmInventory,
  fetchFarmDashboardFarmTask,
  loginObject,
  addTaskScheduleTask,
  farmId,
  addFarmTaskComment
}) => {
  const [open, setOpen] = useState(false);
  const [rowdata, setRowData] = useState({});
  const [openCommetTask, setCommetTask] = useState(false);

  const handleModalToggle = (event, reason) => {
    if (reason && reason == "backdropClick" && "escapeKeyDown") return;
    setOpen(!open);
  };

  const handleCommentModalToggle = (rowData) => {
    setRowData(rowData);
    setCommetTask(!openCommetTask);
  };
  const handleTaskSave = (data) => {
    if (data) {
      data.createdBy = loginObject?.profile.userId;
      data.farmId = farmId;
      addTaskScheduleTask(data);
    }
    handleModalToggle();
  };
  const handleTaskCommentSave = (data) => {
    if (data) {
      addFarmTaskComment({
        ...data,
        taskId: parseInt(rowdata.id),
        userId: rowdata.createdByProfile.userId,
      });
    }
    handleCommentModalToggle();
  };
  const handleChangeTaskPagination = (queryParams) => {
    fetchFarmDashboardFarmTask({ farmId: farmId, queryParams });
  };

  const TASK_HEADER = [
    {
      label: "Severity",
      key: "severity",
      redirection: false,
      isDate: true,
    },
    {
      label: "Category",
      key: "category",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "Task Name",
      key: "taskName",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "Description",
      key: "description",
      redirection: false,
    },
    {
      label: "Created By",
      key: "createdByProfile.name",
      redirection: false,
    },
    {
      label: "Created For",
      key: "createdForProfile.name",
      redirection: false,
    },
    {
      label: "Inventory Name",
      key: "",
      redirection: false,
      isDate: true,
    },

    {
      label: "Due Date",
      key: "dueDate",
      redirection: false,
      isDate: true,
    },
    {
      label: "Status",
      // key: "dueDate",
      redirection: false,
      isDate: true,
    },
  ];

  const renderFarmTaskList = () => {
    const { tasks } = farmDashboardTaskList;

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={9} lg={9}>
            <span className="section-title">Tasks</span>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} sx={{ alignItems: "center" }}>
            <AuthOutlet isAuthRequired={true} from="farmItems" action="create">
              <ButtonCustom
                title="Add New Task"
                ICON={<AddIcon />}
                handleButtonClick={handleModalToggle}
              />
            </AuthOutlet>
          </Grid>
          <Grid
            className="card-outline-container "
            item
            xs={12}
            sm={12}
            md={12}
          >
            <CollapsibleTable
              data={{ headers: TASK_HEADER, rows: tasks || [] }}
              handleCommentModalToggle={handleCommentModalToggle}
            />
            <TableDynamicPagination
              count={farmDashboardTaskList.total}
              handleChangePagination={handleChangeTaskPagination}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      {renderFarmTaskList()}

      {open && (
        <AddTaskModal
          open={open}
          handleSave={handleTaskSave}
          handleClose={handleModalToggle}
          usersList={usersList}
          farmInventoryList={farmInventoryList}
          fetchFarmInventory={fetchFarmInventory}
          fetchUsers={fetchUsers}
        />
      )}
      {openCommetTask && (
        <AddFarmTaskComment
          open={openCommetTask}
          handleSave={handleTaskCommentSave}
          handleClose={handleCommentModalToggle}
        />
      )}
    </>
  );
};

export default FarmDashbaordTaskList;
