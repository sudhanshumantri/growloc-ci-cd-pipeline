import React, { useState } from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Collapse,Paper} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import "./style.css";
export const AdminDashboard = ({ fetchAdminList, adminList }) => {
  const [expandedRow, setExpandedRow] = useState({});
  const [expandedZoneRow, setExpandedZoneRow] = useState({});

  const handleExpandClick = (id) => {
    setExpandedRow({ ...expandedRow, [id]: !expandedRow[id] });
  };

  const handleZoneExpandClick = (id) => {
    setExpandedZoneRow({ ...expandedZoneRow, [id]: !expandedZoneRow[id] });
  };
  React.useEffect(() => {
    fetchAdminList();
  }, []);
  const { users } = adminList || "";
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className="table-header-row">
            <TableRow className="table-header" align="left">
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(users || []).map((user, index) => (
              <React.Fragment key={user.id}>
                <TableRow
                  align="center"
                  key={user.id}
                  onClick={()  => handleExpandClick(user.id)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.phone}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      aria-label="expand row"
                      onClick={() => handleExpandClick(user.id)}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={10}>
                    <Collapse
                      in={expandedRow[user.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: "650", width: "100" }}
                          aria-label="simple table"
                        >
                          <TableHead className="table-header-row">
                            <TableRow className="table-header">
                              <TableCell>Farm Name</TableCell>
                              <TableCell>Farm Area</TableCell>
                              <TableCell>No of Zone</TableCell>
                              <TableCell align="right"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {(user.user.FarmUserMapping || []).map(
                              (farm, uIndex) => (
                                <React.Fragment key={user.id + farm.id}>
                                  <TableRow key={user.id + farm.id}>
                                    <TableCell component="th" scope="row">
                                      {farm.farm.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      {farm.farm.farmArea}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      {farm.farm.zones.length}
                                    </TableCell>
                                    <TableCell align="right">
                                      <IconButton
                                        aria-label="expand row"
                                        onClick={() => handleZoneExpandClick(user.id + farm.id)}
                                      >
                                        <ExpandMoreIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell colSpan={10}>
                                      <Collapse
                                        in={expandedZoneRow[user.id + farm.id]}
                                        timeout="auto"
                                        unmountOnExit
                                      >
                                        <TableContainer component={Paper}>
                                          <Table
                                            sx={{
                                              minWidth: "650",
                                              width: "100",
                                            }}
                                            aria-label="simple table"
                                          >
                                            <TableHead className="table-header-row">
                                              <TableRow
                                                className="table-header"
                                                onClick={() => handleZoneExpandClick(user.id + farm.id)}
                                                sx={{
                                                  "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                                }}
                                              >
                                                <TableCell>Zone Name</TableCell>
                                                <TableCell>Zone Area</TableCell>
                                                <TableCell align="right"></TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {(farm.farm.zones || []).map(
                                                (zone, index) => (
                                                  <React.Fragment key={zone.id}>
                                                    <TableRow key={zone.id}>
                                                      <TableCell
                                                        component="th"
                                                        scope="row"
                                                      >
                                                        {zone.name}
                                                      </TableCell>
                                                      <TableCell
                                                        component="th"
                                                        scope="row"
                                                      >
                                                        {zone.farmArea}
                                                      </TableCell>
                                                    </TableRow>
                                                    <TableRow></TableRow>
                                                  </React.Fragment>
                                                )
                                              )}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
