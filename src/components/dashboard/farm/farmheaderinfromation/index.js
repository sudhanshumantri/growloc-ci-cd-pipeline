import React from "react";
import Noofzone from "../../../../../public/assets/Noofzone.png";
import Noofbatch from "../../../../../public/assets/Noofbatch.png";
import Totalharvest from "../../../../../public/assets/Totalharvest.png";
import Nooftask from "../../../../../public/assets/Nooftask.png";
import {Grid,Card,CardContent}  from "@mui/material";

const FarmDashboardFarmInfo = ({farmInfo}) => {
    const { batchCount, noOfZones, noOfTasks, totalHarvested } = farmInfo;
return (
<>
<Grid item xs={3} sm={3} md={3} lg={3}>
          <Card>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={9} md={9}>
                    <h4 className="section-details">{noOfZones || 0}</h4>
                    <p className="card-section">No of Zones </p>
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <img
                      height="42px"
                      width="42px"
                      className="farm-dashboard-images"
                      src={Noofzone}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">{batchCount || 0}</h4>
                  <p className="card-section">No of Batch</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={Noofbatch}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
  
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">{noOfTasks || 0}</h4>
                  <p className="card-section">No of Tasks</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3} >
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={Nooftask}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">
                    {totalHarvested?.kgs || 0}(kgs)/
                    {totalHarvested?.qty || 0}(qty)
                  </h4>
                  <p className="card-section">Total Harvest</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <img
                    height="42px"
                    width="42px"
                    className="farm-dashboard-images"
                    src={Totalharvest}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
</>
)
};

export default FarmDashboardFarmInfo;