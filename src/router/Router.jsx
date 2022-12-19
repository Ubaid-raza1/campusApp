import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  adminRoutes,
  companyRoutes,
  studentRoutes,
  LoginSignup,
} from "./RoutesHalper";

import { useSelector } from "react-redux";

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
          <CircularProgress style={{ color: "black" }} />
        </Box>
      </>
    );

  const routesList = {
    admin: adminRoutes,
    company: companyRoutes,
  };
  const currentUserRoutes =
  state?.user ? routesList?.[user?.role?.toLowerCase()] || studentRoutes : []

  return (
    <React.Fragment>
      {state?.uid ? (
        <React.Fragment>
          <Navbar />
          <Routes>
            {currentUserRoutes?.map((item) => (
              <Route path={item?.path} element={<item.component />} />
            ))}
          </Routes>
        </React.Fragment>
      ) : (
        <Routes>
          {LoginSignup?.map((item) => {
            return <Route path={item?.path} element={<item.component />} />;
          })}
        </Routes>
      )}
    </React.Fragment>
  );
};

export default Router;
