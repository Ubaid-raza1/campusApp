import React from "react";
import { useSelector } from "react-redux";
import SimpleButton from "../../Components/button/Button";
import Navbar from "../../Components/navbar/Navbar";
import Table from "../../Components/table/Table";

import "./Admin.css";

const table_header = ["id", "Cateogeory", "Name", "Email", "UnBlock", "Block"];
const className = {
  table_main: "table-main",
  table: "table",
  table_th: "table-th",
  table_td: "table-td",
};

const BlockSection = () => {
  let admin = [{ name: "Admin Dashboard", url: "Back", link: "/" }];

  const state = useSelector((state) => state);

  const array = Object.entries(state.accounts)
    .map((ele) => ele.splice(1, 2))
    .flatMap((ele) => ele);
  const student = array.filter((ele) => ele.role === "Student");
  const company = array.filter((ele) => ele.role === "Company");
  return (
    <>
      <Navbar data={admin} />
      <Table
        header={table_header}
        className={className}
        adminData={student}
        SimpleButton={SimpleButton}
      />
      <Table
        header={table_header}
        className={className}
        adminData={company}
        SimpleButton={SimpleButton}
      />
    </>
  );
};

export default BlockSection;
