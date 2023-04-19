import React,{useState} from "react";
import { Grid,Box,Tab,} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const FarmDashboardFarmInformation = ({farmDashboardInfoList}) => {
    const [tabInfo, setTabInfo] = useState("1");
    const handleTabInfoChange = (event, newValue) => {
        setTabInfo(newValue);
      };
    const renderFarmArea = () => {
        const { name, farmArea } = farmDashboardInfoList;
        return (
          <>
            {name && farmArea && (
              <div>
                <p className="section-title">
                  Farm Name : <span>{name}</span>
                </p>
                <p className="section-title">
                  Farm Area: <span>{farmArea}</span>
                </p>
              </div>
            )}
          </>
        );
      };
      const renderGerminationInfo = () => {
        return (
          <>
            <p className="section-title">
              Germination Type :
              <span>{farmDashboardInfoList?.germinationType}</span>
            </p>
            <p className="section-title">
              Germination Area :
              <span>{farmDashboardInfoList?.germinationArea}</span>
            </p>
            <p className="section-title">
              No of Seeds Per Plantation :
              <span>{farmDashboardInfoList?.germinationSeedsCount}</span>
            </p>
            <p className="section-title">
              Watering Type :
              <span>{farmDashboardInfoList?.germinationWateringType} </span>
            </p>
            <p className="section-title">
              Watering Schedule:
              <span>{farmDashboardInfoList?.germinationWateringSchedule}</span>
            </p>
          </>
        );
      };


      const renderNurseryInfo = () => {
        return (
          <>
            <p className="section-title">
              Nursery Type : <span>{farmDashboardInfoList?.nurseryType}</span>
            </p>
            <p className="section-title">
              Nursery Area : <span>{farmDashboardInfoList?.nurseryArea}</span>
            </p>
            <p className="section-title">
              No of Seeds Per Nursery :
              <span>{farmDashboardInfoList?.nurserySeedsCount}</span>
            </p>
            <p className="section-title">
              Watering Type :
              <span>{farmDashboardInfoList?.nurseryWateringType}</span>
            </p>
            <p className="section-title">
              Watering Schedule:
              <span>{farmDashboardInfoList?.nurseryWateringSchedule}</span>
            </p>
          </>
        );
      };


      const renderGrowingInfo = () => {
        return (
          <>
            <p className="section-title">
              Growring Type : <span>{farmDashboardInfoList?.growingType}</span>
            </p>
            <p className="section-title">
              Growring Area : <span>{farmDashboardInfoList?.growingArea}</span>
            </p>
            <p className="section-title">
              No Of Plants In Row :
              <span>{farmDashboardInfoList?.growingPlantCountPerRow}</span>
            </p>
            <p className="section-title">
              No Of Rows: <span>{farmDashboardInfoList?.growingRowCount}</span>
            </p>
            <p className="section-title">
              Watering Schedule:
              <span>{farmDashboardInfoList?.growingPlantSpacing}</span>
            </p>
            <p className="section-title">
              Plant Spacing:
              <span>{farmDashboardInfoList?.nurseryWateringSchedule}</span>
            </p>
          </>
        );
      };


      const renderWateringTypeInfo = () => {
        return (
          <>
            <p className="section-title">
              Main Reservoir Capacity :
              <span>{farmDashboardInfoList?.reservoirCapacity}</span>
            </p>
            <p>
              Nutrient Water Reservoir Capacity :
              <span>{farmDashboardInfoList?.nutrientWaterReservoirCapacity}</span>
            </p>
            <p className="section-title">
              Ph Up/Down Reservoir Capacity :
              <span>{farmDashboardInfoList?.phReservoirCapacity}</span>
            </p>
            <p className="section-title">
              Stock Nutrient Solution Capacity :
              <span>{farmDashboardInfoList?.stockNutrientSolutionCapacity}</span>
            </p>
            <p className="section-title">
              Nutrient Dilution Ratio :
              <span>{farmDashboardInfoList?.nutrientdilutionRatio}</span>
            </p>
            <p className="section-title">
              Type Of Nutrients :<span>{farmDashboardInfoList?.nutrientsType}</span>
            </p>
          </>
        );
      };
      const renderPolyhouseInfo = () => {
        return (
          <>
            <p className="section-title">
              Polyhouse Structure Expected Life :
              <span>{farmDashboardInfoList?.polyhouseStructureExpectedLife}</span>
            </p>
            <p className="section-title">
              Polyhouse Plastic Expected Life :
              <span>{farmDashboardInfoList?.polyhousePlasticExpectedLife}</span>
            </p>
          </>
        );
      };

return (
<>
<TabContext value={tabInfo}>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 300,
              }}
            >
              <TabList
                orientation="vertical"
                onChange={handleTabInfoChange}
                sx={{ borderRight: 1, borderColor: "divider" }}
                className={"tab-vertical"}
                aria-label="lab API tabs examplesssssss"
              >
                <Tab label="Farm Area" value="1" />
                <Tab label="Germination Zone" value="2" />
                <Tab label="Nursery Zone" value="3" />
                <Tab label="Growing Zone" value="4" />
                <Tab label="Watering Zone" value="5" />
                <Tab label="Polyhouse" value="6" />
              </TabList>
              <TabPanel value="1">{renderFarmArea()}</TabPanel>
              <TabPanel value="2">{renderGerminationInfo()}</TabPanel>
              <TabPanel value="3">{renderNurseryInfo()}</TabPanel>
              <TabPanel value="4">{renderGrowingInfo()}</TabPanel>
              <TabPanel value="5">{renderWateringTypeInfo()}</TabPanel>
              <TabPanel value="6">{renderPolyhouseInfo()}</TabPanel>
            </Box>
          </Grid>
        </TabContext>
      </>
    );
};

export default FarmDashboardFarmInformation;