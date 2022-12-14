import * as React from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

import "./style.css";
function Row({ row, handleCommentModalToggle }) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          className="table-header"
          align="left"
        >
          {row.category}
        </TableCell>
        <TableCell className="table-header" align="left">
          {row.taskName}
        </TableCell>
        <TableCell className="table-header" align="left">
          {row.description}
        </TableCell>
        <TableCell className="table-header" align="left">
          {row.createdByProfile.name}
        </TableCell>
        <TableCell className="table-header" align="left">
          {moment(row.createdOn).format("YYYY-MM-DD")}
        </TableCell>
        <TableCell className="table-header" align="left">
          {row.createdForProfile.name}
        </TableCell>
        <TableCell className="table-header" align="left">
          Inventory Name
        </TableCell>
        <TableCell className="table-header" align="left">
          {moment(row.dueDate).format("YYYY-MM-DD")}
        </TableCell>
        <TableCell>
          <IconButton
            title="Add New"
            onClick={() => handleCommentModalToggle(row)}
          >
            <AddCommentOutlinedIcon sx={{ color: "#517223" }} />,
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <p className="label-light label-bold">History</p>
              <Table aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header">Date</TableCell>
                    <TableCell className="table-header">User</TableCell>
                    <TableCell className="table-header">Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row.TasksHistory || []).map((historyRow) => (
                    <TableRow key={historyRow.createdOn}>
                      <TableCell>
                        {moment(historyRow.createdOn).format("YYYY-MM-DD: hh:mm:ss ")}
                      </TableCell>
                      <TableCell>{historyRow.user?.name}</TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.comment}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ data, handleCommentModalToggle }) {
  const { headers, rows } = data;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className="table-header-row">
          <TableRow>
            <TableCell>#</TableCell>
            {headers.map((header, index) => (
              <TableCell key={index} className="table-header" align="left">
                {header.label}
              </TableCell>
            ))}
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              handleCommentModalToggle={handleCommentModalToggle}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
