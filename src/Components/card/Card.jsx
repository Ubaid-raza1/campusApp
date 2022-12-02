import React from "react";
import ApplyImage from "../../image/ApplyImage.png";

import "./Card.css";

const Cards = ({ cardData, apply, SimpleButton ,Detail}) => {
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
                {/* <div className="dis-body">{`Education: ${data?.education} `}</div>
                <div className="dis-body">{`Experiance: ${data?.experiance} `}</div>
                <div className="dis-body">{`Job: ${data?.jobCategory} `}</div> */}
              </div>
            </div>

            <div className="card-btn">
              <SimpleButton
                value="Job Detail"
                id="card-but"
                color="success"
                Variant="contained"
                onClick={() => Detail(data?.id, data?.studentId)}
              />
            </div>
            <div className="card-btn">
              <SimpleButton
                value="Apply"
                id="card-but"
                color="primary"
                Variant="contained"
                onClick={() => apply(data?.id, data?.studentId)}
              />
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Cards;
