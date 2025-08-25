import React from "react";
import "./gallery.scss";
import GalleryHeader from "./GalleryHeader.tsx/GalleryHeader";
import Slider from "./Slider/Slider";

import { useNavigate } from "react-router-dom";
import GalleryTop10 from "./GalleryTop10/GalleryTop10";

export default function Gallery() {
  const navigate = useNavigate();
  return (
    <div className="gallery">
      <div className="background">
        <img src="/UI/aboutus.jpg" alt="" />
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
      </div>
      <GalleryHeader navigate={navigate} />

      <div className="content">
        <Slider />
        <GalleryTop10 />
      </div>
    </div>
  );
}
