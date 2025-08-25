import Button from "../../components/Button/Button";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLogout from "../../hooks/useLogout";
import { TDContext } from "../../components/TDContext/TDContext";
import { useRef } from "react";
export default function HomeUser() {
  const navigate = useNavigate();
  const ThreeDContext = useContext(TDContext)
  const ref_ = useRef<HTMLDivElement>(null)
  const logOut = useLogout();

  return (
    <div
      className="Home"
      onMouseMove={(e) => {
        ThreeDContext.rotateElement(e, ref_);
      }}
    >
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
          title="Profile"
          //handleClick={authContext.login}
          //directs user to login page
          handleClick={() => {
            navigate(
              "/customer/profile/" +
                JSON.parse(localStorage.getItem("userData")!).UID
            );
          }}
        ></Button>
        <Button
          mobile="active-mobile"
          title="Log Out"
          //handleClick={authContext.signUp}
          //directs user to sign up page
          handleClick={() => {
            logOut.logout();
          }}
        ></Button>
      </div>
      <div className="Home--potrait" ref={ref_}>
        <img src="/UI/statue.jpg" alt="" />
        <div className="Home--rectangle"></div>
      </div>
      <div className="Home--title">
        <p className="--header">Welcome to</p>
        <p className="--Text --Title">Cloud Museum</p>
        <p className="--Text">concept design of the Rijksmuseum website</p>
      </div>
      <div className="team">
        <p className="--SmallText">by Cloudxi team</p>
      </div>
    </div>
  );
}
