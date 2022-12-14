import React, { useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebaseConfig/Firebase";
import { ref, update } from "firebase/database";
import DesTable from "../../Components/desTable/DesTable";
import Swal from "sweetalert2";
import TableModal from "../../Components/modal/TableModal";
import CompanyTable from "../../Components/tables/CompanyTable";
import AdminTable from "../../Components/tables/AdminTable";
import Loader from "../../Components/loader/Loader";

const className = {
  modalMain: "CompanyModal",
};

const Admin = () => {
  const state = useSelector((state) => state);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const user = Object.values(state?.companyJobPost);

  const studentApplyCheak = Object.values(state?.accounts);

  const cheackData = studentApplyCheak?.filter((ele) => {
    return ele?.role === "Student" && !!id && id?.includes(ele?.uid);
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

  return (
    <>
      {state?.user?.uid ? (
        !user?.length ? (
          state?.jobPostLoading ? (
            <Loader />
          ) : (
            <div className="adminNotData">
              <h3>Company Posted Jobs Not available sorry?</h3>
            </div>
          )
        ) : (
          <CompanyTable appliedCheck={ApplyCheack} comTab={user} />
        )
      ) : (
        <Loader />
      )}
      {state?.user?.uid? !updateArr?.length ? (
        state?.accountsLoading ? (
          <Loader />
        ) : (
          <div className="adminNotData">
            <h3>User Request Not Available?</h3>
          </div>
        )
      ) : (
        <AdminTable Accept={Accept} admTab={updateArr} />
      ):<Loader />}

      <TableModal
        open={open}
        Cancel={Cancel}
        users={cheackData}
        DesTable={DesTable}
        className={className}
        title="Student Applied Check"
      />
    </>
  );
};

export default Admin;
