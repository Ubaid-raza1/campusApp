import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Modals.css";

const Modals = ({
  open,
  SimpleButton,
  Cancel,
  DesTable,
  user,
  data,
  className,
  CloseIcon,
  PersonIcon,
  WorkIcon,
  LocationOnIcon,
  ExplicitIcon,
  SchoolIcon,
}) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ minHeight: "500px" }}
      >
        <Box className={className?.modalMain}>
          {data ? (
            <div>
              <div className="closeBtn">
                <div className="modalheader">Job Detail</div>
                <div>
                  <CloseIcon onClick={Cancel} />
                </div>
              </div>
              {data?.map((item) => {
                return (
                  <div className="jobDetail">
                    <div className="underText">
                      <span className="underIcon">
                        <PersonIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Company Name:</b>
                        </div>
                        <div>{item.companyName}</div>
                      </div>
                    </div>

                    <div className="underText">
                      <span className="underIcon">
                        <WorkIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Job Category:</b>
                        </div>
                        <div>{item.jobCategory}</div>
                      </div>
                    </div>
                    <div className="underText">
                      <span className="underIcon">
                        <SchoolIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Required Education:</b>
                        </div>
                        <div>{item.education}</div>
                      </div>
                    </div>
                    <div className="underText">
                      <span className="underIcon">
                        <ExplicitIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Required Experiance:</b>
                        </div>
                        <div>{item.experiance}</div>
                      </div>
                    </div>
                    <div className="underText">
                      <span className="underIcon">
                        <LocationOnIcon />
                      </span>
                      <div className="underTowText">
                        <div className="underIcon">
                          <b>Address:</b>
                        </div>
                        <div>{item.address}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="modalTableHeader">
                <div className="tableText">Student Applied Check</div>
                <div>
                  <CloseIcon onClick={Cancel} />
                </div>
              </div>

              <DesTable user={user} />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Modals;
