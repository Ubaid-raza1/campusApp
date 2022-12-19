import React, { useEffect } from "react";
import Router from "./router/Router";
import { useDispatch } from "react-redux";
import getData from "./dataGet";
import { UID, USER, COMPANYJOBPOSTED, ACCOUNTS } from "./reducer/Action";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getData(dispatch);
  }, []);

  return (
    <>
      <Router />
    </>
  );
};

export default App;
