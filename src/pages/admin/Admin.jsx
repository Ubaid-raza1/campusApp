import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Components/navbar/Navbar";
import { SignOut } from "../../firebase/Firebase";
import Table from "../../Components/table/Table";
import SimpleButton from "../../Components/button/Button";
import DesTable from "../../Components/desTable/DesTable";
import Modal from "../../Components/modal/Modals";
import { database } from "../../firebase/Firebase";
import { ref, update } from "firebase/database";

let admin = [
  { name: "Admin Dashboard", url: "Block Setion", link: "/blockSection" },
];
const className = {
  table_main: "table-main",
  table: "table",
  table_th: "table-th",
  table_td: "table-td",
};
const table_header = ["id", "Companies Name", "Job Post", "Experiance"];
const StuCom = ["id", "Cateogeory", "Name", "Email", "Accepted", "Rejected"];

const Admin = () => {
  const state = useSelector((state) => state);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const user = Object.entries(state.companyJobPost)
    .map((ele) => ele.splice(1, 2))
    .flatMap((item) => item);

  const studentApplyCheak = Object.entries(state?.accounts)
    .map((ele) => ele?.splice(1, 2))
    .flatMap((ele) =>
      ele?.filter((item) =>
        item?.role === "Student" && id
          ? id?.includes(item.uid)
          : []?.includes(item.uid)
      )
    );

  const accounts = Object.entries(state?.accounts)
    .map((ele) => ele?.splice(1, 2))
    .flatMap((item) => item);

  const student = accounts.filter((ele) => ele.role === "Student");
  const company = accounts.filter((ele) => ele.role === "Company");

  const ApplyCheack = (id) => {
    setId(id);
    setOpen(true);
  };
  const Cancel = () => setOpen(false);

  const Accept = (id) => {
    update(ref(database, "Accounts/" + id), {
      approved: true,
    });
    
  };
  const Reject = (id) => {
    update(ref(database, "Accounts/" + id), {
      approved: false,
    });
    
  };

  return (
    <>
      <Navbar data={admin} signOut={SignOut} />
      <Table
        User={user}
        className={className}
        header={table_header}
        SimpleButton={SimpleButton}
        ApplyCheack={ApplyCheack}
      />
      <Table
        header={StuCom}
        className={className}
        approved={student}
        SimpleButton={SimpleButton}
        Accept={Accept}
        Reject={Reject}
      />
      <Table
        header={StuCom}
        className={className}
        approved={company}
        SimpleButton={SimpleButton}
        Accept={Accept}
        Reject={Reject}
      />
      <Modal
        open={open}
        Cancel={Cancel}
        DesTable={DesTable}
        user={studentApplyCheak}
        SimpleButton={SimpleButton}
      />
    </>
  );
};

export default Admin;
