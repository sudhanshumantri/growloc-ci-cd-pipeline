import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../../shared/page-header";
import AddIcon from "@mui/icons-material/Add";
import AddInventoryItems from "../additems";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import DataTable from "../../shared/dataTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDialogBox from "../../shared/dailog/ConfirmDialogBox";
import Loader from "../../shared/loader";

export default function ManageItem({
  fetchFarmInventory,
  FarmInventoryList,
  addFarmInventory,
  deleteFarmInventory,
  updateFarmInventory,
  isFarmInventoryListLoading,
  isAddFarmInventoryLoading,
  isUpdateFarmInventoryLoading,
  isDeleteFarmInventoryLoading,

}) {
  let { farmId } = useParams();
  const [open, setOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [itemInfo, setItemInfo] = useState({});

  const handleModalToggle = () => {
    setOpen(!open);
    setItemInfo({});
  };

  const handleEdit = (userData) => {
    const { id, name, qty, units } = userData;
    const itemDetails = {
      name: name,
      qty: qty,
      units: units,
      id,
    };
    setItemInfo(itemDetails);
    setOpen(true);
  };
  const handleDelete = (itemData) => {
    const { id, name } = itemData;
    const itemDetails = { id, name };
    setItemInfo(itemDetails);
    setIsDeleteModelOpen(true);
  };

  const handleDeleteDialogueToggle = () => {
    setIsDeleteModelOpen(!isDeleteModelOpen);
    setItemInfo({});
  };

  const handleConfirmRemove = () => {
    const { id } = itemInfo;
    deleteFarmInventory(id);
    handleDeleteDialogueToggle();
  };

  const headers = [
    {
      label: "Name",
      key: "name",
    },

    {
      label: "Quantity",
      key: "qty",
    },
    {
      label: "Units",
      key: "units",
    },
    {
      label: "Actons",
      isButton: true,
      buttonArray: [
        {
          label: "Edit",
          type: "icon",
          handler: handleEdit,
          icon: <EditOutlinedIcon sx={{ color: "#517223" }} />,
          isAuthRequired: true,
          from: "farmItems",
          action: "edit",
        },
        {
          label: "Delete",
          type: "icon",
          icon: <DeleteOutlineOutlinedIcon sx={{ color: "#517223" }} />,
          handler: handleDelete,
          isAuthRequired: true,
          from: "farmItems",
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

  let buttonArray = [
    {
      label: "Add New",
      ICON: <AddIcon />,
      handler: handleModalToggle,
      isAuthRequired: true,
      from: "farmItems",
      action: "create",

    },
  ];
  useEffect(() => {
    fetchFarmInventory(farmId);
  }, []);

  const handleFarmIneventorySave = (data) => {
    if (itemInfo.id) {
      const payload = {
        name: data.name,
        units: data.units,
        qty: data.qty,
      };
      updateFarmInventory({ payload, id: itemInfo.id });
    } else {
      addFarmInventory(data);
    }
    handleModalToggle();
  };

  return (
    <div>
      <PageHeader title="Inventory" buttonArray={buttonArray} showBackButton={true}/>
      <div className="page-container">
        <Grid container spacing={2}>
          <Grid className="card-outline-container" item xs={12} sm={12} md={12}>
            <DataTable
              data={{ headers: headers, rows: FarmInventoryList || [] }}
            />
          </Grid>
        </Grid>
        {isFarmInventoryListLoading && <Loader title="Fetching items" />}
        {isAddFarmInventoryLoading && <Loader title="Adding item" />}
        {isUpdateFarmInventoryLoading && <Loader title="Updating items  " />}
        {isDeleteFarmInventoryLoading && <Loader title="Deleting  items" />}
        {open && (
          <AddInventoryItems
            open={open}
            handleSave={handleFarmIneventorySave}
            handleClose={handleModalToggle}
            itemDetails={itemInfo}
            data={FarmInventoryList}
          />
        )}

        {isDeleteModelOpen && (
          <ConfirmDialogBox
            dialogState={isDeleteModelOpen}
            buttonArray={conFirmbuttons}
            subHeading={`Are you sure to delete "${itemInfo.name}" ?`}
          />
        )}
      </div>
    </div>
  );
}
