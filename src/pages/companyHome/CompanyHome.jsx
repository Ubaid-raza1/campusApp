import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import Modals from "../../Components/modal/Modals";
import SimpleButton from "../../Components/button/Button";
import MuiTable from "../../Components/muitable/MuiTable";
import DesTable from "../../Components/desTable/DesTable";

const className = {
  table_main: "table-main",
  table: "table",
};

const CompanyHome = () => {
  const [user, setUser] = useState();

  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const companyApplied = Object.values(state?.companyJobPost);

  const postJob = companyApplied.filter((ele) => {
    return ele.companyId === state.uid && ele.studentId;
  });

  const array = Object.entries(state.accounts)
    .map((ele) => ele.splice(1, 2))
    .flatMap((ele) => ele);

  const Check = (arr) => {
    setOpen(true);
    const check = array.filter((ele, i) => arr.includes(ele.uid));
    setUser(check);
  };

  const Cancel = () => setOpen(false);

  return (
    <div>
      {!!state.user.block && !!state.user.approved ? (
        <MuiTable data={postJob} AppsSharpIcon={AppsSharpIcon} Check={Check} />
      ) : !!state?.user.block ? (
        <h1 id="approved">Sorry!</h1>
      ) : (
        <h1 id="approved">block!</h1>
      )}
      <Modals
        open={open}
        Cancel={Cancel}
        user={user}
        DesTable={DesTable}
        SimpleButton={SimpleButton}
      />
    </div>
  );
};

export default CompanyHome;
