import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBS3GPoxX29VCaLgPMKdM2fjgv51epVlLg",
  authDomain: "campus-app-1c4b8.firebaseapp.com",
  projectId: "campus-app-1c4b8",
  storageBucket: "campus-app-1c4b8.appspot.com",
  messagingSenderId: "724917581976",
  appId: "1:724917581976:web:e6a18613d89e3ab03738ed",
  measurementId: "G-7ME6FLS1TL",
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
          dis({ type: "uid", payload: false });
          dis({ type: "user", payload: false });
          dis({ type: "accounts", payload: false });
          dis({ type: "companyData", payload: false });
        })
        .catch((err) => console.log(err))
    : nav("/profile");
};
