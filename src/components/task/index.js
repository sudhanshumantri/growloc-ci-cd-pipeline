import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import PageHeader from "../shared/page-header";
import DataTable from "../shared/dataTable";
import Loader from "../shared/loader";
import CollapsibleTable from "../shared/collapsibleDataTable";
export default function ManageTasks({
  FarmTaskList,
  fetchFarmTask,
  isFarmTaskListLoading

}) {
  let { farmId } = useParams();
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
  
    },


  ];

  return (
    <div>
      <PageHeader title="Task" />
      {isFarmTaskListLoading && <Loader title="Fetching Tasks" />}
      <div className="page-container">
        <Grid container spacing={2}>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            {/* <DataTable
              data={{ headers: headers, rows: FarmTaskList || [] }}
            /> */}
            <CollapsibleTable data={{ headers: headers, rows: FarmTaskList || [] }}/>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
