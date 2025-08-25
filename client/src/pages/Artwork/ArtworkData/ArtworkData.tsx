import React, { useEffect, useState } from "react";
import "./artworkData.scss";
import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import authHeader from "../../../utils/authHeader";
import ENCRYPT from "../../../utils/encrypt";
import useNotification from "../../../hooks/useNoti";
import DECRYPT from "../../../utils/decrypt";
import { host } from "../../../config/host";

export default function ArtworkData({ artData, artID, fetchArtwork }: any) {
  const loadLike: boolean = false;
  const [isLiked, setIsLiked] = useState(loadLike); //get data later
  const [setMessageErr, renderer] = useNotification();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      axios
        .get(
          "http://" + host + "/customer/user-likes/" +
            artID +
            "/" +
            JSON.parse(localStorage.getItem("userData")!).UID,
          {
            headers: authHeader(),
          }
        )
        .then((loadLike) => {
          const _loadLike = DECRYPT(loadLike.data);

          console.log(_loadLike);

          setIsLiked((prev: boolean) => _loadLike.res);

          if (_loadLike.errorMessage) {
            setMessageErr(_loadLike.errorMessage);
          }
        });
    }
  }, []);
  return (
    <div className="artworkData">
      {renderer}
      <div className="img-container">
        <img src={artData.imgLink} alt="" />
        <button>View more</button>
      </div>
      <div className="text-container">
        <div className="title-container">
          <p className="title">{artData.artName}</p>
          <div className="author">
            <div className="rectangle"></div>
            <p className="text">{artData.authorName}, 1642</p>
          </div>
        </div>
        <div className="des-container">
          <p className="description">
            <br /> {artData.artDescription}
            <br />
          </p>
          <div className="like">
            <IonIcon
              onClick={() => {
                if (!localStorage.getItem("userData")) {
                  setMessageErr("301");
                } else {
                  if (!isLiked) {
                    axios
                      .post(
                        "http://" + host + "/customer/user-likes/" +
                          artID +
                          "/like",
                        {
                          data: ENCRYPT({
                            like: 1,
                            UID: JSON.parse(localStorage.getItem("userData")!)
                              .UID,
                          }),
                        },
                        {
                          headers: authHeader(),
                        }
                      )
                      .then((res) => {
                        var response = DECRYPT(res.data);
                        if (response.errorMessage) {
                          setMessageErr(response.errorMessage);
                        }
                        fetchArtwork((prev: any) => prev + 1);
                        setIsLiked(true);
                        console.log("gut");
                      });
                  } else if (isLiked) {
                    axios
                      .post(
                        "http://" + host + "/customer/user-likes/" +
                          artID +
                          "/like",
                        {
                          data: ENCRYPT({
                            like: -1,
                            UID: JSON.parse(localStorage.getItem("userData")!)
                              .UID,
                          }),
                        },
                        {
                          headers: authHeader(),
                        }
                      )
                      .then((res) => {
                        var response = DECRYPT(res.data);
                        if (response.errorMessage) {
                          setMessageErr(response.errorMessage);
                        }
                        fetchArtwork((prev: any) => prev + 1);
                        setIsLiked(false);
                        //console.log("gut");
                      });
                  }
                }
              }}
              className="icon"
              name={isLiked ? "heart" : "heart-outline"}
            ></IonIcon>
            <p>{artData.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
