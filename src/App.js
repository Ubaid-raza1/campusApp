import React, { useEffect } from "react";
import Router from "./router/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch} from "react-redux";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase/Firebase";
import { UID, USER, COMPANYJOBPOSTED, ACCOUNTS } from "../src/reducer/Action";

const App = () => {

  const dispatch = useDispatch();
  const auth = getAuth();
  const getData = (uid) => {
    const user = ref(database, "Accounts/" + uid);
    onValue(user, (snapshot) => {
      dispatch({ type: USER, payload: snapshot.val() });
    });
    const accounts = ref(database, "Accounts/");
    onValue(accounts, (snapshot) => {
      if (snapshot) {
        dispatch({ type: ACCOUNTS, payload: snapshot.val() });
      } else dispatch({ type: ACCOUNTS, payload: false });
    });
    const companyJobPost = ref(database, "CompanyPostJob/");
    onValue(companyJobPost, (snapshot) => {
      if (snapshot) {
        dispatch({ type: COMPANYJOBPOSTED, payload: snapshot.val() });
      } else dispatch({ type: COMPANYJOBPOSTED, payload: false });
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: UID, payload: user.uid });
        getData(user.uid);
      } else {
        dispatch({ type: UID, payload: false });
        dispatch({ type: USER, payload: false });
        dispatch({ type: ACCOUNTS, payload: false });
        dispatch({ type: COMPANYJOBPOSTED, payload: true });
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
