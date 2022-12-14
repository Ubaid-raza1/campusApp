import { onValue, ref } from "firebase/database";
import { database } from "./firebase/Firebase";
import { UID, USER, COMPANYJOBPOSTED, ACCOUNTS } from "./reducer/Action";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getData = (dispatch) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({ type: UID, payload: user?.uid });
      const userDb = ref(database, "Accounts/" + user?.uid);
      onValue(userDb, (snapshot) => {
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
    } else {
      dispatch({ type: UID, payload: false });
      dispatch({ type: USER, payload: false });
    }
  });
};

export default getData;
