import React from "react";
import { useSelector } from "react-redux";
import "./NotFound.css";

const NotFound = () => {
  const state = useSelector((state) => state);
  return (
    <>
      {state?.user?.uid &&
        <div className="notFound">
          <h1 className="notFoundHead">404 Error</h1>
          <p className="notFoundText"> Page Not Found</p>
        </div>
      }
    </>
  );
};

export default NotFound;
