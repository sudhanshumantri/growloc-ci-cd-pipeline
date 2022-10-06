import React from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

function DataTable({ data }) {
  const { headers, rows } = data;
  const handleRedirection = (key) => {
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow >
            {headers.map(header => (
              <TableCell sx={{
                fontSize: 13,
                fontWeight: 600,
              }} align="left" >{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow align="center" key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {headers.map(header => {
                if (header.redirection) {
                  return (
                    <TableCell component="td" scope="row">
                      <a style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}
                        onClick={() => handleRedirection(row[header.redirectionKey])}>
                        {row[header.key]}
                      </a>
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell component="td" scope="row">
                      {row[header.key]}
                    </TableCell>
                  )
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}
export default DataTable;
