import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Components/navbar/Navbar";
// import SimpleTable from "../../Components/simpleTable/SimpleTable";
import Table from "../../Components/table/Table"
// import { IconButton} from "@mui/material";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";

const StudentAppledJobs = () => {
  const Student = [{ name: "Student", url: "Back", link: "/" }];
  const state = useSelector((state) => state);

  const data = Object.entries(state?.companyJobPost);
  const companyUpdate = data
    .map((ele) => ele.splice(1, 2))
    .flatMap((ele) => ele);

  console.log(companyUpdate);
  const applied = companyUpdate.filter((ele) => {
    return ele.studentId
      ? ele.studentId.includes(state.uid)
      : [] && ele.experiance?.toLowerCase() === state.accounts.experiance;
  });

  return (
    <div>
      <Navbar data={Student} />
      <Table
        data={applied}
        AppsSharpIcon={AppsSharpIcon}
      />
    </div>
  );
};

export default StudentAppledJobs;
