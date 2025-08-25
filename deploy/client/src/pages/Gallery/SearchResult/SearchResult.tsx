import React from "react";
import "./searchResult.scss";
import { useNavigate } from "react-router";

//appear when enter in search box
//disappear when click e

function SearchResult({ listArtwork }: any) {
  return (
    <div className="search-result">
      <div className="inner-contain">
        {listArtwork.map((e: any, i: any) => {
          console.log(e.ArtName);
          return <Item data={e} />;
        })}
      </div>
    </div>
  );
}

function Item({ data }: any) {
  const navigate = useNavigate();
  return (
    <div
      className="item"
      onClick={() => {
        navigate("/artwork/" + data.ArtID);
      }}
    >
      <p>{data.ArtName}</p>
      <p>{data.AuthorName}</p>
    </div>
  );
}

export default SearchResult;
