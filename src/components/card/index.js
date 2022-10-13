import * as React from "react";
import Grid from "@mui/material/Grid";
import { Button, Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AddFarmModal({ data }) {
  return (
    <div>
      <Grid
        container
        spacing={12}
        direction="row"
        justify="flex-start"
        alignItems="center"
        sx={{ textDecoration: "none" }}
        spacing={2}
      >
        {data.map((elem) => (
          <Grid
            item
            component={Link}
            to={`/farm/${elem.farmId}/crops/manage`}
            xs={15}
            sm={10}
            md={3}
            key={data.indexOf(elem)}
          >
            <Card>
              <Button>
                <CardHeader />
                <CardContent>
                  <Typography variant="h5" component="div">
                    name: {elem.farm.name}
                  </Typography>
                  <Typography variant="p" component="div">
                    CultivableArea: {elem.farm.cultivableArea}
                  </Typography>
                  <Typography variant="p" component="div">
                    farmArea: {elem.farm.farmArea}
                  </Typography>
                  <Typography variant="p" component="div">
                    reservoirCapacity: {elem.farm.reservoirCapacity}
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
