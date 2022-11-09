import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

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

// const navigate = useNavigate();
export const SignOut = async (props) => {
  const auth = getAuth();
  props === "Logout"
    ? await signOut(auth)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    : console.log(props);
};
