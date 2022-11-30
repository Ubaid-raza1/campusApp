import { useSelector } from "react-redux";

const MuiTableHelper = (data) => {
  const state = useSelector((state) => state);
  const user = state?.user;

  const arr = data
    .map((ele) => ele.role)
    .filter((item, i, arr) => arr.findIndex((ele) => ele === item) === i);
  const arr2 = data
    .map((ele) => ele.user)
    .filter((item, i, arr) => arr.findIndex((ele) => ele === item) === i);
  const companyHeader = [
    "Company Name",
    "Education",
    "Job Category",
    "Experiance",
    "",
  ];
  const student = [
    "Company Name",
    "Job Category",
    "Education",
    "Experiance",
    " ",
  ];
  const Admin = [" Name", "Email", ""];
  const AdminHome = ["Companies Name", "Job Post", "Experiance", ""];
  const Adminfooter = ["Name", "Category", "Email", ""];

  return user.role === "Company"
    ? companyHeader
    : user.role === "Student"
    ? student
    : user.role === "Admin"
    ? arr.includes("jobPost")
      ? AdminHome
      : arr2.includes("approved")
      ? Adminfooter
      : Admin
    : [];
};

export default MuiTableHelper;
