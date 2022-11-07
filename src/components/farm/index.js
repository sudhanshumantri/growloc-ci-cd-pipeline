import React, { useState } from "react";
import AddFarmModal from "./addfarm";
import PageHeader from "../shared/page-header";
import Loader from "../shared/loader";
import Grid from "@mui/material/Grid";
import { Button, Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ConfirmDialogBox from "../shared/dailog/ConfirmDialogBox";
import CardActions from "@mui/material/CardActions";

export default function ManageFarm({
  fetchFarm,
  farmList,
  addFarm,
  isFarmListLoading,
  isAddFarmLoading,
}) {
  const [open, setOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [farmInfo, setFarmInfo] = useState({});
  const handleModalToggle = () => {
    setOpen(!open);
  };

  const handleCropSave = (data) => {
    addFarm(data);
    handleModalToggle();
  };

  const handleEdit = (e, elem) => {
    e.preventDefault();
    const { userId, farmId, id, farm } = elem;
    const farmDetails = {
      name: farm.name,
      farmArea: farm.farmArea,
      userId,
      farmId,
      id,
    };
    setFarmInfo(farmDetails);
    setOpen(true);
  };
  const handleConfirmRemove = () => {
    handleDeleteDialogueToggle();
  };
  const handleDeleteDialogueToggle = () => {
    setIsDeleteModelOpen(!isDeleteModelOpen);
  };
  let buttonArray = [
    {
      label: "Add New",
      handler: handleModalToggle,
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
  const handleDelete = (e, elem) => {
    e.preventDefault();
    const { userId, farmId, id, farm } = elem;
    const farmDetails = { userId, id, farmId, name: farm.name };
    setFarmInfo(farmDetails);
    setIsDeleteModelOpen(true);
  };
  React.useEffect(() => {
    fetchFarm();
    // addFarm()
  }, []);
  return (
    <div>
      <PageHeader title="Manage Farm" buttonArray={buttonArray} />
      <div className="page-container">
        {isFarmListLoading && <Loader title="Fetching Farms" />}
        {isAddFarmLoading && <Loader title="Adding Farm" />}
        {open && (
          <AddFarmModal
            open={open}
            handleSave={handleCropSave}
            handleClose={handleModalToggle}
            farmDetails={farmInfo}
          />
        )}
        <Grid container spacing={2}>
          {farmList.map((elem) => (
            <Grid
              item
              component={Link}
              to={`/farm/${elem.farmId}/dashboard`}
              xs={4}
              sm={4}
              md={4}
              key={elem.id}
            >
              <Card className="farm-list-card-holder" variant="outlined">
                <CardContent>
                  <p className="header-title">{elem.farm.name}</p>
                  <CardActions disableSpacing>
                    <CreateIcon
                      onClick={(e) => handleEdit(e, elem)}
                      sx={{ color: "#1E90FF" }}
                    />
                    <DeleteIcon
                      onClick={(e) => handleDelete(e, elem)}
                      sx={{ color: "#696906" }}
                    />
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {isDeleteModelOpen && (
          <ConfirmDialogBox
            dialogState={isDeleteModelOpen}
            buttonArray={conFirmbuttons}
            subHeading={`Are you sure to delete ${farmInfo.name} ?`}
          />
        )}
      </div>
    </div>
  );
}
