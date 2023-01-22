import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export const AdminDashboard = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const users = [
    {name: 'Sudhanshu', farms: ['Farm 1', 'Farm 2', 'Farm 3']},
    {name: 'Kishore', farms: ['Farm 4', 'Farm 5']},
    {name: 'Kamal', farms: ['Farm 6']},
  ]
  return (
    <>
    <TableContainer component={Paper}>
      <Table  sx={{minWidth:"650"}}aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="expand row"
                    onClick={handleExpandClick}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Collapse in={expanded}>
                    <div>
                      {user.farms.map((farm, index) => (
                        <div key={index}>{farm}</div>
                      ))}
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
 }
  

