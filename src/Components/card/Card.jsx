import React from "react";
import { useSelector } from "react-redux";
import ApplyImage from "../../image/ApplyImage.png";
import SimpleButton from "../button/Button";
import { ref, child, push, update } from "firebase/database";
import { database } from "../../firebase/Firebase";
import "./Card.css";

const Cards = ({ cardData }) => {
  const state = useSelector((state) => state);
  const apply = (id, data) => {
    const postListRef = ref(database, "CompanyPostJob/" + id);
    return update(postListRef, {
      studentId: [state.uid, ...(data ? data : [])],
    });
  };
  const myData = cardData.filter(
    (item) => item.experiance == state.user.experiance
  );
  return (
    <React.Fragment>
      {state.user.approved === true ? (
        <React.Fragment>
          {myData?.map((data, i) => {
            return (
              <div className="Cards" key={i}>
                <div className="card-body">
                  <div className="card-img">
                    <img src={ApplyImage} alt="" />
                  </div>
                  <div className="card-discription">
                    <h3 className="dis-body">
                      {" "}
                      {`Company: ${data.companyName} `}
                    </h3>
                    <div className="dis-body">{`Education: ${data.education} `}</div>
                    <div className="dis-body">{`Experiance: ${data.experiance} `}</div>
                    <div className="dis-body">{`Job: ${data.jobCateogeory} `}</div>
                  </div>
                </div>

                <div className="card-btn">
                  <SimpleButton
                    value="Apply"
                    id="card-but"
                    color="success"
                    onClick={() => apply(data.id, data?.studentId)}
                  />
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ) : (
        <h1>Your Request is panding!</h1>
      )}
      
    </React.Fragment>
  );
};

export default Cards;
