import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import moment from "moment";
function DataTable({ data }) {
  const { headers, rows } = data;
  const handleRedirection = (key) => {};
  const validateValue = (row, key) => {
    if (key.indexOf(".") > -1) {
      const keys = key.split(".");
      const value = keys.reduce((a, v) => a[v], row);
      return value;
    } else {
      return row[key];
    }
  };
  const renderButtonArray = (buttonArray, rowData) => {
    return buttonArray.map((item, index) => {
      return <Button key={index+item.label} onClick={()=>item.handler(rowData)}>{item.label}</Button>;
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="table-header-row">
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.id} className="table-header" align="left">
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              align="center"
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((header) => {
                if (header.redirection) {
                  return (
                    <TableCell
                      key={row.id + header.id}
                      component="td"
                      scope="row"
                    >
                      <a
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        href={header.baseEndPoint + row[header.redirectionKey]}
                      >
                        {validateValue(row, header.key)}
                      </a>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      key={row.id + header.id}
                      component="td"
                      scope="row"
                    >
                      {header.isButton ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {renderButtonArray(header.buttonArray, row)}
                        </div>
                      ) : header.isDate ? (
                        moment(validateValue(row, header.key)).format(
                          "YYYY-MM-DD"
                        )
                      ) : (
                        validateValue(row, header.key)
                      )}
                    </TableCell>
                  );
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
