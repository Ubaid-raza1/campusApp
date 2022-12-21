import { getAuth, signOut } from "firebase/auth";
import { NOTUSER } from "../reducer/Action";

export const MenuHelper = async (check, dispatch, navigate) => {
  const auth = getAuth();
  check === "Logout"
    ? await signOut(auth)
        .then((res) => {
          // console.log(res);
          dispatch({ type: NOTUSER });
          navigate("/");
        })
        .catch((err) => console.log(err))
    : navigate("/profile");
};
