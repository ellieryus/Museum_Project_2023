import React, { useEffect, useState, useRef } from "react";
import "./galleryHeader.scss";
import Button from "../../../components/Button/Button";
import axios from "axios";
import SearchResult from "../SearchResult/SearchResult";
import IonIcon from "@reacticons/ionicons";
import authHeader from "../../../utils/authHeader";
import { host } from "../../../config/host";
//import { useNavigate } from "react-router";

export default function GalleryHeader({ navigate }: any) {
  //const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [searchBarToggle, setSearchBarToggle] = useState(false);
  const initRef: any = [];
  const inputRef = useRef(initRef);

  const searchArtworkQuery = (e: any) => {};

  const dropdownOn = () => {
    setToggle(true);
  };
  const dropdownOff = () => {
    console.log();

    setTimeout(() => {
      setToggle(false);
    }, 500);
  };

  const toggleSearch = () => {
    console.log("toggleSearch");

    setSearchBarToggle((prev) => !prev);
  };
 
  useEffect(() => {
    inputRef.current?.addEventListener("focusout", dropdownOff);
    inputRef.current?.addEventListener("focusin", dropdownOn);
    return () => {
      inputRef.current?.removeEventListener("focusout", dropdownOff);
      inputRef.current?.removeEventListener("focusin", dropdownOn);
    };
  }, []);
  useEffect(() => {
    axios
      .get(
        "http://" + host + "/default/search-artworks?data[]=" +
          searchValue,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        setSearchRes(res.data.info);
      });
  }, [searchValue]);
  return (
    <div className="gallery-header">
      <div className="inner-header">
        <Button
          mobile="active-mobile"
          title="Home"
          handleClick={() => {
            navigate("/");
          }}
        ></Button>
        <div className="inside-container">
          <div className="first-rank">
            <div onClick={toggleSearch} className="search-button">
              <IonIcon name="search-outline" />
            </div>
            <input
              className={searchBarToggle ? "" : "hide"}
              ref={inputRef}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              type="text"
              placeholder="search for an artwork here"
              value={searchValue}
            />
          </div>

          {searchRes && toggle ? (
            <SearchResult listArtwork={searchRes} />
          ) : null}
        </div>
      </div>

      {/* <div className="search-container">
        
      </div> */}
    </div>
  );
}
