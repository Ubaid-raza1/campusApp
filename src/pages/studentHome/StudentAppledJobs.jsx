import React from "react";
import { useSelector } from "react-redux";
import MuiTable from "../../Components/muitable/MuiTable";

const className = {
  table_main: "table-main",
  table: "table",
};

const StudentAppledJobs = () => {
  const state = useSelector((state) => state);

  const studentApplied = Object.values(state?.companyJobPost);

  const applied = studentApplied.filter((ele) => {
    return ele.studentId
      ? ele.studentId.includes(state.uid)
      : [] && ele.experiance?.toLowerCase() === state.accounts.experiance;
  });

  return (
    <div>
      {!!state.user.block && !!state.user.approved ? (
        <MuiTable data={applied}/>
        // <DesTable user={applied} mainStyle={className} />
      ) : !!state?.user.block ? (
        <h1 id="approved">Sorry!</h1>
      ) : (
        <h1 id="approved">block!</h1>
      )}
    </div>
  );
};

export default StudentAppledJobs;
