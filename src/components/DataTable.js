import React from "react";
import Paper from '@mui/material/TableBody';
import Table from '@mui/material/TableBody';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function DataTable({ title, data }) {
  const headers = Object.keys(data[0]);
  return (
    <Paper>
      <Typography variant="h4" color="inherit">
        {title}
      </Typography>
      <hr />

      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell align="right">{header.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((emp, index) => (
            <TableRow key={index}>
              {headers.map(header => (
                <TableCell align="right">{emp[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

DataTable.defaultProps = {
  title: "Dynamic Table"
};

export default DataTable;
