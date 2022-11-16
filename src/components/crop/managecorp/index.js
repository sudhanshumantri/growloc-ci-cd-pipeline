import React, { useState } from "react";
import axios from "../../../api/index";
import AddCropModal from "../addcrop";
import DataTable from "../../shared/dataTable";
import PageHeader from "../../shared/page-header";
import { connect } from "react-redux";
import { fetchCropList } from "../../../sagas/crops";
import { useParams } from "react-router-dom";
import Loader from "../../shared/loader";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ConfirmDialogBox from "../../shared/dailog/ConfirmDialogBox";
import AddIcon from '@mui/icons-material/Add';

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
  const handleCropSave = (addCropData) => {
    if (cropInfo.id) {
      const { qty } = addCropData;
      const { id } = cropInfo;
      updateCrop({id, qty});
    } else {
      addCrop(addCropData);
    }
    handleModalToggle();
  };
  const handleModalToggle = () => {
    setOpen(!open);
    setCropInfo({});
  };
  let buttonArray = [
    {
      label: "Add New",
      ICON:<AddIcon />,
      handler: handleModalToggle,
    },
  ];
  React.useEffect(() => {
    fetchCrop();
    fecthCropFarm({ farmId: parseInt(farmId) });
  }, []);
  const handleEdit = (cropData) => {
    const { id, crop, farmId , qty} = cropData;
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
      // key: "crop.estDate",
      key: "crop.germinationMethod.type",
      redirection: false,
    },
    {
      label: "Units Available",
      // key: "crop.estDate",
      key: "qty",
      redirection: false,
    },
    {
      label: "Actons",
      isButton: true,
      buttonArray: [
        {
          label: "Edit",
          type: "icon",
          handler: handleEdit,
          icon: <CreateIcon />,
          color: "primary",
        },
        {
          label: "Delete",
          type: "icon",
          icon: <DeleteIcon aria-label="delete" />,
          handler: handleDelete,
          // color: "warning",
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

  React.useEffect(() => {
    fetchCrop();
    fecthCropFarm({ farmId: parseInt(farmId) });
  }, []);
  return (
    <div>
      <PageHeader title="Manage Crops" buttonArray={buttonArray} />
      <div className="page-container">
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
            cropDetails ={cropInfo}
            data ={cropFarmList}
          />
        )}

        {isDeleteModelOpen && (
          <ConfirmDialogBox
            dialogState={isDeleteModelOpen}
            buttonArray={conFirmbuttons}
            subHeading={`Are you sure to delete ${cropInfo.name} ?`}
          />
        )}
        <DataTable data={{ headers: headers, rows: cropFarmList }} />
      </div>
    </div>
  );
}
