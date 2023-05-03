import React, { useState } from "react";
import AddCropModal from "../addcrop";
import DataTable from "../../shared/dataTable";
import PageHeader from "../../shared/page-header";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../shared/loader";
import ConfirmDialogBox from "../../shared/dailog/ConfirmDialogBox";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export default function ManageCrop({
  fetchCrop,
  cropList,
  isCropListLoading,
  cropListError,
  updateCrop,
  addCrop,
  fecthCropFarm,
  cropFarmList,
  isFarmCropListLoading,
  deleteCrop,
  isdeleteFarmCropsLoading,
  isupdateFarmCropsLoading,
  isAddCropLoading,
}) {
  const [open, setOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [cropInfo, setCropInfo] = useState({});
  let { farmId } = useParams();
  const navigate = useNavigate();
  const handleCropSave = (addCropData) => {
    if (cropInfo.id) {
      const { qty } = addCropData;
      const { id } = cropInfo;
      updateCrop({ id, qty });
    } else {
      addCrop(addCropData);
    }
    handleModalToggle();
  };
  const handleModalToggle = (event,reason) => {
    if (reason && reason == "backdropClick" && "escapeKeyDown") 
    return;
    setOpen(!open);
    setCropInfo({});
  };

  const handleBackButton = () => {
    navigate("/");
  };

  let buttonArray = [
    {
      label: "Add New",
      ICON: <AddIcon />,
      handler: handleModalToggle,
      isAuthRequired: true,
      from: "crops",
      action: "create",
    },
  ];

  React.useEffect(() => {
    fetchCrop();
    fecthCropFarm({ farmId: farmId });
  }, []);
  const handleEdit = (cropData) => {
    const { id, crop, farmId, qty } = cropData;
    const cropDetails = {
      name: crop.name,
      id,
      farmId,
      germinationMethod: crop.germinationMethod,
      qty,
      isEditMode: true,
    };
    setCropInfo(cropDetails);
    setOpen(true);
  };

  const handleDelete = (cropData) => {
    const { id, crop } = cropData;
    const cropDetails = { id, name: crop.name };
    setCropInfo(cropDetails);
    setIsDeleteModelOpen(true);
  };
  const handleConfirmRemove = () => {
    const { id } = cropInfo;
    deleteCrop({ id });
    handleDeleteDialogueToggle();
  };
  const handleDeleteDialogueToggle = () => {
    setIsDeleteModelOpen(!isDeleteModelOpen);
    setCropInfo({});
  };
  let headers = [
    {
      label: "Crop",
      key: "crop.name",
      redirection: false,
      redirectionKey: "link",
    },
    {
      label: "Variety",
      key: "crop.variety",
      redirection: false,
    },
    {
      label: "Scientific Name",
      key: "crop.scientificName",
      redirection: false,
    },
    {
      label: "Germination Method",
      key: "crop.germinationMethod.type",
      redirection: false,
    },
    {
      label: "Units Available",
      key: "qty",
      redirection: false,
    },
    {
      label: "Actons",
      isButton: true,
      align:"center",
      buttonArray: [
        {
          label: "Edit",
          type: "icon",
          handler: handleEdit,
          icon: <EditOutlinedIcon sx={{ color: "#517223" }} />,
          isAuthRequired: true,
          from: "crops",
          action: "edit",
        },
        {
          label: "Delete",
          type: "icon",
          icon: <DeleteOutlineOutlinedIcon sx={{ color: "#517223" }} />,
          handler: handleDelete,
          isAuthRequired: true,
          from: "crops",
          action: "delete",
        },
      ],
    },
  ];

  let conFirmbuttons = [
    {
      label: "Cancel",
      handler: handleDeleteDialogueToggle,
      isLight: true,
    },
    {
      label: "Delete",
      handler: handleConfirmRemove,
    },
  ];
  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];

  React.useEffect(() => {
    fetchCrop();
    fecthCropFarm({ farmId: farmId });
  }, []);
  return (
    <div>
      <PageHeader
        title="Manage Crops"
        buttonTitle="back"
        buttonArray={buttonArray}
        showBackButton={showBackButton}
      />
      <div className="page-container">
        <Grid container spacing={2}>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <DataTable data={{ headers: headers, rows: cropFarmList }} />
          </Grid>
        </Grid>
        {isFarmCropListLoading && <Loader title="Fetching Crops" />}

        {isAddCropLoading && <Loader title="Adding Crops" />}
        {isupdateFarmCropsLoading && <Loader title="Updating Crop  " />}
        {isdeleteFarmCropsLoading && <Loader title="Deleting  Crop" />}
        {open && (
          <AddCropModal
            modalData={cropList}
            open={open}
            handleSave={handleCropSave}
            handleClose={handleModalToggle}
            cropDetails={cropInfo}
            data={cropFarmList}
          />
        )}
        {isDeleteModelOpen && (
          <ConfirmDialogBox
            dialogState={isDeleteModelOpen}
            buttonArray={conFirmbuttons}
            subHeading={`Are you sure to delete "${cropInfo.name}" ?`}
          />
        )}
      </div>
    </div>
  );
}
