import React, { useEffect } from "react";
import Router from "./router/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase/Firebase";


const App = () => {
  // const state = useSelector((state) => state);
  
  const dispatch = useDispatch();
  const auth = getAuth();
  const getData = (uid) => {
    const user = ref(database, "Accounts/" + uid);
    onValue(user, (snapshot) => {
      dispatch({ type: "user", payload: snapshot.val() });
    });
    const accounts = ref(database, "Accounts/");
    onValue(accounts, (snapshot) => {
      dispatch({ type: "accounts", payload: snapshot.val() });
    });
    const companyJobPost = ref(database, "CompanyPostJob/");
    onValue(companyJobPost, (snapshot) => {
      dispatch({ type: "companyData", payload: snapshot.val() });
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "uid", payload: user.uid });
        getData(user.uid);
      } else {
        dispatch({ type: "uid", payload: false });
        dispatch({ type: "user", payload: false });
      }
    });
  }, []);
  // console.log("======>", state.uid);
  return (
    <>
      <Router />
    </>
  );
};

export default App;
