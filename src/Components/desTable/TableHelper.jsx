// import React from "react";
import { useSelector } from "react-redux";

const TableHelper = () => {
  const state = useSelector((state) => state);
  const student = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "companyName", headerName: "Company Name", width: 200 },
    { field: "jobCateogeory", headerName: "JobCateogeory", width: 200 },
    { field: "education", headerName: "Education", width: 200 },
    { field: "experiance", headerName: "Experiance", width: 200 },
  ];
  const company = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "companyName", headerName: "Company Name", width: 200 },
    { field: "jobCateogeory", headerName: "JobCateogeory", width: 200 },
    { field: "education", headerName: "Education", width: 200 },
    { field: "experiance", headerName: "Experiance", width: 200 },
    { field: "apllied", headerName: "Apllied", width: 200 },
  ];
  return state.user.role === "Student"
    ? student
    : state?.user?.role === "Company"
    ? company
    : [];
};

export default TableHelper;
