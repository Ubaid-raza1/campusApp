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
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';


const className = {
  modalMain: "CompanyModal",
};

const Admin = () => {
  const state = useSelector((state) => state);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const user = Object.values(state?.companyJobPost);

  const studentApplyCheak = Object.values(state?.accounts);

  const cheackData = studentApplyCheak.filter((ele) => {
    return ele?.role === "Student" && id
      ? id?.includes(ele?.uid)
      : []?.includes(ele?.uid);
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

  const Accept = (id) => {
    Swal.fire({
      title: "Are you sure you want to Accept this User Request?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      confirmButtonColor: "#1565c0",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Accepted!",
          await update(ref(database, "Accounts/" + id), {
            approved: true,
          }),
          "success"
        );
      }
    });
  };
  const Reject = (id) => {
    Swal.fire({
      title: "Are you sure you want to Reject this User Request?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Rejected",
          await update(ref(database, "Accounts/" + id), {
            reject: true,
          }),
          "error"
        );
      }
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
        className={className}
        CloseIcon={CloseIcon}
      />
    </>
  );
};

export default Admin;
