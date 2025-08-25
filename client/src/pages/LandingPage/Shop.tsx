import React from "react";
import "../../Style/Section.scss";
import Button from "../../components/Button/Button";
import "./shop.scss";
import { useNavigate } from "react-router-dom";
function Shop() {
  const navigate = useNavigate();
  return (
    <div className="Section">
      <div className="--background">
        <img src="/UI/Shop.jpg" alt="" />
      </div>
      <div className="container">
        <div className="Section--portrait non-phone">
          <img src="/UI/Shop.jpg" alt="" />
          <div className="Section--rectangle"></div>
        </div>
        <div className="Section--title rhs">
          <p className="--Text --Title">Gifts & Souvenirs</p>
          <div className="Section--portrait phone">
            <img src="/UI/Shop.jpg" alt="" />
            <div className="Section--rectangle"></div>
          </div>
          <p className="--Text --margin">
            From reproductions, books to accessories and many more. View our
            beautiful collection here!
          </p>
          <Button
            title="Shop now"
            type="--black"
            handleClick={() => {
              navigate("/shopping");
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}
export default Shop;
