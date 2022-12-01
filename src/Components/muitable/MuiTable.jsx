import React from "react";
import MuiTableHelper from "./MuiTableHelper";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import "./Mui.css";
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
                return (
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {item}
                  </StyledTableCell>
                );
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
                        <StyledTableCell style={{ textAlign: "center" }}>
                          {item?.role}
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: "center" }}>
                          {item?.name}
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: "center" }}>
                          {item?.email}
                        </StyledTableCell>
                      </>
                    ) : (
                      item?.role === "jobPost" && (
                        <>
                          <StyledTableCell style={{ textAlign: "center" }}>
                            {item?.companyName}
                          </StyledTableCell>
                          <StyledTableCell style={{ textAlign: "center" }}>
                            {item?.jobCategory}
                          </StyledTableCell>
                          <StyledTableCell style={{ textAlign: "center" }}>
                            {item?.experiance}
                          </StyledTableCell>
                        </>
                      )
                    )}
                  </>
                ) : (
                  <>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {item?.companyName}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {item?.education}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {item?.jobCategory}
                    </StyledTableCell>
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {item?.experiance}
                    </StyledTableCell>
                  </>
                )}

                {state?.role === "Company" ? (
                  AppsSharpIcon ? (
                    <StyledTableCell style={{ textAlign: "center" }}>
                      <IconButton onClick={() => Check(item?.studentId, i + 1)}>
                        <AppsSharpIcon color="primary"/>
                      </IconButton>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell style={{ textAlign: "center" }}> 
                      <IconButton onClick={() => Delete(item?.id)}>
                        <DeleteIcon color="error"/>
                      </IconButton>
                    </StyledTableCell>
                  )
                ) : state?.role === "Student" ? (
                  <StyledTableCell style={{ textAlign: "center" }}>Applied</StyledTableCell>
                ) : state?.role === "Admin" ? (
                  item?.role === "Student" || item?.role === "Company" ? (
                    <StyledTableCell style={{ textAlign: "center" }}>
                      {Icon ? (
                        <div
                          className="approved-btn"
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div>
                            <SimpleButton
                              value="confirm"
                              Variant="contained"
                              startIcon={<Icon />}
                              onClick={()=>Accept(item?.uid)}
                            />
                          </div>
                          <div>
                            <SimpleButton
                              value="Delete"
                              Variant="outlined"
                              color="error"
                              startIcon={<Icon2 />}
                              onClick={()=>Reject(item?.uid)}
                            />
                          </div>
                        </div>
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
                      <StyledTableCell style={{ textAlign: "center" }}>
                        <SimpleButton
                          value="Check"
                          Variant="outlined"
                          startIcon={<CheckIcon />}
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
