import React, { useState } from "react";
import "./CompanyHome.css";
import Button from "../../Components/button/Button";
import { database } from "../../firebase/Firebase";
import { useSelector } from "react-redux";
import { ref, set } from "firebase/database";
import Menues from "../../Components/menu/Menu";
import InputTextFields from "../../Components/inputTextFields/InputTextFields";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  const jobPostHandler = (data) => {
    const postListRef = ref(database, "/CompanyPostJob/" + id);
    set(postListRef, {
      jobCategory: data.jobCategory,
      experiance: data.experiance,
      education: data.education,
      companyId: state.uid,
      id: id,
      studentId: false,
      companyName: state.user.name,
      role: "jobPost",
      address: data.location,
    });
  };

  const formik = useFormik({
    initialValues: {
      jobCategory: "",
      location: "",
      education: "",
      experiance: "",
    },

    validationSchema: Yup.object({
      jobCategory: Yup.string()
        .max(40, "job Category in Must be 40 characters or less")
        .required("Required"),
      location: Yup.string()
        .max(100, "Address in Must be 100 characters or less")
        .required("Required"),
    }),

    onSubmit: jobPostHandler,
  });
  return (
    <div className="company">
      {!!state.user.block && !!state.user.approved ? (
        <div className="postForm">
          <form className="CompanyForm" onSubmit={formik.handleSubmit}>
            <h1 className="postHead">Post Jobs!</h1>
            <InputTextFields
              Lable="Job Category"
              className={"company-input"}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.jobCategory}
              name="jobCategory"
              size="small"
            />
            {formik.touched.jobCategory && formik.errors.jobCategory ? (
              <div className="error">{formik.errors.jobCategory}</div>
            ) : null}
            <InputTextFields
              Lable="Address"
              className={"company-input"}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.location}
              multiline
              rows={4}
              name="location"
              size="small"
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="error">{formik.errors.location}</div>
            ) : null}
            <Menues
              menuData={InputSelect2}
              className={"company-input"}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.education}
              name="education"
              // value="Education"
              Lable="Education"
            />
            <Menues
              menuData={InputSelect}
              className={"company-input"}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.education}
              name="experiance"
              // value="Experiance"
              Lable="Experiance"
            />

            <Button
              value="Post"
              type="submit"
              id={"postFrom-btn"}
              Variant="contained"
              disabled={
                !formik?.values.jobCategory.trim() ||
                !formik?.values.location.trim() ||
                !formik?.values.education.trim() ||
                !formik?.values.experiance.trim()
              }
            />
          </form>
        </div>
      ) : !!state?.user.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">block!</h1>
      )}
    </div>
  );
};

export default CompanyJobPost;
