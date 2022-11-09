import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Components/navbar/Navbar";
import SimpleTable from "../../Components/simpleTable/SimpleTable";
import { SignOut } from "../../firebase/Firebase";

const CompanyHome = () => {
  const state = useSelector((state) => state);
  console.log(state.accounts);
  let company = [
    { name: "Company", url: "Job Post", link: "/CompanyJobPost" },
    { url: "Posted Job", link: "/CompanyPostedJob" },
  ];

  const student = Object.entries(state?.companyJobPost);
  const companyUpdate = student
    ?.map((ele) => ele?.splice(1, 2))
    .flatMap((ele) => ele);

  const postJob = companyUpdate.filter((ele) => {
    return ele.companyId === state.uid && ele.studentId;
  });

  return (
    <div>
      <Navbar data={company} signOut={SignOut} />
      <SimpleTable apply={postJob} />
    </div>
  );
};

export default CompanyHome;
