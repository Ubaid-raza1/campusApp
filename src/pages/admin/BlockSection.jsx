import React from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebaseConfig/Firebase";
import { update, ref } from "firebase/database";
import "./Admin.css";
import AdminTable from "../../Components/tables/AdminTable";
import Loader from "../../Components/loader/Loader";

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
      {!student?.length ? (
        state?.accountsLoading? <Loader />: (
          <div className="adminNotData">
            <h3>Students Accounts Not Available?</h3>
          </div>
        )
      ) : (
        <AdminTable admTab={student} block={block} unBlock={unBlock} />
      )}
      {!company?.length ? (
        state?.accountsLoading? <Loader />: (
          <div className="adminNotData">
            <h3>Companies Accounts Not Available?</h3>
          </div>
        )
      ) : (
        <AdminTable admTab={company} block={block} unBlock={unBlock} />
      )}
    </>
  );
};

export default BlockSection;
