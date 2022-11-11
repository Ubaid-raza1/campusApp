import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Components/navbar/Navbar";
import { SignOut } from "../../firebase/Firebase";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import Table from "../../Components/table/Table";
import Modals from "../../Components/modal/Modals";
import DesTable from "../../Components/desTable/DesTable";

const CompanyHome = () => {
  const [user, setUser] = useState();

  let company = [
    { name: "Company", url: "Job Post", link: "/CompanyJobPost" },
    { url: "Posted Job", link: "/CompanyPostedJob" },
  ];
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const student = Object.entries(state?.companyJobPost);
  const companyUpdate = student
    ?.map((ele) => ele?.splice(1, 2))
    .flatMap((ele) => ele);

  const postJob = companyUpdate.filter((ele) => {
    return ele.companyId === state.uid && ele.studentId;
  });

  const array = Object.entries(state.accounts)
    .map((ele) => ele.splice(1, 2))
    .flatMap((ele) => ele);

  const Cheack = (arr) => {
    setOpen(true);
    const check = array.filter((ele, i) => arr.includes(ele.uid));
    setUser(check);
  };

  const Cancel = () => setOpen(false);

  return (
    <div>
      <Navbar data={company} signOut={SignOut} />
      <Table data={postJob} Cheack={Cheack} AppsSharpIcon={AppsSharpIcon} />
      <Modals open={open} Cancel={Cancel} DesTable={DesTable} user={user} />
    </div>
  );
};

export default CompanyHome;
