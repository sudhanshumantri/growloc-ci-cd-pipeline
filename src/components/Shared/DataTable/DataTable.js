import React from "react";
import Paper from '@mui/material/TableBody';
import Table from '@mui/material/TableBody';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';


function DataTable({data}) {
  const { headers, rows } = data;

  const handleRedirection = (key) => {
    console.log(key);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            {headers.map(header => (
              <TableCell align="center" sx={{
                color: '#757575',
                fontSize: 12,
                fontWeight: 700
              }} align="left" >{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow align="center" key={row.id}>
              {headers.map(header => {
                if (header.redirection) {
                  return (
                    <TableCell component="th" scope="row">
                      <a style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}
                        onClick={() => handleRedirection(row[header.redirectionKey])}>
                        {row[header.key]}
                      </a>
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell component="th" scope="row">
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
