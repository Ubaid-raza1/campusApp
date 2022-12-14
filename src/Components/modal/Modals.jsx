import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Modals.css";

const InputSelect = [
  { Lable: "Fresher", Value: "fresher" },
  { Lable: "Junior", Value: "junior" },
  { Lable: "Senior", Value: "senior" },
];
const Modals = ({
  open,
  SimpleButton,
  Cancel,
  DesTable,
  user,
  data,
  className,
  CloseIcon,
  PersonIcon,
  WorkIcon,
  LocationOnIcon,
  ExplicitIcon,
  SchoolIcon,
  profile,
  Input,
  Menu,
  profileEditHandler,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      experiance: "",
    },
    validationSchema: Yup?.object({
      name: Yup?.string()
        .required("Required")
        .max(30, "Must be 30 Characters or Less"),
    }),

    onSubmit: profileEditHandler,
  });
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ minHeight: "500px" }}
      >
        <Box className={className?.modalMain}>
          {data ? (
            <div>
              <div className="closeBtn">
                <div className="modalheader">Job Detail</div>
                <div>
                  <CloseIcon onClick={Cancel} />
                </div>
              </div>
              {data?.map((item) => {
                return (
                  <div className="jobDetail">
                    <div className="underText">
                      <span className="underIcon">
                        <PersonIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Company Name:</b>
                        </div>
                        <div>{item?.companyName}</div>
                      </div>
                    </div>

                    <div className="underText">
                      <span className="underIcon">
                        <WorkIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Job Category:</b>
                        </div>
                        <div>{item?.jobCategory}</div>
                      </div>
                    </div>
                    <div className="underText">
                      <span className="underIcon">
                        <SchoolIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Required Education:</b>
                        </div>
                        <div>{item?.education}</div>
                      </div>
                    </div>
                    <div className="underText">
                      <span className="underIcon">
                        <ExplicitIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Required Experiance:</b>
                        </div>
                        <div>{item?.experiance}</div>
                      </div>
                    </div>
                    <div className="underText">
                      <span className="underIcon">
                        <LocationOnIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Address:</b>
                        </div>
                        <div>{item?.address}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : profile ? (
            <div className="profileMain">
              <div className="profileEditHeader">
                <div>Profile Edit</div>
                <div>
                  <CloseIcon onClick={Cancel} />
                </div>
              </div>
              <form className="profileEditForm" onSubmit={formik?.handleSubmit}>
                <div className="profile">
                  <div className="profileEditText">Name:</div>
                  <div className="profileEditInput">
                    <Input
                      defaultValue={profile?.name}
                      className="profileInput"
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      name="name"
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="error">{formik.errors.name}</div>
                    ) : null}
                  </div>
                </div>
                {profile?.role === "Student" && (
                  <div className="profile">
                    <div className="profileEditText">Experiance:</div>
                    <div className="profileEditInput">
                      <Menu
                        menuData={InputSelect}
                        defaultValue={profile?.experiance}
                        className="profileMenu"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        name="experiance"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <SimpleButton
                    value="Update"
                    color="success"
                    Variant="outlined"
                    disabled={
                      !formik?.values?.name.trim() ||
                      profile?.name === formik?.values?.name ||
                      !formik?.values?.experiance.trim()  
                    }
                    type="submit"
                  />
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="modalTableHeader">
                <div className="tableText">Student Applied Check</div>
                <div>
                  <CloseIcon onClick={Cancel} />
                </div>
              </div>

              <DesTable user={user} />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Modals;
