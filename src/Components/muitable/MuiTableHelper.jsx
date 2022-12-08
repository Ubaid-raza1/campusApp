import { useSelector } from "react-redux";

const MuiTableHelper = (CheckIcon, Icon, block) => {
  const state = useSelector((state) => state);
  const user = state?.user;

  const companyHeader = [
    "Company Name",
    "Education",
    "Job Category",
    "Experiance",
    "",
  ];
  const student = [
    "Company Name",
    "Education",
    "Job Category",
    "Experiance",
    " ",
  ];
  const AdminHome = ["Companies Name", "Job Post", "Experiance", ""];
  const Adminfooter = ["Category", "Name", "Email", ""];

  return user?.role === "Company"
    ? companyHeader
    : user?.role === "Student"
    ? student
    : (user?.role === "Admin" && Icon && Adminfooter) ||
      (block && Adminfooter) ||
      (CheckIcon && AdminHome);
};

export default MuiTableHelper;
