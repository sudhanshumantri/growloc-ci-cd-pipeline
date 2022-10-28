import React, { useState } from "react";
import axios from "../../../api/index";
import AddCropModal from "../addcrop";
import DataTable from "../../shared/dataTable";
import PageHeader from "../../shared/page-header";
import { connect } from "react-redux";
import { fetchCropList } from "../../../sagas/crops";
import { useParams } from 'react-router-dom';
import Loader from '../../shared/loader';
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
        handler: ()=>{},
      },
    ]
  },
];
export default function ManageCrop({
  fetchCrop,
  cropList,
  isCropListLoading,
  cropListError,
  addCrop,
  fecthCropFarm,
  cropFarmList,
  isFarmCropListLoading
}) {
  const [open, setOpen] = useState(false);
  let { farmId } = useParams();
  const handleCropSave = (addCropData) => {
    addCrop(addCropData);
    handleModalToggle();
  }
  const handleModalToggle = (data) => {
    setOpen(!open);
  };
  let buttonArray = [
    {
      label: "Add New",
      handler: handleModalToggle,
    },
  ];
  React.useEffect(() => {
    fetchCrop();
    fecthCropFarm({ farmId: parseInt(farmId) });
  }, []);
  console.log(cropFarmList,"here is data");

  return (
    <div>
      <PageHeader title="Manage Crops" buttonArray={buttonArray} />
      <div className="page-container">
        {isFarmCropListLoading && (
          <Loader title='Fetching Crops' />
        )}
        {open && (
          <AddCropModal
            modalData={cropList}
            open={open}
            handleSave={handleCropSave}
            handleClose={handleModalToggle}
          />
        )}
        <DataTable data={{ headers: headers, rows: cropFarmList }} />
      </div>
    </div>
  );
}
