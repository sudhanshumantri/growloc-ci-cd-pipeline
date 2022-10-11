import React, { useState } from "react";
import axios from "../../../api/index";
import AddCorpModel from "../addcrop";
import DataTable from "../../shared/dataTable";
import PageHeader from "../../shared/page-header";
import { connect } from "react-redux";
import { fetchCropList } from "../../../sagas/crops";

let headers = [
  {
    label: "Crop",
    key: "name",
    redirection: false,
    redirectionKey: "link",
  },
  {
    label: "Variety",
    key: "variety",
    redirection: false,
  },
  {
    label: "Scientific Name",
    key: "scientificName",
    redirection: false,
  },
  {
    label: "Type",
    key: "transplantingDate",
    redirection: false,
  },
  {
    label: "Germination Method",
    key: "estDate",
    redirection: false,
  },
];
export default function ManageCrop({
  fetchCrop,
  cropList,
  isCropListLoading,
  cropListError,
}) {
  const [modelData, setModelData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleModalToggle = () => {
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
  }, []);
  return (
    <div>
      <PageHeader title="Manage Crops" buttonArray={buttonArray} />
      <AddCorpModel
        modelData={modelData}
        open={open}
        handleClick={handleModalToggle}
      />
      <div className="page-container">
        <DataTable data={{headers: headers, rows: cropList}} />
      </div>
    </div>
  );
}
