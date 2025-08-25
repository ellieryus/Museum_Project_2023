import React, { useEffect, useState } from "react";
import "./artwork.scss";
import ArtworkHeader from "./ArtworkHeader/ArtworkHeader";

import { useNavigate, useParams } from "react-router-dom";
import ArtworkData from "./ArtworkData/ArtworkData";
import axios from "axios";
import GalleryHeader from "../Gallery/GalleryHeader.tsx/GalleryHeader";
import authHeader from "../../utils/authHeader";
import DECRYPT from "../../utils/decrypt";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";
import Button from "../../components/Button/Button";

export default function Artwork() {
  const defaut: any = {};
  const navigate = useNavigate();
  const { artID } = useParams();
  const [artData, setArtData] = useState(defaut);
  const [fetchArtwork, setFetchArtwork] = useState(0);
  const [setMessageErr, renderer] = useNotification();

  useEffect(() => {
    axios
      .get("http://" + host + "/default/artworks/" + artID, {
        headers: authHeader(),
      })
      .then((res) => {
        const tempData = res.data;
        if (res.data.errorMessage) {
          setMessageErr(res.data.errorMessage);
        } else {
          console.log(tempData);
          setArtData(tempData);
        }
      });
  }, [artID]); //fetchArtwork]);

  return (
    <div className="artwork">
      {renderer}
      <div className="background">
        <img src={artData.imgLink} alt="" />
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
      </div>
      <GalleryHeader navigate={navigate} />

      <div className="content">
        <ArtworkData
          artData={artData}
          artID={artID}
          fetchArtwork={setFetchArtwork}
        />
      </div>

      <Button
          mobile="active-mobile"
          title="Back"
          position="--top-right-1"
          handleClick={() => {
            navigate("/gallery");
          }}
        ></Button>
    </div>
  );
}
