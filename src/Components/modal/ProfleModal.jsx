import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SimpleButton from "../button/Button";
import ModalWrapper from "./ModalsWrapper";
import ProfileEdit from "../profileEdit/ProfileEdit";

const InputSelect = [
  { Lable: "Fresher", Value: "fresher" },
  { Lable: "Junior", Value: "junior" },
  { Lable: "Senior", Value: "senior" },
];

const ProfileModal = ({
  profile,
  open,
  title,
  Input,
  Cancel,
  Menu,
  profileEditHandler,
  className,
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
    <ModalWrapper
      title={title}
      open={open}
      Cancel={Cancel}
      className={className}
    >
      <>
        <form className="profileEditForm" onSubmit={formik?.handleSubmit}>
          <ProfileEdit
            value="Name"
            profileForm={
              <Input
                defaultValue={profile?.name}
                className="profileInput"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                name="name"
              />
            }
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}

          {profile?.role === "Student" && (
            <ProfileEdit
              value="experiance"
              profileForm={
                <Menu
                  menuData={InputSelect}
                  defaultValue={profile?.experiance}
                  className="profileMenu"
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  name="experiance"
                />
              }
            />
          )}
          <div>
            <SimpleButton
              value="Update"
              color="success"
              Variant="outlined"
              disabled={
                !formik?.values?.name.trim() ||
                profile?.name === formik?.values?.name
              }
              type="submit"
            />
          </div>
        </form>
      </>
    </ModalWrapper>
  );
};

export default ProfileModal;
