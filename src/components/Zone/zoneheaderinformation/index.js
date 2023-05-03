import React from "react";
import {
    Grid,
    Card,
    CardContent,
  } from "@mui/material";
  import Noofbatch from "../../../../public/assets/Noofbatch.png";
  import Totalharvest from "../../../../public/assets/Totalharvest.png";
  import Nooftask from "../../../../public/assets/Nooftask.png";
const ZoneHeaderInformation = ({zoneDashboardZoneInfoList}) => {
    const { noOfTasks, batchCount, totalHarvested } = zoneDashboardZoneInfoList;
    return (
        <>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Card>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={9} md={9}>
                    <h4 className="section-details">{batchCount || 0}</h4>
                    <p className="card-section">No of Batches</p>
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
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9}>
                  <h4 className="section-details">{noOfTasks || 0}</h4>
                  <p className="card-section">Total Tasks</p>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
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
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={9} md={9} >
                  <h4 className="section-details">
                    {totalHarvested?.kgs || 0}(kgs) /{totalHarvested?.qty || 0}
                    (qty)
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
}

export default ZoneHeaderInformation;