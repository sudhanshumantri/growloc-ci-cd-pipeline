import React,{useState} from "react";
import {Grid} from "@mui/material"
import ButtonCustom from "../../shared/button";
import AuthOutlet from "../../shared/authoutlet";
import CollapsibleTable from "../../shared/collapsibleDataTable";
import TableDynamicPagination from "../../shared/tablepagination";
import AddIcon from "@mui/icons-material/Add";
import AddFarmTaskComment from "../../shared/addfarmtaskcomment";
import AddTaskModal from "../../shared/addtask/addtask";

const ZoneDashboardTask = ({usersList,fetchUsers,farmInventoryList,fetchFarmInventory,addFarmDashboardZoneTask,zoneDashboardZoneTaskList,fetchZoneDashboardZoneTaskSchedule,addFarmDashboardZoneTaskComment,loginObject,farmId,zoneId}) => {
    const [open, setOpen] = useState(false);
    const [openCommetTask, setCommetTask] = useState(false);
    const [rowdata, setRowData] = useState({});

    const handleModalToggle = (event, reason) => {
        if (reason && reason == "backdropClick" && "escapeKeyDown") return;
        setOpen(!open);
      };

      const handleCommentModalToggle = (rowData) => {
        setRowData(rowData);
        setCommetTask(!openCommetTask);
      };
    
    const handleZoneTaskSave = (data) => {
        if (data) {
          data.createdBy = loginObject?.profile.userId;
          data.farmId = farmId;
          data.zoneId = zoneId;
          addFarmDashboardZoneTask(data);
        }
        handleModalToggle();
      };
      const handleZoneTaskCommentSave = (data) => {
        if (data) {
          addFarmDashboardZoneTaskComment({
            ...data,
            taskId: parseInt(rowdata.id),
            userId: rowdata.createdByProfile.userId,
          });
        }
        handleCommentModalToggle();
      };
      const handleChangeZoneTaskSchedulePagination = (queryParams) => {
        fetchZoneDashboardZoneTaskSchedule({ zoneId: zoneId, queryParams });
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
          key: "status",
          redirection: false,
          isDate: true,
        },
      ];
    


      const renderZoneTaskSchedules = () => {
        const { tasks } = zoneDashboardZoneTaskList;
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={9} lg={9}>
                <p className="section-title">Zone Tasks</p>
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} sx={{ alignItems: "center" }}>
                <AuthOutlet isAuthRequired={true} from="dashboard" action="create">
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
                  count={zoneDashboardZoneTaskList.total}
                  handleChangePagination={handleChangeZoneTaskSchedulePagination}
                />
              </Grid>
            </Grid>
          </>
        );
      };
    
    
    
  
    return(
        <>
        {renderZoneTaskSchedules()}
    {open && (
        <AddTaskModal
          open={open}
          handleSave={handleZoneTaskSave}
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
          handleSave={handleZoneTaskCommentSave}
          handleClose={handleCommentModalToggle}
        />
      )}
        </>
    )
}

export default ZoneDashboardTask;