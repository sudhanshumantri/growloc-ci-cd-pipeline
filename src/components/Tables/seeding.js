import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, quantity, quality, rate, type) {
  return { name, quantity, quality, rate, type };
}

const rows = [
  createData('Seed Name', 159, 6.0, 24, 4.0),
  createData('Seed Quantity', 237, 9.0, 37, 4.3),
  createData('Seed Quality', 262, 16.0, 24, 6.0),
  createData('Seed Rate', 305, 3.7, 67, 4.3),
  createData('Seed Type', 356, 16.0, 49, 3.9),
];

export default function SeedingTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow  sx={{
      "& th": {
        color: "white",
        backgroundColor: "blue"
      }
    }}
>
            <TableCell>Seed Name</TableCell>
            <TableCell align="right"> Seed Quantity</TableCell>
            <TableCell align="right">Seed Type</TableCell>
            <TableCell align="right">Seed Wight</TableCell>
            <TableCell align="right">Seed Qulaity</TableCell>
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
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.quality}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
