import React, { useEffect, useState } from "react";
import "./galleryTop10.scss";
import TopArtwork from "./TopArtwork/TopArtwork";
import axios from "axios";
import authHeader from "../../../utils/authHeader";
import { host } from "../../../config/host";

type artData = {
  id: number;
  artName: string;
  author: string;
  imgLink: string;
  artYear: string;
};
export default function GalleryTopVisit() {
  const [artworkData, setArtWorkData] = useState<Array<artData>>(
    new Array<artData>()
  );

  useEffect(() => {
    console.log("http://" + host + "/default/gallery");
    axios
      .get("http://" + host + "/default/gallery", {
        headers: authHeader(),
      })
      .then((res) => {
        let tempData: Array<artData> = new Array<artData>();
        tempData = res.data.sliderData;
        const pretifyData = tempData.map((e: any, i) => {
          console.log(e);
          return {
            id: i + 1,
            artName: e.artName,
            author: e.authorName,
            imgLink: e.imgLink,
            artYear: e.artYear,
          };
        });

        setArtWorkData(pretifyData);
      });
  }, []);
  return (
    <div className="topVisit">
      <div className="title-container">
        <div className="rectangle"></div>
        <p className="title">Highlights</p>
      </div>
      <div className="grid-container">
        {artworkData.map((e, i) => {
          return <TopArtwork data1={e} />;
        })}
      </div>
    </div>
  );
}
