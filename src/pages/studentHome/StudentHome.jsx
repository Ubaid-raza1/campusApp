import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../Components/card/Card";
import "./Student.css";
import noJob from "../../image/noJobs.webp"

const StudentHome = () => {
  const state = useSelector((state) => state);
  const student = Object.values(state?.companyJobPost);

  const postJob = student.filter((ele) => {
    return ele.studentId ? !ele.studentId.includes(state.uid) : [];
  });
  
  return (
    <div className="student-main">
      {!!state.user.block && !!state.user.approved ? (
        <>
          {!postJob?.length ? (
            <div className="noJobSection">
              <h2 style={{fontSize:"34px"}}>No Jobs!</h2>
              <img src={noJob} alt="noJob" className="NoJobImg" />
            </div>
          ) : (
            <div className="card">
              <Cards cardData={postJob} />
            </div>
          )}
        </>
      ) : !!state?.user.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">block!</h1>
      )}
    </div>
  );
};

export default StudentHome;
