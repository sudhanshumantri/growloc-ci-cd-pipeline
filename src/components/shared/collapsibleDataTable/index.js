import * as React from "react";
import moment from "moment";
// import Paper from "@mui/material/Paper";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material/";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { SEVERITY_LEVEL } from "../../../config";
// import Chip from '@mui/material/Chip';

import "./style.css";

function Row({ row, handleCommentModalToggle }) {
  const [open, setOpen] = React.useState(false);
  const formatSerityLevel = (value) => {
    const sLevel = SEVERITY_LEVEL.find((level) => level.value === value) || {};
    return sLevel.name || "-";
  };
  const formatDueDate = (dueDate) => {
    const a = moment(dueDate);
    const b = moment(new Date()).format("YYYY-MM-DD");
    const diff = a.diff(b, "days");
    console.log(diff, "diff");
    if (diff === 1) {
      return "Tommorow";
    } else if (diff === 0) {
      return "Today";
    } else {
      return moment(dueDate).format("DD-MM-YYYY");
    }
  };
  // format("YYYY-MM-DD");
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
          {row.createdByProfile.name}
        </TableCell>

        {/* <TableCell className="table-header" align="left">
          {moment(row.createdOn).format("YYYY-MM-DD")}
        </TableCell> */}
        <TableCell className="table-header" align="left">
          -
        </TableCell>
        <TableCell className="table-header" align="left">
          <Chip
            label={formatDueDate(row.dueDate)}
            style={{ backgroundColor: "#EB955D" }}
          />
        </TableCell>
        <TableCell className="table-header" align="left">
          {/* <Typography className="table-servity" style={{backgroundColor:((row.severity === 0 && "red" ) || (row.severity === 1 && "#EB955D")  )}}></Typography>  */}
          <Chip
            label={formatSerityLevel(row.severity)}
            style={{
              backgroundColor:
                (row.severity === 0 && "red") ||
                (row.severity === 1 && "#EB955D"),
            }}
          />
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <p className="label-light label-bold">History</p>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row.TasksHistory || []).map((historyRow) => (
                    <TableRow key={historyRow.createdOn}>
                      <TableCell>
                        {moment(historyRow.createdOn).format(
                          "YYYY-MM-DD: hh:mm:ss "
                        )}
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
              <TableCell key={index} align="left">
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
