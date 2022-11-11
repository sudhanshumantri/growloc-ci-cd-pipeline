import React, { useState } from "react";
import AddFarmModal from "./addfarm";
import PageHeader from "../shared/page-header";
import Loader from "../shared/loader";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
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
  deleteFarm,
  updateFarm,
  isdeleteFarmLoading,
  isUpdateFarmLoading,
  
}) {
  const [open, setOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [farmInfo, setFarmInfo] = useState({});
  const [selectedFarmId, setSeletedFarmId] = useState(null);
  const handleEdit = (e, elem) => {
    e.preventDefault();
    const { farm } = elem;
    console.log(farm, "farmhandleEdit");
    const farmDetails = {
      name: farm.name,
      farmArea: farm.farmArea,
      germinationType: farm.germinationType,
      germinationArea: farm.germinationArea,
      germinationSeedsCount: farm.germinationSeedsCount,
      germinationWateringType: farm.germinationWateringType,
      germinationWateringSchedule: farm.germinationWateringSchedule,
      nurseryType: farm.nurseryType,
      nurseryArea: farm.nurseryArea,
      nurserySeedsCount: farm.nurserySeedsCount,
      nurseryWateringType: farm.nurseryWateringType,
      nurseryWateringSchedule: farm.nurseryWateringSchedule,
      growingType: farm.growingType,
      growingArea: farm.growingArea,
      growingRowCount: farm.growingRowCount,
      growingPlantCountPerRow: farm.growingRowCount,
      growingPlantSpacing: farm.growingPlantSpacing,
      growingWateringSchedule: farm.growingWateringSchedule,
      reservoirCapacity: farm.reservoirCapacity,
      nutrientWaterReservoirCapacity: farm.nutrientWaterReservoirCapacity,
      phReservoirCapacity: farm.phReservoirCapacity,
      stockNutrientSolutionCapacity: farm.stockNutrientSolutionCapacity,
      cultivableArea: farm.cultivableArea,
      nutrientdilutionRatio: farm.nutrientdilutionRatio,
      nutrientsType: farm.nutrientsType,
      location: farm.location,
      polyhouseStructureExpectedLife: farm.polyhouseStructureExpectedLife,
      polyhousePlasticExpectedLife: farm.polyhousePlasticExpectedLife,
    };
    setFarmInfo(farmDetails);
    setSeletedFarmId(farm.id);
    setOpen(true);
  };



  const handleModalToggle = () => {
    setOpen(!open);
    setFarmInfo({});
    setSeletedFarmId(null);
  };

  const handleDelete = (e, elem) => {
    e.preventDefault();
    const { farmId, farm } = elem;
    const farmDetails = { farmId, name: farm.name };
    setFarmInfo(farmDetails);
    setIsDeleteModelOpen(true);
  };

  const handleConfirmRemove = () => {
    const { farmId } = farmInfo;
    deleteFarm(farmId);
    handleDeleteDialogueToggle();
  };
  const handleDeleteDialogueToggle = () => {
    setIsDeleteModelOpen(!isDeleteModelOpen);
  };
  React.useEffect(() => {
    fetchFarm();
    // addFarm()
  }, []);
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
  const handleFarmSave = (data) => {
    if (selectedFarmId) {
      const payload = {
        name: data.name,
        farmArea: data.farmArea,
        germinationType: data.germinationType,
        germinationArea: data.germinationArea,
        germinationSeedsCount: data.germinationSeedsCount,
        germinationWateringType: data.germinationWateringType,
        germinationWateringSchedule: data.germinationWateringSchedule,
        nurseryType: data.nurseryType,
        nurseryArea: data.nurseryArea,
        nurserySeedsCount: data.nurserySeedsCount,
        nurseryWateringType: data.nurseryWateringType,
        nurseryWateringSchedule: data.nurseryWateringSchedule,
        growingType: data.growingType,
        growingArea: data.growingArea,
        growingRowCount: data.growingRowCount,
        growingPlantCountPerRow: data.growingRowCount,
        growingPlantSpacing: data.growingPlantSpacing,
        growingWateringSchedule: data.growingWateringSchedule,
        reservoirCapacity: data.reservoirCapacity,
        nutrientWaterReservoirCapacity: data.nutrientWaterReservoirCapacity,
        phReservoirCapacity: data.phReservoirCapacity,
        stockNutrientSolutionCapacity: data.stockNutrientSolutionCapacity,
        cultivableArea: data.cultivableArea,
        nutrientdilutionRatio: data.nutrientdilutionRatio,
        nutrientsType: data.nutrientsType,
        location: data.location,
        polyhouseStructureExpectedLife: data.polyhouseStructureExpectedLife,
        polyhousePlasticExpectedLife: data.polyhousePlasticExpectedLife,
      };
      updateFarm({ payload, farmId: selectedFarmId });
    } else {
      addFarm(data);
    }
    handleModalToggle();
  };

  return (
    <div>
      <PageHeader title="Manage Farm" buttonArray={buttonArray} />
      <div className="page-container">
        {isFarmListLoading && <Loader title="Fetching Farms" />}
        {isAddFarmLoading && <Loader title="Adding Farm" />}
        {isUpdateFarmLoading && <Loader title="Updating Farms" />}
        {isdeleteFarmLoading && <Loader title="Deleting Farm" />}  
        {open && (
          <AddFarmModal
            open={open}
            handleSave={handleFarmSave}
            handleClose={handleModalToggle}
            farmDetails={farmInfo}
            data={farmList}
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

///
