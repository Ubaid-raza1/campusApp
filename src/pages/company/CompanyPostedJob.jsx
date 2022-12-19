import React from "react";
import { useSelector } from "react-redux";
import { ref, remove } from "firebase/database";
import { database } from "../../firebase/Firebase";
import notAvailable from "../../image/notAvailable.jpg";
import Swal from "sweetalert2";
import CompanyTable from "../../Components/tables/CompanyTable";

const CompanyPostedJob = () => {
  const state = useSelector((state) => state);

  const companyPostedJob = Object.values(state?.companyJobPost);

  const postJob = companyPostedJob.filter((ele) => {
    return ele?.companyId === state?.uid;
  });

  const Delete = (delId) => {
    Swal.fire({
      title: "Do you want to Detele the Posted Job?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          remove(ref(database, "CompanyPostJob/" + delId)),
          "success"
        );
      }
    });
  };

  return (
    <div>
      {!!state?.user?.block && !!state?.user?.approved ? (
        !postJob?.length ? (
          !!state?.user ||
          (!!state?.companyJobPost && (
            <div className="notAvailable">
              <span style={{ fontSize: "30px" }}>Company Posted Job</span>
              <img src={notAvailable} alt="notAvailable" />
            </div>
          ))
        ) : (
          <CompanyTable comTab={postJob} deleteJob={Delete} />
        )
      ) : !!state?.user?.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">You are Block Please Contact Admin!</h1>
      )}
    </div>
  );
};

export default CompanyPostedJob;
