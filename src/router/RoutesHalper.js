import Admin from "../pages/admin/Admin";
import BlockSection from "../pages/admin/BlockSection";
import CompanyHome from "../pages/company/CompanyHome";
import CompanyJobPost from "../pages/company/CompanyJobPost";
import CompanyPostedJob from "../pages/company/CompanyPostedJob";
import Login from "../pages/login/Login";
import NotFound from "../pages/notFound/NotFound";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import StudentAppledJobs from "../pages/student/StudentAppledJobs";
import StudentHome from "../pages/student/StudentHome";
import { Navigate } from "react-router-dom";

export const adminRoutes = [
  { path: "/", component: Admin },
  { path: "/blockSection", component: BlockSection },
  { path: "/profile", component: Profile },
  { path: "*", component: NotFound },
];
export const companyRoutes = [
  { path: "/", component: CompanyHome },
  { path: "/CompanyJobPost", component: CompanyJobPost },
  { path: "/CompanyPostedJob", component: CompanyPostedJob },
  { path: "/profile", component: Profile },
  { path: "*", component: NotFound },
];
export const studentRoutes = [
  { path: "/", component: StudentHome },
  { path: "/StuedntAppleidJobs", component: StudentAppledJobs },
  { path: "/profile", component: Profile },
  { path: "*", component: NotFound },
];
export const LoginSignup = [
  { path: "/Login", component: Login },
  { path: "/Signup", component: Signup },
  { path: "*", component: () => <Navigate to="/Login" /> },
];
