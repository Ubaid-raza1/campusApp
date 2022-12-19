import React from "react";
import TableWrapper from "./TableWrapper";
import { StyledTableRow, StyledTableCell } from "./TableHelper";
import "./tables.css";
const student = [
  "#",
  "Company Name",
  "Education",
  "Job Category",
  "Experiance",
  " ",
];

const StudentTable = ({ tabStu }) => {
  return (
    <TableWrapper header={student}>
      {tabStu.map((item, i) => {
        return (
          <StyledTableRow>
            <StyledTableCell>{i + 1}</StyledTableCell>
            <StyledTableCell>{item?.companyName}</StyledTableCell>
            <StyledTableCell>{item?.education}</StyledTableCell>
            <StyledTableCell>{item?.jobCategory}</StyledTableCell>
            <StyledTableCell>{item?.experiance}</StyledTableCell>
            <StyledTableCell>Apllied</StyledTableCell>
          </StyledTableRow>
        );
      })}
    </TableWrapper>
  );
};

export default StudentTable;
