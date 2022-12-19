import { IconButton } from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from "./TableHelper";
import TableWrapper from "./TableWrapper";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import "./tables.css";

const company = [
  "#",
  "Company Name",
  "Education",
  "Job Category",
  "Experiance",
  "Action",
];
const CompanyTable = ({ comTab, appliedCheck, deleteJob }) => {
  return (
    <TableWrapper header={company}>
      {comTab?.map((item, i) => {
        return (
          <StyledTableRow>
            <StyledTableCell>{i + 1}</StyledTableCell>
            <StyledTableCell>{item?.companyName}</StyledTableCell>
            <StyledTableCell>{item?.education}</StyledTableCell>
            <StyledTableCell>{item?.jobCategory}</StyledTableCell>
            <StyledTableCell>{item?.experiance}</StyledTableCell>
            <StyledTableCell>
              {appliedCheck && (
                <IconButton onClick={() => appliedCheck(item?.studentId)}>
                  <AppsSharpIcon color="primary" />
                </IconButton>
              )}
              {deleteJob && (
                <IconButton onClick={() => deleteJob(item?.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              )}
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </TableWrapper>
  );
};

export default CompanyTable;
