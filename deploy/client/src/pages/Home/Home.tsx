import "./Home.scss";
import "../../components/TDContext/TDContext.scss"
import Button from "../../components/Button/Button";
import React, { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TDContext } from "../../components/TDContext/TDContext";
import { useRef } from "react";

export default function Home() {
  const navigate = useNavigate();
  const ThreeDContext = useContext(TDContext)
  const ref_ = useRef<HTMLDivElement>(null)
  // auto access for users
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      if (JSON.parse(localStorage.getItem("userData")!).Role == "customer") {
        navigate("/customer");
      } else {
        navigate("/employee");
      }
    } else {
      navigate("/");
    }
  }, [])

  return (
    <div className="Home" onMouseMove={(e)=>{ThreeDContext.rotateElement(e,ref_)}}>
      {/* <div className="frame" ref={ref_}><img className="st" src="/UI/frame_1.png" alt="" /></div> */}
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
          title="Login"
          //handleClick={authContext.login}
          //directs user to login page
          handleClick={() => {
            navigate("/login");
          }}
        ></Button>
        <Button
          mobile="active-mobile"
          title="Sign up"
          //handleClick={authContext.signUp}
          //directs user to sign up page
          handleClick={() => {
            navigate("/signup");
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
