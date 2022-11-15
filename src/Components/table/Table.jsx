import { map } from "@firebase/util";
import { Check } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import "./Table.css";

const Table = ({
  data,
  Delete,
  Edit,
  IconButton,
  BorderColorIcon,
  DeleteIcon,
  Cheack,
  AppsSharpIcon,
  className,
  header,
  adminData,
  SimpleButton,
  User,
  ApplyCheack,
  approved,
  Accept,
  Reject,
}) => {
  const state = useSelector((state) => state);
  return (
    <div className={className?.table_main}>
      <table className={className?.table}>
        <thead>
          <tr>
            {state?.user?.approved === true ? (
              <React.Fragment>
                {header?.map((item) => {
                  return <th className={className?.table_th}>{item}</th>;
                })}
              </React.Fragment>
            ) : (
              state.user.adminRole === "admin" && (
                <React.Fragment>
                  {header?.map((item) => {
                    return <th className={className?.table_th}>{item}</th>;
                  })}
                </React.Fragment>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {state.user.approved === true ? (
            <React.Fragment>
              {data?.map((ele, i) => {
                return (
                  <tr>
                    <td className={className?.table_td}>{i + 1}</td>
                    <td className={className?.table_td}>{ele?.companyName}</td>
                    <td className={className?.table_td}>{ele.jobCateogeory}</td>
                    <td className={className?.table_td}>{ele.education}</td>
                    <td className={className?.table_td}>{ele.experiance}</td>
                    {IconButton ? (
                      <>
                        <td>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => Delete(ele.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td>

                        <td>
                          <IconButton
                            aria-label="delete"
                            color="success"
                            onClick={() => Edit(ele, ele.id)}
                          >
                            <BorderColorIcon />
                          </IconButton>
                        </td>
                      </>
                    ) : (
                      <td>
                        {AppsSharpIcon ? (
                          <AppsSharpIcon
                            onClick={() => Cheack(ele?.studentId, i + 1)}
                          />
                        ) : (
                          false
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </React.Fragment>
          ) : state.user.adminRole === "admin" ? (
            ""
          ) : (
            <h1>Your Request is Panding!</h1>
          )}
          {adminData?.map((item, i) => {
            return (
              <tr>
                <td className={className?.table_td}>{i + 1}</td>
                <td className={className?.table_td}>{item.role}</td>
                <td className={className?.table_td}>{item.name}</td>
                <td className={className?.table_td}>{item.email}</td>
                <td className={className?.table_td}>
                  <SimpleButton value="UnBlock" />
                </td>
                <td className={className?.table_td}>
                  <SimpleButton value="Block" />
                </td>
              </tr>
            );
          })}
          {User?.map((item, i) => {
            return (
              <tr>
                <td className={className?.table_td}>{i + 1}</td>
                <td className={className?.table_td}>{item.companyName}</td>
                <td className={className?.table_td}>{item.jobCateogeory}</td>
                <td className={className?.table_td}>{item.experiance}</td>
                <td className={className?.table_td}>
                  <SimpleButton
                    value="Cheack"
                    onClick={() => ApplyCheack(item.studentId)}
                  />
                </td>
              </tr>
            );
          })}
          {approved?.map((item, i) => {
            return (
              <tr>
                <td className={className?.table_td}>{i + 1}</td>
                <td className={className?.table_td}>{item.role}</td>
                <td className={className?.table_td}>{item.name}</td>
                <td className={className?.table_td}>{item.email}</td>
                <td className={className?.table_td}>
                  <SimpleButton
                    value="Accept"
                    onClick={() => Accept(item.uid)}
                  />
                </td>
                <td className={className?.table_td}>
                  <SimpleButton
                    value="Reject"
                    onClick={() => Reject(item.uid)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
