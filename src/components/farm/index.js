import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../shared/page-header";
import Loader from "../shared/loader";
import { Card,Grid,CardContent,CardActions,Menu,MenuItem ,IconButton, ListItemIcon, ListItemText, Divider} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ConfirmDialogBox from "../shared/dailog/ConfirmDialogBox";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./style.css";
import AuthOutlet from "../shared/authoutlet";
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showMenu,setShowMenu] = useState(false)

  const newOpen = Boolean(anchorEl);
  const handleOpenMoreOptions = (event, id) => {
    event.preventDefault();
    setShowMenu({[id]: true})
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMoreOptions = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e, elem) => {
    e.preventDefault();
    const { farm } = elem;
    navigate("/edit-farm/" + farm.id);
  };

  const handleModalToggle = () => {
    navigate("/add-farm/");
  };

  const handleDelete = (e, elem) => {
    console.log(elem,"elem");
    e.preventDefault();
    const { farmId, farm } = elem;
    const farmDetails = { farmId, name: farm.name };
    setFarmInfo(farmDetails);
    setIsDeleteModelOpen(true);
    setShowMenu({});
    setAnchorEl(null);
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
      ICON: <AddIcon />,
      handler: handleModalToggle,
      isAuthRequired: true,
      from: "farms",
      action: "create",
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
  };


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
                    <p>
                      <b>Farm area-</b>
                      {elem.farm.farmArea}
                    </p>
                    <p>
                      <b>Germination Zone-</b>
                      {elem.farm.germinationType}
                    </p>
                    <p>
                      <b>Nursery Zone-</b>
                      {elem.farm.nurseryType}
                    </p>
                  </div>
                </CardContent>
                <CardActions
                  className="farm-card-bottom-container"
                  disableSpacing
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={10} sm={10} md={10}>
                      <p className="farm-card-title" >{elem.farm.name}</p>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                      <AuthOutlet
                        isAuthRequired={true}
                        from="farms"
                        action="edit"
                      >
                        <IconButton
                          className="farm-card-icon"
                          aria-label="settings"
                          onClick={(e)=>handleOpenMoreOptions(e, elem.id)}
                        >
                          <MoreHorizIcon
                            id="basic-button"
                            aria-controls={showMenu ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={showMenu ? "true" : undefined}
                          />
                        </IconButton>
                      </AuthOutlet>
                      <Menu
                        id={elem.id}
                        anchorEl={anchorEl}
                        open={showMenu[elem.id]}
                        keepMounted
                        PaperProps={{
                           sx: {
                            width: "300px",
                           border: "2px solid #E5E4D7",
                           borderRadius: "10px",
                          },
                        }}
                        onClose={handleCloseMoreOptions}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem selected={false}
                        onClick={(e) => handleEdit(e, elem)}>
                          <ListItemIcon>
                            <CreateIcon />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem selected={false} onClick={(e) => handleDelete(e, elem)}>
                          <ListItemIcon>
                            <DeleteIcon />
                          </ListItemIcon>
                          <ListItemText>Delete</ListItemText>
                        </MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {isDeleteModelOpen && (
          <ConfirmDialogBox
            dialogState={isDeleteModelOpen}
            buttonArray={conFirmbuttons}
            subHeading={`Are you sure to delete "${farmInfo.name}" ?`}
          />
        )}
      </div>
    </div>
  );
}
