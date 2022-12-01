import React, { useState } from "react";
import { useSelector } from "react-redux";
import SimpleButton from "../../Components/button/Button";
import Modal from "../../Components/modal/Modals";
import { database } from "../../firebase/Firebase";
import { ref, update } from "firebase/database";
import MuiTable from "../../Components/muitable/MuiTable";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DesTable from "../../Components/desTable/DesTable";

const className = {
  table_main: "table-main",
  table: "table",
  table_th: "table-th",
  table_td: "table-td",
};
const table_header = ["id", "Companies Name", "Job Post", "Experiance"];
const StuCom = ["id", "Cateogeory", "Name", "Email", "Accepted", "Rejected"];

const Admin = () => {
  // const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const user = Object.values(state?.companyJobPost);

  const studentApplyCheak = Object.values(state?.accounts);

  const cheackData = studentApplyCheak.filter((ele) => {
    return ele?.role === "Student" && id
      ? id?.includes(ele.uid)
      : []?.includes(ele.uid);
  });

  const accounts = Object.values(state?.accounts);
  const arr = accounts?.filter(
    (ele) => ele?.role === "Student" || ele?.role === "Company"
  );
  const updateArr = arr?.filter((item) => !item?.approved && !item?.reject);

  const ApplyCheack = (id) => {
    setId(id);
    setOpen(true);
  };
  const Cancel = () => setOpen(false);

  const Accept = async (id) => {
    await update(ref(database, "Accounts/" + id), {
      approved: true,
    });
  };
  const Reject = async (id) => {
    console.log(id);
    await update(ref(database, "Accounts/" + id), {
      reject: true,
    });
  };

  return (
    <>
      {user?.length === 0 ? (
        <div className="adminNotData">
          <h3>Company Posted Jobs Not available sorry?</h3>
        </div>
      ) : (
        <MuiTable
          data={user}
          SimpleButton={SimpleButton}
          ApplyCheack={ApplyCheack}
        />
      )}
      {updateArr?.length === 0 ? (
       <div className="adminNotData">
       <h3>Accounts Not Available?</h3>
     </div>
      ) : (
        <MuiTable
          data={updateArr}
          SimpleButton={SimpleButton}
          Accept={Accept}
          Reject={Reject}
          Icon={ThumbUpAltIcon}
          Icon2={ThumbDownIcon}
        />
      )}

      <Modal
        open={open}
        Cancel={Cancel}
        user={cheackData}
        DesTable={DesTable}
        SimpleButton={SimpleButton}
      />
    </>
  );
};

export default Admin;
