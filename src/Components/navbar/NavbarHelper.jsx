const navbarHelper = (user) => {

  const admin = [{ url: "Block Setion", link: "/blockSection" }];
  let company = [
    { url: "Job Post", link: "/CompanyJobPost" },
    { url: "Posted Job", link: "/CompanyPostedJob" },
  ];
  const student = [{ url: "Applied Jobs", link: "/StuedntAppleidJobs" }];
  return user?.role === "Student" ? student : user?.role === "Company" ? company : user?.role === "Admin" ? admin : [];
};

export default navbarHelper;
