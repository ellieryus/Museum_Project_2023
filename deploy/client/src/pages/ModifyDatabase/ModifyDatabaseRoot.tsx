import React, { useEffect, useRef } from "react";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { useNavigate  } from "react-router-dom";
import { useState} from "react";
import "./ModifyDatabaseRoot.scss";
import axios from "axios";
import DECRYPT from "../../utils/decrypt";
import authHeader from "../../utils/authHeader";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

export default function ModifyDatabaseRoot(){
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

  const [databaseData, setDatabaseData] = useState(defaultValue.current);

  const MappingTableName = () => {
    return (
      <div className="database-form-container">
        <div className="--title">
          <p className="--Text --Title">Modify Database</p>
        </div>
        <div className="database-table-container">
          {MapColumn(Object.values(databaseData).length / 2)}
        </div>
      </div>
    );
  }

  const MapColumn = (numColumn: number) => {
    const result: any = [];

    if (databaseData !== defaultValue.current) {
      for (let i = 0; i < numColumn; i++) {
        result.push(
          <div className="database-column-container">
            <div className="field-container">
              <div className="--Text --title"> {Object.values(databaseData[i*2 + 0])[0].toUpperCase()} </div>
              <div className="button-container">
                <Button                             
                  mobile="active-mobile"
                  title="View"
                  //handleClick={authContext.signUp}
                  //directs user to sign up page
                  handleClick={() => {
                    navigate(`/employee/modify-database/${Object.values(databaseData[i*2 + 0])[0]}`)
                  }}>
                </Button>
              </div>
            </div>

            <div className="field-container">
              <div className="--Text --title"> {Object.values(databaseData[i*2 + 1])[0].toUpperCase()} </div>
              <div className="button-container">
                <Button                             
                  mobile="active-mobile"
                  title="View"
                  //handleClick={authContext.signUp}
                  //directs user to sign up page
                  handleClick={() => {
                    navigate(`/employee/modify-database/${Object.values(databaseData[i*2 + 1])[0]}`)
                  }}>
                </Button>
              </div>            
            </div>
          </div>
        )
      }
    } else {
      result.push(<Loader></Loader>)
    }
    return result;
  }

  useEffect(() => {  
    axios
      .get("http://" + host + "/employee/get-data/getTableName",
      {
        headers: authHeader()
      })
      .then((res) => {
        var response = DECRYPT(res.data);
        console.log(response.message);
        if(response.errorMessage){
          setMessageErr(response.errorMessage);
        }
        setDatabaseData(response.info);
        
      });
  },[]);

  return (
    <div className="ModifyDatabaseRoot">
      {renderer}
      <div className="--background">
      <img src="/UI/statue.jpg" alt="" />
      </div>
      <MappingTableName></MappingTableName>
      <Button
        title="Back"
        position="--top-right-1"
        handleClick={() => {
          navigate("/employee");
        }}
      ></Button>
    </div>
  );
}
