import React, { useState } from "react";
import Navbar from "../../Components/navbar/Navbar";
import "./CompanyHome.css";
import Button from "../../Components/button/Button";
import { database } from "../../firebase/Firebase";
import { useSelector } from "react-redux";
import { ref, set } from "firebase/database";
import Menues from "../../Components/menu/Menu";
import InputTextFields from "../../Components/inputTextFields/InputTextFields";

const InputSelect = [
  { Lable: "Fresher", Value: "fresher" },
  { Lable: "Junior", Value: "junior" },
  { Lable: "Senior", Value: "senior" },
];
const InputSelect2 = [
  { Lable: "Matric", Value: "matric" },
  { Lable: "Intermediat", Value: "intermediat" },
  { Lable: "Graduation", Value: "graduation" },
  { Lable: "Masters", Value: "masters" },
];

const CompanyJobPost = () => {
  const date = new Date();
  let id = date.getTime().toString();
  const state = useSelector((state) => state);

  const [data, setData] = useState({});
  const company = [{ name: "Company", url: "Back", link: "/" }];

  const Handle = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };
  const CompanyPostHan = (e) => {
    e.preventDefault();

    const postListRef = ref(database, "/CompanyPostJob/" + id);
    set(postListRef, {
      jobCateogeory: data.jobCateogeory,
      experiance: data.experiance,
      education: data.education,
      companyId: state.uid,
      id: id,
      studentId: false,
      companyName: state.user.name,
    });
  };
  return (
    <div className="company">
      <Navbar data={company} />
      <div className="CompanyForm">
        <div className="company-head">
          <h1>Job Post</h1>
        </div>
        <form id="CompanyForm" onSubmit={CompanyPostHan}>
          <InputTextFields
            Lable="Job Cateogeory"
            className={"menu"}
            onChange={(e) => Handle(e)}
            value={data.jobCateogeory}
            name="jobCateogeory"
            size="small"
          />

          <Menues
            menuData={InputSelect2}
            className={"company-input"}
            onChange={(e) => Handle(e)}
            name="education"
            value="Education"
          />
          <Menues
            menuData={InputSelect}
            className={"company-input"}
            onChange={(e) => Handle(e)}
            name="experiance"
            value="Experiance"
          />

          <Button value="Post" id={"company-btn"} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CompanyJobPost;
