import React from "react";
import { useSelector } from "react-redux";
// import MuiTable from "../../Components/muitable/MuiTable";
// import StudentTable from "../../Components/muitable/studentTable";
import StudentTable from "../../Components/tables/StudentTable";
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
        !applied?.length ? (
          !!state?.user ||
          (!!state?.companyJobPost && (
            <div className="notAvailable">
              <span style={{ fontSize: "30px" }}>Applied Jobs</span>
              <img src={notAvailable} alt="" />
            </div>
          ))
        ) : (
          <StudentTable tabStu={applied} />
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
