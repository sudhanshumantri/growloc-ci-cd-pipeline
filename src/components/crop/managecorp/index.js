import React, { useState } from "react";
import axios from "../../../api/index";
import AddCorpModal from "../addcrop";
import DataTable from "../../shared/dataTable";
import PageHeader from "../../shared/page-header";
import { connect } from "react-redux";
import { fetchCropList } from "../../../sagas/crops";
import { useParams } from 'react-router-dom';


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
    label: "Type",
    key: "crop.transplantingDate",
    redirection: false,
  },
  {
    label: "Germination Method",
    key: "crop.estDate",
    redirection: false,
  },
];
export default function ManageCrop({
  fetchCrop,
  cropList,
  isCropListLoading,
  cropListError,
  addCrop,
  fecthCropFarm,
  cropFarmList
}) {
  const [open, setOpen] = useState(false);
  let { farmId } = useParams();
  const handleModalToggle = (data) => {
    setOpen(!open);
    if (data) {
      addCrop(data);
    }
  };
  let buttonArray = [
    {
      label: "Add New",
      handler: handleModalToggle,
    },
  ];
  React.useEffect(() => {
    fetchCrop();
    fecthCropFarm({farmId});
  }, []);
  return (
    <div>
      <PageHeader title="Manage Crops" buttonArray={buttonArray} />
      <AddCorpModal
        modalData={cropList}
        open={open}
        handleClick={handleModalToggle}
      />
      <div className="page-container">
        <DataTable data={{ headers: headers, rows: cropFarmList }} />
      </div>
    </div>
  );
}
