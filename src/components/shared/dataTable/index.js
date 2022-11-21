import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import "./style.css";
import AuthOutlet from "../authoutlet";
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
      return (
        <AuthOutlet
          isAuthRequired={item.isAuthRequired}
          from={item.from}
          action={item.action}
        >
          {item.type === "icon" ? (
            <IconButton
              title={item.label}
              key={index}
              color={item.color}
              onClick={() => item.handler(rowData)}
            >
              {item.icon}
            </IconButton>
          ) : (
            <Button
              key={index + item.label}
              onClick={() => item.handler(rowData)}
            >
              {item.label}
            </Button>
          )}
        </AuthOutlet>
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="table-header-row">
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} className="table-header" align="left">
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              align="center"
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((header, headerIndex) => {
                if (header.redirection) {
                  return (
                    <TableCell key={headerIndex} component="td" scope="row">
                      <AuthOutlet
                        isAuthRequired={header.isAuthRequired}
                        from={header.from}
                        action={header.action}
                        defaultReturn={validateValue(row, header.key)}
                      >
                        <a
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          href={
                            header.baseEndPoint + row[header.redirectionKey]
                          }
                        >
                          {validateValue(row, header.key)}
                        </a>
                      </AuthOutlet>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={headerIndex} component="td" scope="row">
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
                      ) : header.isBoolean ? (
                        validateValue(row, header.key) ? (
                          header.trueLabel
                        ) : (
                          header.falseLabel
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
