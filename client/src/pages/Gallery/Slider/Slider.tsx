import React, { useEffect, useRef, useState } from "react";
import "./slider.scss";
import axios from "axios";
import authHeader from "../../../utils/authHeader";
import { host } from "../../../config/host";

type artData = {
  artName: string;
  author: string;
  imgLink: string;
};

export default function Slider() {
  const [sliderData, setSliderData] = useState<Array<artData>>([]);

  useEffect(() => {
    let tempData: Array<any> = new Array<any>();
    axios.get("http://" + host + "/default/gallery", {
      headers: authHeader()
    }).then((res) => {
      tempData = res.data.sliderData;
      console.log(tempData);

      setSliderData([
        {
          artName: "Rijk Museum's treasure and gallery",
          author: "",
          imgLink: "/UI/aboutus.jpg",
        },
        {
          artName: tempData[0].artName,
          author: tempData[0].authorName,
          imgLink: "/UI/shop.jpg",
        },
        {
          artName: tempData[1].artName,
          author: tempData[1].authorName,
          imgLink: "/UI/visit.jpg",
        },
      ]);
    });
  }, []);
  return (
    <div className="slider">
      <div className="slider-zone">
        <div className="img-frame"></div>
        <div className="slider-container">
          <div className="slide-track">
            {/* <SlideItem data={sliderData[0]} /> */}
            {sliderData.map((e, i) => {
              return <SlideItem data={e} />;
            })}
            {sliderData.map((e, i) => {
              return <SlideItem data={e} />;
            })}
            {/* <img src="/UI/shop.jpg" alt="" />
          <img src="/UI/visit.jpg" alt="" />

          <img src="/UI/aboutus.jpg" alt="" />
          <img src="/UI/shop.jpg" alt="" />
          <img src="/UI/visit.jpg" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

type SlideItemProps = {
  data: artData;
};

const SlideItem = ({ data }: SlideItemProps) => {
  console.log(
    "EXPLORE" +
      "\n" +
      data?.artName +
      (data?.author != "" ? " by " + data?.author : "")
  );

  return (
    <div className="slide-item">
      <div className="img-container">
        <img src={data?.imgLink} alt="" />
      </div>

      <div className="title-container">
        <p>
          {"EXPLORE"}
          <br />
          {data?.artName + (data?.author != "" ? " by " + data?.author : "")}
        </p>
      </div>
    </div>
  );
};
