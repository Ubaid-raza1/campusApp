import React from "react";
import MuiTableHelper from "./MuiTableHelper";
import { useSelector } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  styled,
  tableCellClasses,
  TableCell,
  Paper,
  IconButton,
  ThumbUpIcon,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MuiTable = ({
  data,
  AppsSharpIcon,
  Check,
  Delete,
  DeleteIcon,
  block,
  unBlock,
  SimpleButton,
  ApplyCheack,
  Icon,
  Icon2,
  Accept,
  Reject,
}) => {
  const state = useSelector((state) => state.user);
  return (
    <div style={{ padding: "32px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {MuiTableHelper(data)?.map((item) => {
                return <StyledTableCell>{item}</StyledTableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, i) => (
              <StyledTableRow>
                {state?.role === "Admin" ? (
                  <>
                    {item?.role === "Student" || item?.role === "Company" ? (
                      <>
                        <StyledTableCell>{item?.role}</StyledTableCell>
                        <StyledTableCell>{item?.name}</StyledTableCell>
                        <StyledTableCell>{item?.email}</StyledTableCell>
                      </>
                    ) : (
                      item?.role === "jobPost" && (
                        <>
                          <StyledTableCell>{item?.companyName}</StyledTableCell>
                          <StyledTableCell>
                            {item?.jobCateogeory}
                          </StyledTableCell>
                          <StyledTableCell>{item?.experiance}</StyledTableCell>
                        </>
                      )
                    )}
                  </>
                ) : (
                  <>
                    <StyledTableCell>{item?.education}</StyledTableCell>
                    <StyledTableCell>{item?.jobCateogeory}</StyledTableCell>
                    <StyledTableCell>{item?.experiance}</StyledTableCell>
                  </>
                )}

                {state?.role === "Company" ? (
                  AppsSharpIcon ? (
                    <StyledTableCell>
                      <IconButton onClick={() => Check(item?.studentId, i + 1)}>
                        <AppsSharpIcon />
                      </IconButton>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell>
                      <IconButton onClick={() => Delete(item?.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  )
                ) : state?.role === "Student" ? (
                  <StyledTableCell>Applied</StyledTableCell>
                ) : state?.role === "Admin" ? (
                  item?.role === "Student" || item?.role === "Company" ? (
                    <StyledTableCell>
                      {Icon ? (
                        <>
                          <IconButton color="primary">
                            <Icon onClick={() => Accept(item?.uid)} />
                          </IconButton>
                          <IconButton color="error">
                            <Icon2 onClick={() => Reject(item?.uid)} />
                          </IconButton>
                        </>
                      ) : !!item.block ? (
                        <SimpleButton
                          Variant="contained"
                          color="error"
                          value="block"
                          onClick={() => block(item?.uid)}
                        />
                      ) : (
                        <SimpleButton
                          Variant="contained"
                          value="Unblock"
                          onClick={() => unBlock(item?.uid)}
                        />
                      )}
                    </StyledTableCell>
                  ) : (
                    item?.role === "jobPost" && (
                      <StyledTableCell>
                        <SimpleButton
                          value="Check"
                          Variant="outlined" startIcon={<CheckIcon />}
                          onClick={() => ApplyCheack(item.studentId)}
                        />
                      </StyledTableCell>
                    )
                  )
                ) : (
                  false
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default MuiTable;
