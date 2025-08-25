import React from "react";
import "../../Style/Section.scss";
import Button from "../../components/Button/Button";
import "./shop.scss";
import { Link, useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();
  return (
    <div className="Section">
      <div className="--background">
        <img src="/UI/AboutUs.jpg" alt="" />
      </div>
      <div className="container">
        <div className="Section--portrait non-phone">
          <img src="/UI/AboutUs.jpg" alt="" />
          <div className="Section--rectangle"></div>
        </div>
        <div className="Section--title rhs">
          <p className="--Text --Title">About Us</p>
          <div className="Section--portrait phone">
            <img src="/UI/AboutUs.jpg" alt="" />
            <div className="Section--rectangle"></div>
          </div>
          <p className="--Text --margin">
            The Rijksmuseum is a national Dutch museum which stores the Dutch
            history from 1200 to now. We pack in around 8000 artworks with
            paintings by heroes Rembrandt, Vermeer and Van Gogh, as well as
            plenty of other masterpieces.
          </p>
          <Button
            handleClick={() => {
              navigate("/gallery");
            }}
            title="See Artworks"
            type="--black"
          ></Button>
        </div>
      </div>
    </div>
  );
}
export default About;
