import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import CompanyHome from "../pages/companyHome/CompanyHome";
import CompanyJobPost from "../pages/companyHome/CompanyJobPost";
import CompanyPostedJob from "../pages/companyHome/CompanyPostedJob";
import Profile from "../pages/profile/Profile";

import StudentHome from "../pages/studentHome/StudentHome";
import StudentAppledJobs from "../pages/studentHome/StudentAppledJobs";

import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
// import NotFound from "../pages/notFound/NotFound";
import Admin from "../pages/admin/Admin";
import BlockSection from "../pages/admin/BlockSection";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Router = () => {
  const state = useSelector((state) => state);
  const user = state?.user;

  if (state?.loading)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress  style={{color:"black"}}/>
        </Box>
      </>
    );
  return (
    <React.Fragment>
      {state.uid ? (
        <React.Fragment>
          <Navbar Role={user} />
          {user?.role === "Admin" ? (
          
              <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="/blockSection" element={<BlockSection />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
          
          ) : user?.role === "Company" ? (
            <Routes>
              <Route path="/" element={<CompanyHome />} />
              <Route path="/CompanyJobPost" element={<CompanyJobPost />} />
              <Route path="/CompanyPostedJob" element={<CompanyPostedJob />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<StudentHome />} />
              <Route
                path="/StuedntAppleidJobs"
                element={<StudentAppledJobs />}
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          )}
        </React.Fragment>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      )}
    </React.Fragment>
  );
};

export default Router;
