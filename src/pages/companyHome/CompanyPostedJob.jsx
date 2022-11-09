import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Components/navbar/Navbar";
import Table from "../../Components/table/Table";


const CompanyPostedJob = () => {
  const state = useSelector((state) => state);

  const company = [{ name: "Company", url: "Back", link: "/" }];

  const data = Object.entries(state?.companyJobPost);
  const companyUpdate = data
    ?.map((ele) => ele?.splice(1, 2))
    .flatMap((ele) => ele);

  const postJob = companyUpdate.filter((ele) => {
    return ele.companyId === state.uid;
  });

  
  return (
    <div>
      <Navbar data={company} />
      <Table data={postJob} arr={data}/>
    </div>
  );
};

export default CompanyPostedJob;
