import React from "react";
import { useSelector } from "react-redux";
import { ref, remove } from "firebase/database";
import { database } from "../../firebase/Firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiTable from "../../Components/muitable/MuiTable";
import notAvailable from "../../image/notAvailable.jpg";

const className = {
  table_main: "table-main",
  table: "table",
  table_th: "table-th",
  table_td: "table-td",
};

const CompanyPostedJob = () => {
  const state = useSelector((state) => state);

  const companyPostedJob = Object.values(state?.companyJobPost);

  const postJob = companyPostedJob.filter((ele) => {
    return ele.companyId === state.uid;
  });

  const Delete = (delId) => {
    remove(ref(database, "CompanyPostJob/" + delId));
  };

  return (
    <div>
      {!!state.user.block && !!state.user.approved ? (
        postJob?.length === 0 ? (
          <div className="notAvailable">
            <span style={{ fontSize: "30px" }}>User data</span>{" "}
            <img src={notAvailable} alt="" />
          </div>
        ) : (
          <MuiTable data={postJob} Delete={Delete} DeleteIcon={DeleteIcon} />
        )
      ) : !!state?.user.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">block!</h1>
      )}
    </div>
  );
};

export default CompanyPostedJob;
