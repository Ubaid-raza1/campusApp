import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../Components/card/Card";
import Navbar from "../../Components/navbar/Navbar";
import { SignOut } from "../../firebase/Firebase";
import "./Student.css";

const StudentHome = () => {
  const Student = [
    { name: "Student", url: "Applied Jobs", link: "/StuedntAppleidJobs" },
  ];
  const state = useSelector((state) => state);
  console.log(state.uid);
  const company = Object.entries(state?.companyJobPost);
  const companyUpdate = company
    ?.map((ele) => ele?.splice(1, 2))
    .flatMap((ele) => ele);

  const postJob = companyUpdate.filter((ele) => {
    return ele.studentId ? !ele.studentId.includes(state.uid) : [];
  });

  return (
    <div className="student-main">
      <Navbar data={Student} signOut={SignOut} />
      <div className="card">
        <Cards cardData={postJob} />
      </div>
    </div>
  );
};

export default StudentHome;
