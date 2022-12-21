import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";

import {
  adminRoutes,
  companyRoutes,
  studentRoutes,
  LoginSignup,
} from "./RoutesHalper";
import Loader from "../Components/loader/Loader";

import { useSelector } from "react-redux";

const Router = () => {
  const state = useSelector((state) => state);
  const user = state?.user;

  if (state?.loading) return <Loader />;

  const routesList = {
    admin: adminRoutes,
    company: companyRoutes,
  };
  const currentUserRoutes = state?.uid
    ? routesList?.[user?.role?.toLowerCase()] || studentRoutes
    : LoginSignup;

  return (
    <React.Fragment>
      {state?.uid && <Navbar />}
      <Routes>
        {currentUserRoutes?.map((item) => (
          <Route path={item?.path} element={<item.component />} />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default Router;
