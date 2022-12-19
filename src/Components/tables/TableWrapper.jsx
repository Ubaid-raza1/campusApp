import React from "react";
import { StyledTableCell } from "./TableHelper";
import "./tables.css"

import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";

const TableWrapper = ({ header, children }) => {
  return (
    <div style={{ padding: "32px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {header?.map((head, i) => {
                return <StyledTableCell key={i}>{head}</StyledTableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableWrapper;
