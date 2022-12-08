import React from "react";
import { useSelector } from "react-redux";
import SimpleButton from "../../Components/button/Button";
import { database } from "../../firebase/Firebase";
import { update, ref } from "firebase/database";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import "./Admin.css";
import MuiTable from "../../Components/muitable/MuiTable";

const table_header = ["id", "Cateogeory", "Name", "Email", "UnBlock", "Block"];
const className = {
  table_main: "table-main",
  table: "table",
  table_th: "table-th",
  table_td: "table-td",
};

const BlockSection = () => {
  const state = useSelector((state) => state);

  const blockData = Object.values(state.accounts);

  const student = blockData?.filter((ele) => ele?.role === "Student");
  const company = blockData?.filter((ele) => ele?.role === "Company");

  const block = async (id) => {
    await update(ref(database, "Accounts/" + id), {
      block: false,
    });
  };
  const unBlock = async (id) => {
    await update(ref(database, "Accounts/" + id), {
      block: true,
    });
  };
  return (
    <>
      {student?.length === 0 ? (
        <div className="adminNotData">
          <h3>Students Accounts Not Available?</h3>
        </div>
      ) : (
        <MuiTable
          data={student}
          block={block}
          unBlock={unBlock}
          SimpleButton={SimpleButton}   
        />
      )}
      {company?.length === 0 ? (
        <div className="adminNotData">
          <h3>Companies Accounts Not Available?</h3>
        </div>
      ) : (
        <MuiTable
          data={company}
          block={block}
          unBlock={unBlock}
          SimpleButton={SimpleButton}
        />
      )}
    </>
  );
};

export default BlockSection;
