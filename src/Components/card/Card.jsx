import React from "react";
import ApplyImage from "../../image/ApplyImage.png";
import SimpleButton from "../button/Button";
import "./Card.css";

const Cards = ({ cardData, apply, Detail }) => {
  return (
    <React.Fragment>
      {cardData?.map((data, i) => {
        return (
          <div className="Cards" key={i}>
            <div className="card-body">
              <div className="card-img">
                <img src={ApplyImage} alt="" />
              </div>
              <div className="card-discription">
                <h3 className="dis-body">{`Company: ${data?.companyName} `}</h3>
              </div>
            </div>

            <div className="card-btn">
              <SimpleButton
                value="Job Detail"
                id="card-but"
                style={{backgroundColor:"black"}}
                Variant="contained"
                onClick={() => Detail(data?.id, data?.studentsId)}
              />
            </div>
            <div className="card-btn">
              <SimpleButton
                value="Apply"
                id="card-but"
                color="primary"
                Variant="contained"
                onClick={() => apply(data?.id, data?.studentsId)}
              />
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Cards;
