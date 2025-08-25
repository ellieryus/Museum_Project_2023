import React from "react";
import "./topArtworks.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import Button from "./Button/Button";

type artData = {
  id: number;
  artName: string;
  author: string;
  imgLink: string;
  artYear: string;
};

type passData = {
  data1: artData;
};

export default function TopArtwork({ data1 }: passData) {
  const navigate = useNavigate();
  return (
    <div className="topArtworks">
      <div
        onClick={() => {
          navigate("/artwork/" + data1.id.toString());
        }}
        className="item"
      >
        <div className="cover" />
        <div className="rectangle">
          <img src={data1.imgLink} alt="" />
        </div>
        <p className="title">
          {data1?.artName}
          {" - " + data1?.artYear}
          <br />
          {data1?.author}
        </p>
      </div>
    </div>
  );
}
