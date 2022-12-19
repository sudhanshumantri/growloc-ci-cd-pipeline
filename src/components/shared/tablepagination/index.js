import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

const TableDynamicPagination = ({ count, handleChangePagination, component,isWhite
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handlePagination(rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    handlePagination(+event.target.value, 0);
  };

  const handlePagination = (rowsCount, pageNo) => {
    const params = {
      skip: pageNo * rowsCount,
      take: rowsCount,
    };
    handleChangePagination(params);
  };
  return (
    <>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        count={count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        component ="div"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableDynamicPagination;
