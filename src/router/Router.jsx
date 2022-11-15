import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/Firebase";

import CompanyHome from "../pages/companyHome/CompanyHome";
import CompanyJobPost from "../pages/companyHome/CompanyJobPost";
import CompanyPostedJob from "../pages/companyHome/CompanyPostedJob";

import StudentHome from "../pages/studentHome/StudentHome";
import StudentAppledJobs from "../pages/studentHome/StudentAppledJobs";

import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import NotFound from "../pages/notFound/NotFound";
import Admin from "../pages/admin/Admin";
import BlockSection from "../pages/admin/BlockSection";

const Router = () => {
  const state = useSelector((state) => state);
  const role = state.user;
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "uid", payload: user.uid });

        const userId = auth.currentUser.uid;
        return onValue(
          ref(database, "/Accounts/" + userId),
          (snapshot) => {
            const userData = (snapshot.val() && snapshot.val()) || "Anonymous";
            dispatch({ type: "user", payload: userData });
            // ...

            const companyJobPost = ref(database, "Accounts/");
            onValue(companyJobPost, (snapshot) => {
              dispatch({ type: "accounts", payload: snapshot?.val() });
            });

            const starCountRef = ref(database, "CompanyPostJob/");
            onValue(starCountRef, (snapshot) => {
              dispatch({ type: "companyData", payload: snapshot?.val() });
            });
          },
          {
            onlyOnce: true,
          }
        );
      } else {
        dispatch({ type: "uid", payload: false });
      }
    });
  }, []);

  if (state?.loading) return <>Loading......</>;

  return (
    <React.Fragment>
      {state.uid ? (
        <React.Fragment>
          {role?.adminRole === "admin" ? (
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/blockSection" element={<BlockSection />} />
            </Routes>
          ) : role?.role === "Company" ? (
            <React.Fragment>
              <Routes>
                <Route path="/" element={<CompanyHome />} />
                <Route path="/CompanyJobPost" element={<CompanyJobPost />} />
                <Route
                  path="/CompanyPostedJob"
                  element={<CompanyPostedJob />}
                />
              </Routes>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Routes>
                <Route path="/" element={<StudentHome />} />
                <Route
                  path="/StuedntAppleidJobs"
                  element={<StudentAppledJobs />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Fragment>
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
