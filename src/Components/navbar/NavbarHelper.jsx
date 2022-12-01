const navbarHelper = (user) => {
  // console.log(role.role)
  const admin = [{ url: "Block Setion", link: "/blockSection" }];
  let company = [
    { url: "Job Post", link: "/CompanyJobPost" },
    { url: "Posted Job", link: "/CompanyPostedJob" },
  ];
  const student = [{ url: "Applied Jobs", link: "/StuedntAppleidJobs" }];
  return user.role === "Student" ? student : user.role === "Company" ? company : admin;
};

export default navbarHelper;