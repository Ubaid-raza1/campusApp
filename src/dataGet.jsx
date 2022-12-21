import { onValue, ref } from "firebase/database";
import { database } from "./firebaseConfig/Firebase";
import {
  UID,
  COMPANYJOBPOSTED,
  ACCOUNTS,
  NOTUSER,
} from "./reducer/Action";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getData = (dispatch) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({ type: UID, payload: user?.uid });
      const accounts = ref(database, "Accounts/");
      onValue(accounts, (snapshot) => {
        dispatch({ type: ACCOUNTS, payload: snapshot.val() });
      });
      const companyJobPost = ref(database, "CompanyPostJob/");
      onValue(companyJobPost, (snapshot) => {
        dispatch({ type: COMPANYJOBPOSTED, payload: snapshot.val() });
      });
    } else {
      dispatch({ type: NOTUSER });
    }
  });
};

export default getData;
