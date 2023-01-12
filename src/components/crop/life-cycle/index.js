import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from "../../shared/dataTable";
import PageHeader from "../../shared/page-header";
import AddNewCropToLifeCycleModal from "./addCropToLifeCycleModal";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import Loader from "../../shared/loader";
import { useNavigate } from 'react-router-dom';

export default function CropLifeCycle({
  fecthCropFarm,
  fetchAllCropsLifecycle,
  farmCropList,
  isFarmCropListLoading,
  addCropToLifecycle,
  lifecycleCropsList,
  isAddLifecycleLoading,
  addLifecycleError,
  isCropLifeCycleListLoading,
}) {
  let { farmId, zoneId} = useParams();
  const navigate = useNavigate();

  let headers = [
    {
      label: "Batch No",
      // key: 'batchName',
      key: "id",
      redirection: true,
      redirectionKey: "id",
      baseEndPoint: `#/farm/${farmId}/zone/${zoneId}/crops/lifecycle/details/`,
    },
    {
      label: "Crop",
      key: "crop.crop.name",
      redirection: false,
    },
    {
      label: "Variety",
      key: "crop.crop.variety",
      redirection: false,
    },
    {
      label: "Start Date ",
      key: "start_date",
      redirection: false,
      isDate: true,
    },
    {
      label: "Total Harvested (Kgs/Units)",
      key: "harvestedData",
      redirection: false,
    },
    {
      label: "Completed",
      key: "isComplete",
      redirection: false,
      isBoolean: true,
      falseLabel: "In-process",
      trueLabel: "Completed",
    },
    {
      label: "No. of Seeds",
      key: "qty",
      redirection: false,
    },
  ];
  React.useEffect(() => {
    fecthCropFarm({ farmId: parseInt(farmId) });
    fetchAllCropsLifecycle({ farmId: parseInt(farmId) });
  }, []);
  const [open, setOpen] = useState(false);
  const handleModalToggle = () => {
    setOpen(!open);
  };
  const handleCropSave = (lifecycleData) => {
    addCropToLifecycle(lifecycleData);
    handleModalToggle();
  };
  const handleBackButton = () => {
    navigate(-1)
  }

  let buttonArray = [
    {
      label: "Add New",
      ICON: <AddIcon />,
      handler: handleModalToggle,
      isAuthRequired: true,
      from: "lifeCycle",
      action: "create",
    },  
  ];
  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];

  return (
    <>
      <PageHeader  title="Crop Lifecycle" buttonArray={buttonArray} showBackButton={showBackButton}/>
      <div className="page-container">
        {isAddLifecycleLoading && <Loader title="Adding Crop To Lifecycle" />}
        {isCropLifeCycleListLoading && <Loader title="Fetching Crops" />}
        {open && (
          <AddNewCropToLifeCycleModal
            modalData={farmCropList}
            open={open}
            handleSave={handleCropSave}
            handleClose={handleModalToggle}
          />
        )}
        <Grid container spacing={2} >
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <DataTable data={{ headers: headers, rows: lifecycleCropsList }} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
