import React from "react";
import { useSelector } from "react-redux";
import MuiTable from "../../Components/muitable/MuiTable";
import notAvailable from "../../image/notAvailable.jpg";


const className = {
  table_main: "table-main",
  table: "table",
};

const StudentAppledJobs = () => {
  const state = useSelector((state) => state);

  const studentApplied = Object.values(state?.companyJobPost);

  const applied = studentApplied.filter((ele) => {
    return ele?.studentId
      ? ele?.studentId.includes(state?.uid)
      : [] && ele?.experiance?.toLowerCase() === state?.accounts?.experiance;
  });

  return (
    <div>
      {!!state?.user?.block && !!state?.user?.approved ? (
        applied?.length === 0 ? (
          <div className="notAvailable">
            <span style={{ fontSize: "30px" }}>Applied Jobs</span>
            <img src={notAvailable} alt="" />
          </div>
        ) : (
          <MuiTable data={applied} />
        )
      ) : !!state?.user?.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">You are Block Please Contact Admin!</h1>
      )}
    </div>
  );
};

export default StudentAppledJobs;
