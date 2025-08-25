import "./ViewDatabaseChild.scss"
import React from "react";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DECRYPT from "../../utils/decrypt";
import authHeader from "../../utils/authHeader";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

export default function ViewDatabaseChild() {
  const navigate = useNavigate();
  const [setMessageErr, renderer] = useNotification();

  // prevent unauthorized access of customer
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      if (JSON.parse(localStorage.getItem("userData")!).Role == "customer") {
        setMessageErr("101");
      }
    } else {
      setMessageErr("100");
    }
  }, [])

  const defaultValue = useRef([{default1: "null", default2: "null"}]);

  // placeholder for database table chosen info
  const [databaseTableChosenInfo, setDatabaseTableChosenInfo] = useState(defaultValue.current);

  // placeholder for the chosen Table get from URL
  const {tableName} = useParams();


  // GET request to the server
  useEffect(() => {
    axios
      .get("http://" + host + "/" + JSON.parse(localStorage.getItem("userData")!).Role + "/get-data/getTable/" + tableName,
      {
        headers: authHeader()
      }
      ).then((res) => {
        var response = DECRYPT(res.data);

        if (response.errorMessage) {
          setMessageErr(response.errorMessage);
        } else {
          if (response.info.length !== 0) {
            setDatabaseTableChosenInfo(response.info);
          }
        }
      });
  }, [tableName]);

  const MapDatabase = () => {
    return (
      <div className="database-form-container">
        <div className="--title">
          <p className="--Text --Title">{tableName?.charAt(0)?.toUpperCase()}{tableName?.slice(1)}</p>
        </div>
        <div className="database-table">
          <MapLoader></MapLoader>
        </div>
      </div>
    );
  }

  const MapLoader = () => {
    const result: any = [];

    if (databaseTableChosenInfo !== defaultValue.current) {
      result.push(          
        <div className="database-table-container">
          <MapTable></MapTable>
        </div>
      )
    } else {
      result.push(<Loader></Loader>)
    }

    return result;
  }

  const MapTable = () => {
    const result: any = [];

    result.push(
      <div className="database-row-container --header">
        <MapAttributeRow></MapAttributeRow>
      </div>
    )

    for (var i = 0; i < Object.values(databaseTableChosenInfo).length; i++) {
      result.push(
        <div className="database-row-container">
          {MapNormalRow(i)}
        </div>
      )
    }

    return result;
  }

  const MapAttributeRow = () => {
    const result: any = [];

    for (var i = 0; i < Object.keys(databaseTableChosenInfo[0]).length; i++) {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --Text --s0">{Object.keys(databaseTableChosenInfo[0])[i]}</p>
        )
      } else {
        result.push(
          <p className="database-cell-container --Text --s1">{Object.keys(databaseTableChosenInfo[0])[i]}</p>
        )
      }
    }

    return result;
  }

  const MapNormalRow = (rowNumber : number) => {
    const result: any = [];

    for (var i = 0; i < Object.keys(databaseTableChosenInfo[0]).length; i++) {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --Text --s0">{Object.values(databaseTableChosenInfo[rowNumber])[i]}</p>
        )
      } else {
        result.push(
          <p className="database-cell-container --Text --s1">{Object.values(databaseTableChosenInfo[rowNumber])[i]}</p>
        )
      }
    }

    return result;
  }

  return (
    <div className="ViewDatabaseChild">
      {renderer}
      <div className="--background">
        <img src="/UI/statue.jpg" alt="" />
      </div>

      <MapDatabase></MapDatabase>

      <Button
        title="Back"
        position="--top-right-1"
        handleClick={() => {
          navigate("/employee/view-database");
        }}
      ></Button>
    </div>
  )
}
