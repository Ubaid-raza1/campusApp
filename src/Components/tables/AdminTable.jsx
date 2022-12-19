import React from "react";
import TableWrapper from "./TableWrapper";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SimpleButton from "../button/Button";
import { StyledTableRow, StyledTableCell } from "./TableHelper";
import "./tables.css"

const Admin = ["#","Category", "Name", "Email", "Action"];

const AdminTable = ({ Accept, admTab, unBlock, block }) => {
  return (
    <TableWrapper header={Admin}>
      {admTab?.map((item,i) => {
        return (
          <StyledTableRow>
            <StyledTableCell>{i+1}</StyledTableCell>
            <StyledTableCell>{item?.role}</StyledTableCell>
            <StyledTableCell>{item?.name}</StyledTableCell>
            <StyledTableCell>{item?.email}</StyledTableCell>
            {Accept && (
              <StyledTableCell>
                <SimpleButton
                  startIcon={<ThumbUpAltIcon />}
                  value="Accept"
                  onClick={() => Accept(item?.uid)}
                  Variant="outlined"
                />
              </StyledTableCell>
            )}
            {block && (
              <StyledTableCell>
                {!!item.block ? (
                  <SimpleButton
                    value="block"
                    onClick={() => block(item?.uid)}
                    color="error"
                    Variant="outlined"
                  />
                ) : (
                  <SimpleButton
                    value="unBlock"
                    onClick={() => unBlock(item?.uid)}
                    Variant="outlined"
                  />
                )}
              </StyledTableCell>
            )}
          </StyledTableRow>
        );
      })}
    </TableWrapper>
  );
};

export default AdminTable;
