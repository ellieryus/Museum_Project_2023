import React from "react";
import "./artworkHeader.scss";
import Button from "../../../components/Button/Button";

export default function ArtworkHeader({ navigate }: any) {
  return (
    <div className="artwork-header">
      <div className="back-button">
        <Button
          mobile="active-mobile"
          title="Back"
          handleClick={() => {
            navigate("/");
          }}
        ></Button>
      </div>

      <div className="home-container">
        <Button
          mobile="active-mobile"
          title="Home"
          handleClick={() => {
            navigate("/gallery");
          }}
        ></Button>
      </div>

      <div className="search-container">
        <div className="inside-container">
          <input type="text" placeholder="search for an artwork here" />
        </div>
      </div>
    </div>
  );
}
