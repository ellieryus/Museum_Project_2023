import React from "react";
import "../../Style/Section.scss";
import Button from "../../components/Button/Button";
import "./shop.scss";
import { useNavigate } from "react-router-dom";
function Visit() {
  const navigate = useNavigate();
  return (
    <div className="Section">
      <div className="--background">
        <img src="/UI/Visit.jpg" alt="" />
      </div>
      <div className="container">
        <div className="Section--title Section--title--right rhs">
          <p className="--Text --Title">Visit</p>
          <div className="Section--portrait Section--potrait--right phone">
            <img src="/UI/Visit.jpg" alt="" />
            <div className="Section--rectangle"></div>
          </div>
          <p className="--Text --margin">
            Manage your time to check out all the Dutch masters of the Golden
            Age.
            <br />
            Daily open: 8am to 10pm.
            <br />
            Free for age 18 and under.
          </p>
          <Button
            title="Cloud Tickets"
            type="--black"
            handleClick={() => navigate("/booking")}
          ></Button>
        </div>
        <div className="Section--portrait Section--potrait--right non-phone">
          <img src="/UI/Visit.jpg" alt="" />
          <div className="Section--rectangle"></div>
        </div>
      </div>
    </div>
  );
}
export default Visit;
