import "./PageNotFound.scss";
import Button from "../../components/Button/Button";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    
  }, [])

  return (
    <div className="PageNotFound">
      <div className="--background">
        <img src="/UI/statue.jpg" alt="" />
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
      </div>
      <div className="button-container">
        <Button
          mobile="active-mobile"
          title="Home"
          //handleClick={authContext.login}
          //directs user to login page
          handleClick={() => {
            navigate("/");
          }}
        ></Button>
      </div>
      <div className="Home--potrait">
        <img src="/UI/statue.jpg" alt="" />
        <div className="Home--rectangle"></div>
      </div>
      <div className="Home--title">
        <p className="--Text">404</p>
        <p className="--Text --Title">Page Not Found</p>
      </div>
    </div>
  );
}
