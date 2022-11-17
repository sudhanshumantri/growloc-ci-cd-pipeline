import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Collapse from '@mui/material/Collapse';


export default function ManageFarm({
  fetchFarm,
  farmList,
  isFarmListLoading,
  isAddFarmLoading,
  deleteFarm,
  isdeleteFarmLoading,
  isUpdateFarmLoading,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [farmInfo, setFarmInfo] = useState({});
  const [selectedFarmId, setSeletedFarmId] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleEdit = (e, elem) => {
    e.preventDefault();
     const { farm } = elem;
    navigate("/edit-farm/" + farm.id);
  };

  const handleModalToggle = () => {
    navigate("/add-farm/");
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
      label:"Add New",
      ICON:<AddIcon />,
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
 const handleExpandClick = (e) => {
  e.preventDefault();
  setExpanded(!expanded);
 }
 
  return (
    <div>
      <PageHeader title="Manage Farm" buttonArray={buttonArray} />
      <div className="page-container">
        {isFarmListLoading && <Loader title="Fetching Farms" />}
        {isAddFarmLoading && <Loader title="Adding Farm" />}
        {isUpdateFarmLoading && <Loader title="Updating Farms" />}
        {isdeleteFarmLoading && <Loader title="Deleting Farm" />}
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
                  <div className="section-card-title">
                  <p>Crop name-{elem.farm.name}</p>
                  <p>Farm area-{elem.farm.farmArea}</p>
                  <p>Germination Zone-{elem.farm.germinationType}</p>
                  <p>Nursery Zone-{elem.farm.nurseryType}</p>
                  </div>
                  <MoreHorizIcon expand={expanded} onClick={(e)=>handleExpandClick(e)}/>
                  <Collapse in={expanded}  >
                  <CardActions className="action-button" disableSpacing>
                    <CreateIcon
                      onClick={(e) => handleEdit(e, elem)}
                      sx={{ color: "#1E90FF" }}
                    />
                    <DeleteIcon
                      onClick={(e) => handleDelete(e, elem)}
                      sx={{ color: "#696906" }}
                      />
                  </CardActions>
                  </Collapse>
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
