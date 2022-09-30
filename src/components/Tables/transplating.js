import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, type, hieght, rate, quantity) {
  return { name, type, hieght, rate, quantity};
}

const rows = [
  createData('Transplant Name', 159, 6.0, 24, 4.0),
  createData('Transpalnt Type', 237, 9.0, 37, 4.3),
  createData('Transpalnt Height', 262, 16.0, 24, 6.0),
  createData('Transpalnt rate', 305, 3.7, 67, 4.3),
  createData('Transpalnt,quantity', 356, 16.0, 49, 3.9),
];

export default function TransPalntTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow  sx={{
      "& th": {
        color: "white",
        backgroundColor: "pink"
      }
    }}>
            <TableCell>Transpalnt Name</TableCell>
            <TableCell align="right">Transpalnt Type</TableCell>
            <TableCell align="right">Transpalnt hieght</TableCell>
            <TableCell align="right"> Transpalnt Rate</TableCell>
            <TableCell align="right">Transpalnt Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.hieght}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
