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
export default function ManageFarm({
  fetchFarm,
  farmList,
  addFarm,
  isFarmListLoading,
  isAddFarmLoading,
}) {
  const [open, setOpen] = useState(false);
  //   const handleModalToggle = (data) => {
  //     setOpen(!open);
  //     if (data) {
  //       addFarm(data);
  //     }
  //   };

  const handleModalToggle = () => {
    setOpen(!open);
  };

  const handleCropSave = (data) => {
    addFarm(data);
    handleModalToggle();
  };

  let buttonArray = [
    {
      label: "Add New",
      handler: handleModalToggle,
    },
  ];
  React.useEffect(() => {
    fetchFarm();
    // addFarm()
  }, []);
  return (
    <div>
      <PageHeader title="Manage Farm" buttonArray={buttonArray} />
      <div className="page-container">
        {isFarmListLoading && <Loader title="Fetching Farms" />}

        {/* <AddFarmModal
                    open={open}
                    handleClick={handleModalToggle}
                    /> */}
        {/* isAddFarmLoading */}
        {isAddFarmLoading && <Loader title="Adding Farm" />}

        {open && (
          <AddFarmModal
            open={open}
            handleSave={handleCropSave}
            handleClose={handleModalToggle}
          />
        )}

        <Grid container spacing={2}>
          {farmList.map((elem) => (
            <Grid
              item
              component={Link}
              to={`/farm/${elem.farmId}/crops/manage`}
              xs={4}
              sm={4}
              md={4}
              key={elem._id}
            >
              <Card className="farm-list-card-holder" variant="outlined">
                <CardContent>
                  <p className="header-title">{elem.farm.name}</p>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
