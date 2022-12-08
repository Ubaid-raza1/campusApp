import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { UID, USER, COMPANYJOBPOSTED, ACCOUNTS } from "../reducer/Action";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);

// const navigate = useNavigate();
export const SignOut = async (cheack, dis, nav) => {
  const auth = getAuth();
  cheack === "Logout"
    ? await signOut(auth)
        .then((res) => {
          console.log(res);
          dis({ type: UID, payload: false });
          dis({ type: USER, payload: false });
          dis({ type: ACCOUNTS, payload: false });
          dis({ type: COMPANYJOBPOSTED, payload: false });
          nav("/")
        })
        .catch((err) => console.log(err))
    : nav("/profile");
};
