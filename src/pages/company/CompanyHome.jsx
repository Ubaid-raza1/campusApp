import React, { useState } from "react";
import { useSelector } from "react-redux";
import notAvailable from "../../image/notAvailable.jpg";
import TableModal from "../../Components/modal/TableModal";
import CompanyTable from "../../Components/tables/CompanyTable";

const className = {
  modalMain: "CompanyModal",
};

const CompanyHome = () => {
  const [user, setUser] = useState();

  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const companyApplied = Object.values(state?.companyJobPost);

  const postJob = companyApplied.filter((ele) => {
    return ele?.companyId === state?.uid && ele?.studentId;
  });

  const array = Object.values(state?.accounts);

  const Check = (arr) => {
    setOpen(true);
    const check = array?.filter((ele, i) => arr?.includes(ele?.uid));
    setUser(check);
  };

  const Cancel = () => setOpen(false);
  return (
    <div>
      {state?.companyJobPost && (
        <>
          {!!state?.user && !!state?.user?.block && !!state?.user?.approved ? (
            !postJob?.length ? (
              (!!state?.companyJobPost && (
                <div className="notAvailable">
                  <span style={{ fontSize: "30px" }}>Student Applieds Job</span>
                  <img src={notAvailable} alt="notAvailable" />
                </div>
              ))
            ) : (
              <CompanyTable comTab={postJob} appliedCheck={Check} />
            )
          ) : !!state?.user?.block ? (
            <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
          ) : (
            <h1 id="approved">You are Block Please Contact Admin!</h1>
          )}
          <TableModal
            open={open}
            Cancel={Cancel}
            users={user}
            className={className}
            title="Student Applied Check"
          />
        </>
      )}
    </div>
  );
};

export default CompanyHome;
