import "./ModifyDatabaseChild.scss"
import React, { useRef } from "react";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../utils/authHeader";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Loader from "../../components/Loader/Loader";
import ENCRYPT from "../../utils/encrypt";
import DECRYPT from "../../utils/decrypt";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

export default function ModifyDatabaseChild() {
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

  //#region placeholder
  // placeholder for the default value for rendering purpose
  const defaultValue = useRef([{default1: "null", default2: "null"}]);

  // placeholder for the current state of the page
  //  either: insert / delete / modify
  //    defaulting into insert
  const [state, setState] = useState<string>("insert");

  // placeholder for database table chosen
  const {tableName} = useParams();

  // placeholder for database table chosen info
  const [databaseTableChosenInfo, setDatabaseTableChosenInfo] = useState(defaultValue.current);

  //placeholder for schema table chosen
  const [schemaTableChosen, setSchemaTableChosen] = useState(defaultValue.current);

  // placeholder for the message received
  const [message, setMessage] = useState<string>("");

  // placeholder for Loader
  const noLoader = useRef<boolean>(true);
  //#endregion

  //#region reload page region
  //placeholder for deleteConfirm and insertConfirm and modifyConfirm
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(true);
  const [insertConfirm, setInsertConfirm] = useState<boolean>(true);
  const [modifyConfirm, setModifyConfirm] = useState<boolean>(true);

  useEffect(() => {
    console.log("fetch insert");

    axios
    .get("http://" + host + "/" + JSON.parse(localStorage.getItem("userData")!).Role  + "/get-data/getAttribute/" + tableName, 
    {
      headers: authHeader()
    })
    .then((res) => {
      var response = DECRYPT(res.data);
      console.log(response.message);
      if (response.info) {
        console.log(response.info);
        setSchemaTableChosen(response.info);
      } else if (response.errorMessage){
        setMessageErr(response.errorMessage);
      } else {
        setMessage(response.message);
      }


    })

  }, [tableName])

  useEffect(() => {
    console.log("fetch database");
    axios
      .get("http://" + host + "/" + JSON.parse(localStorage.getItem("userData")!).Role  + "/get-data/getTable/" + tableName, 
      {
        headers: authHeader()
      })
      .then((res) => {
        var response = DECRYPT(res.data);
        console.log(response.info);

        if (response.errorMessage) {
          setMessageErr(response.errorMessage);
        } else {
          if (response.info.length !== 0) {
            setDatabaseTableChosenInfo(response.info);
          } else {
            setDatabaseTableChosenInfo(defaultValue.current);

            setMessage(response.message);

            setTimeout(() => {
              setMessage("");
            }, 4000)
          }
        }
      });
  }, [deleteConfirm, insertConfirm, modifyConfirm, tableName]);

  //#endregion

  //#region insert region
  // placeholder for Insert
  const inserts = useRef<Array<string>>([]);

  const sendInsertRequest = () => {
    var attributeInsert: Array<string> = [];
    var valueInsert: Array<string> = [];

    for (let i = 0; i < inserts.current.length; i++) {
      if (inserts.current[i]) {
        attributeInsert.push(Object.values(schemaTableChosen[i])[0]);
        valueInsert.push(inserts.current[i]);
      }
    }

    const insertData = {id: 1, data: [tableName, attributeInsert , valueInsert]};

    console.log(insertData.data);

    const _insertData = {
      data: ENCRYPT(insertData)
    };

    axios
      .post("http://" + host + "/" + JSON.parse(localStorage.getItem("userData")!).Role  + "/modify/" + tableName + "/insert", _insertData, 
      {
        headers: authHeader()
      })
      .then((res) => {
        var response = DECRYPT(res.data);
        console.log(response.errorMessage);
        if(response.errorMessage){
          setMessageErr(response.errorMessage);
        } else {
          inserts.current = [];
          console.log(response.message);
          setInsertConfirm(!insertConfirm);
  
          setMessage(response.message);
  
          setTimeout(() => {
            setMessage("");
          }, 4000)
        }
      });
  };

  //#endregion

  //#region modify region
  // placeholder for Insert
  const [modifyValue, setModifyValue] = useState<Array<boolean>>({...[]});

  const [modifys, setModifys] = useState<Array<string>>({...[]});

  const sendModifyRequest = () => {
    var attributeKeep: Array<string> = [];
    var valueKeep: Array<string> = [];
    var attributeModify: Array<string> = [];
    var valueModify: Array<string> = [];

    var tuple: number = -1;

    for (let i = 0; i < modifyValue.length; i++) {
      if (modifyValue[i]) {
        tuple = i;
        break;
      }
    }

    console.log(tuple);

    for (let i = 0; i < Object.values(modifys).length; i++) {
      if (Object.values(modifys)[i] != Object.values(databaseTableChosenInfo[tuple])[i]) {
        console.log(Object.values(databaseTableChosenInfo[tuple])[i]);
        console.log(Object.values(modifys)[i]);
        attributeModify.push(Object.values(schemaTableChosen[i])[0]);
        valueModify.push(modifys[i]);
      } else {
        attributeKeep.push(Object.values(schemaTableChosen[i])[0]);
        valueKeep.push(Object.values(databaseTableChosenInfo[tuple])[i]);
      }
    }

    console.log(JSON.parse(localStorage.getItem("userData")!));

    const modifyData = {
      id: 1, 
      data: [tableName, attributeModify , valueModify, attributeKeep, valueKeep],
    };

    console.log(modifyData.data);

    const _modifyData = {
      data: ENCRYPT(modifyData)
    }

    if (attributeKeep.length > 0 && attributeModify.length > 0) {
      axios
        .post("http://" + host + "/" + JSON.parse(localStorage.getItem("userData")!).Role  + "/modify/" + tableName + "/modify", _modifyData,       
        {
          headers: authHeader()
        })
        .then((res) => {
          var response = DECRYPT(res.data);
          if(response.errorMessage){
            setMessageErr(response.errorMessage);
          }
          let tmpModifys : Array<string> = [];

          for (let i = 0; i < Object.values(modifys).length; i++) {
            tmpModifys.push("");
          }

          setModifys({...tmpModifys});
          setModifyValue([]);
          console.log(response.message);
          setModifyConfirm(!modifyConfirm);

          setMessage(response.message);

          setTimeout(() => {
            setMessage("");
          }, 4000)
        });
    } else {
      setMessage("NOT POSSIBLE");

      setTimeout(() => {
        setMessage("");
      }, 4000)
    }
  };

  const handleModifyValue = (i: number) => {
    if (modifyValue[i]) {
      let tmpModifys : Array<string> = [];

      for (let i = 0; i < Object.values(modifys).length; i++) {
        tmpModifys.push("");
      }

      setModifys({...tmpModifys});
      setModifyValue([]);
    } else {
      let tmp : Array<boolean> = [];
      tmp[i] = !tmp[i];
  
      let tmpModifys : Array<string> = [];
      for (let column = 0; column < Object.keys(schemaTableChosen).length; column++) {
        tmpModifys[column] = Object.values(databaseTableChosenInfo[i])[column];
      }
  
      setModifys({...tmpModifys});

      setModifyValue(tmp);
      console.log({...tmpModifys});
    }
  }

  const handleModifys = (i: number, value: string) => {
    var tmpModifys : Array<string> = modifys;

    tmpModifys[i] = value;

    setModifys({...tmpModifys});

    console.log(modifys);
  }
  //#endregion

  //#region delete region
  // placeholder for the radio buttons' values
  const tempRadioValue = useRef<Array<boolean>>([]);

  // functions to get Attributes to Delete and Values to Delete
  const getDeleteValue = (position: number) => {
    const result : Array<any> = [];
    console.log("running Delete Value");
    for (let i = 0; i < Object.keys(databaseTableChosenInfo[0]).length; i++) {
      result.push(
        Object.values(databaseTableChosenInfo[position])[i]
      );
    }
    return result;
  }

  const getAttributeDeletes = () => {
    const result : Array<any> = [];
    for (let i = 0; i < Object.keys(databaseTableChosenInfo[0]).length; i++) {
      result.push(
        Object.keys(databaseTableChosenInfo[0])[i]
      );
    }
    return result;
  }

  const sendDeleteRequest = () => {
    var attributeDelete = getAttributeDeletes();

    for (let i = 0; i < tempRadioValue.current.length; i++) {
      if (tempRadioValue.current[i]) {
        const deleteData = {id : 3, data: [tableName, attributeDelete, getDeleteValue(i)]};
        console.log(deleteData.data);
    
        axios
          .post("http://" + host + "/" + JSON.parse(localStorage.getItem("userData")!).Role + "/modify/" + tableName + "/delete", {data: ENCRYPT(deleteData)},
          {
            headers: authHeader()
          })
          .then((res) => {
            var response = DECRYPT(res.data);
            if(response.errorMessage){
              setMessageErr(response.errorMessage);
            }
            tempRadioValue.current = [];
            console.log(response.message);
            setDeleteConfirm(!deleteConfirm);

            setMessage(response.message);

            setTimeout(() => {
              setMessage("");
            }, 4000)
          });
      }
    }
  }

  const handleDelete = (i: number) => {
    tempRadioValue.current[i] = !tempRadioValue.current[i];
    console.log(tempRadioValue.current);
  }
  //#endregion

  //#region mapping region
  const MapSidePanel = () => {
    const result : any = [];

    result.push(
      <div className="side-panel">
        <MapPanel></MapPanel>
      </div>
    )

    return result;
  }

  const MapPanel = () => {
    const result : any = [];

    if (state === "insert") {
      result.push(
        <div className="selected-panel">
          <p className="--Text">Insert</p>
        </div>
      )
    } else {
      result.push(
        <div className="panel"
          onClick={() => {
            setState("insert");
            inserts.current = [];
          }}
        >
          <p className="--Text">Insert</p>
        </div>
      )
    }

    if (state === "delete") {
      result.push(
        <div className="selected-panel">
          <p className="--Text">Delete</p>
        </div>
      )
    } else {
      result.push(
        <div className="panel"
          onClick={() => {
            setState("delete");
            tempRadioValue.current = [];
          }}
        >
          <p className="--Text">Delete</p>
        </div>
      )
    }

    if (state === "modify") {
      result.push(
        <div className="selected-panel">
          <p className="--Text">Modify</p>
        </div>
      )
    } else {
      result.push(
        <div className="panel"
          onClick={() => {
            setState("modify");
            setModifyValue([]);
            setModifys([]);
          }}
        >
          <p className="--Text">Modify</p>
        </div>
      )
    }

    return result;
  }

  const MapDatabase = () => {
    return (
      <div className="database-form-container">
        <div className="--title">
          <p className="--Text --Title">{tableName?.charAt(0)?.toUpperCase()}{tableName?.slice(1)} Database</p>
        </div>

        {MapModifyForm()}

        <MapInsertForm/>

        <div className="database-table">
          <MapLoader></MapLoader>
        </div>

        <MapDelete></MapDelete>
      </div>
    );
  }

  const MapModifyForm = () => {
    const result : any = [];

    if (state === "modify") {
      if (schemaTableChosen !== defaultValue.current && noLoader.current && databaseTableChosenInfo !== defaultValue.current) {
        result.push(
          <div className="modify-form-container">
            {MapModify()}
          </div>
        )
      } else {
        result.push(
          <Loader></Loader>
        )
      }
    }

    return result;
  }

  const MapModify = () => {
    const result : any = [];

    result.push(
      <div className="modify-table-container">
        {MapTextFieldTableModify()}
      </div>
    )

    result.push(
      <div className="modify-button-container">
        <Button
          title ="Modify"
          handleClick={()=> {
            sendModifyRequest();
          }}
        ></Button>
      </div>
    )

    return result;
  }

  const MapTextFieldTableModify = () => {
    const result : any = [];

    result.push(
      <div className="modify-row-container">
        {MapTextFieldModify()}
      </div>
    )

    result.push(
      <div className="modify-row-container">
        <MapTypeModify/>
      </div>        
    )

    return result;
  }

  const MapTextFieldModify = () => {
    const result: any = [];

    for (let i = 0; i < Object.values(schemaTableChosen).length; i++) {
      if (!Object.values(schemaTableChosen[i])[5]) {
        if (i % 2 === 0) {
          result.push(
            <div className="modify-cell-container --s0"
              key={Object.values(schemaTableChosen[i])[0]}
            >
              <TextField
                //key={Object.values(schemaTableChosen[i])[0]}
                id="standard-basic"
                value={modifys[i]}
                label={Object.values(schemaTableChosen[i])[0]}
                variant="standard"
                onChange={(event) => {
                  handleModifys(i, event.target.value);
                }}
                InputLabelProps={(modifys[i]) ? { shrink: true } : {}}
      
                sx={{
                  "& .MuiInputLabel-root": {
                  color: "white",
                  },
                  "& label.Mui-focused": {
                  color: "white",
                  },
                  "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                  },
                }}/>
            </div>
          )
        } else {
          result.push(
            <div className="modify-cell-container --s1">
              <TextField
                id="standard-basic"
                value={modifys[i]}
                label={Object.values(schemaTableChosen[i])[0]}
                variant="standard"
                onChange={(event) => {
                  handleModifys(i, event.target.value);
                }}
                InputLabelProps={(modifys[i]) ? { shrink: true } : {}}
      
                sx={{
                  "& .MuiInputLabel-root": {
                  color: "white",
                  },
                  "& label.Mui-focused": {
                  color: "white",
                  },
                  "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                  },
                }}/>
            </div>
          )
        }
      }
    }

    return result;
  }

  const MapTypeModify = () => {
    const result: any = [];

    for (let i = 0; i < Object.values(schemaTableChosen).length; i++) {
      if (!Object.values(schemaTableChosen[i])[5]) {
        if (i % 2 === 0) {
          result.push(
            <p className="modify-cell-container --SmallText --s0">
              {"Type: " + Object.values(schemaTableChosen[i])[1]}
            </p>
          )
        } else {
          result.push(
            <p className="modify-cell-container --SmallText --s1">
              {"Type: " + Object.values(schemaTableChosen[i])[1]}
            </p>
          )
        }
      }
    }

    return result;
  }

  const MapInsertForm = () => {
    const result : any = [];

    if (state === "insert") {
      if (schemaTableChosen !== defaultValue.current && noLoader.current) {
        result.push(
          <div className="insert-form-container">
            <MapInsert></MapInsert>
          </div>
        )
      } else {
        result.push(
          <Loader></Loader>
        )
      }
    }

    return result;
  }

  const MapInsert = () => {
    const result : any = [];

    result.push(
      <div className="insert-table-container">
        <MapTextFieldTable/>
      </div>
    )

    result.push(
      <div className="insert-button-container">
        <Button
          title ="Insert"
          handleClick={()=> {
            sendInsertRequest()
          }}
        ></Button>
      </div>
    )

    return result;
  }

  const MapTextFieldTable = () => {
    const result : any = [];

    result.push(
      <div className="insert-row-container">
        <MapTextField></MapTextField>
      </div>
    )

    result.push(
      <div className="insert-row-container">
        <MapDefaultInsert/>
      </div>
    )

    return result;
  }

  const MapTextField = () => {
    const result: any = [];

    for (let i = 0; i < Object.values(schemaTableChosen).length; i++) {
      if (!Object.values(schemaTableChosen[i])[5]) {
        if (i % 2 === 0) {
          result.push(
            <div className="insert-cell-container --s0">
              <TextField
                id="standard-basic"
                value={inserts.current[i]}
                label={Object.values(schemaTableChosen[i])[0]}
                variant="standard"
                onChange={(event) => {
                  inserts.current[i] = event.target.value;
                }}
      
                sx={{
                  "& .MuiInputLabel-root": {
                  color: "white",
                  },
                  "& label.Mui-focused": {
                  color: "white",
                  },
                  "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                  },
                }}/>
            </div>
          )
        } else {
          result.push(
            <div className="insert-cell-container --s1">
              <TextField
                id="standard-basic"
                value={inserts.current[i]}
                label={Object.values(schemaTableChosen[i])[0]}
                variant="standard"
                onChange={(event) => {
                  inserts.current[i] = event.target.value;
                }}
      
                sx={{
                  "& .MuiInputLabel-root": {
                  color: "white",
                  },
                  "& label.Mui-focused": {
                  color: "white",
                  },
                  "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                  },
                }}/>
            </div>
          )
        }
      }
    }

    return result;
  }

  const MapDefaultInsert = () => {
    const result: any = [];

    for (let i = 0; i < Object.values(schemaTableChosen).length; i++) {
      if (!Object.values(schemaTableChosen[i])[5]) {
        if (i % 2 === 0) {
          result.push(
            <p className="insert-cell-container --SmallText --s0">
              {Object.values(schemaTableChosen[i])[4] ? `Default: ${Object.values(schemaTableChosen[i])[4]}` : "Key"}
            </p>
          )
        } else {
          result.push(
            <p className="insert-cell-container --SmallText --s1">
              {Object.values(schemaTableChosen[i])[4] ? `Default: ${Object.values(schemaTableChosen[i])[4]}` : "Key"}
            </p>
          )
        }
      }
    }

    return result;
  }

  const MapDelete = () => {
    const result : any = [];

    if (state === "delete") {
      if (schemaTableChosen !== defaultValue.current && noLoader.current && databaseTableChosenInfo !== defaultValue.current) {
        result.push(
          <div className="button-container">
            <Button
              mobile="active-mobile"
              title="Delete"
              //handleClick={authContext.signUp}
              //directs user to sign up page
              handleClick={() => {
                sendDeleteRequest();
              }}
            ></Button>
          </div>
        )
      } else {
        result.push(
          <Loader></Loader>
        )
      }
    }

    return result;
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

    for (let i = 0; i < Object.values(databaseTableChosenInfo).length; i++) {
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

    if (state === "delete") {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --Text --s0">Delete Checkbox</p>
        )
      } else {
        result.push(
          <p className="database-cell-container --Text --s1">Delete Checkbox</p>
        )
      }
    }

    if (state === "modify") {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --Text --s0">Modify Selection</p>
        )
      } else {
        result.push(
          <p className="database-cell-container --Text --s1">Modify Selection</p>
        )
      }
    }

    return result;
  }

  const MapNormalRow = (rowNumber : number) => {
    const result: any = [];
    
    var i = 0;

    for (i; i < Object.keys(databaseTableChosenInfo[0]).length; i++) {
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

    if (state === "delete") {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --s0">
            <Checkbox
              checked = {tempRadioValue.current[rowNumber]}
              onChange={() => handleDelete(rowNumber)}
              sx={{
                color: "white",
                '&.Mui-checked': {
                  color: "white",
                },
              }}
            />
          </p>
        )
      } else {
        result.push(
          <p className="database-cell-container --s1">
            <Checkbox
              checked = {tempRadioValue.current[rowNumber]}
              onChange={() => handleDelete(rowNumber)}
              sx={{
                color: "white",
                '&.Mui-checked': {
                  color: "white",
                },
              }}
            />
          </p>
        )
      }
    }

    if (state === "modify") {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --s0">
            <Checkbox
              checked = {modifyValue[rowNumber]}
              onChange={() => handleModifyValue(rowNumber)}
              sx={{
                color: "white",
                '&.Mui-checked': {
                  color: "white",
                },
              }}
            />
          </p>
        )
      } else {
        result.push(
          <p className="database-cell-container --s1">
            <Checkbox
              checked = {modifyValue[rowNumber]}
              onChange={() => handleModifyValue(rowNumber)}
              sx={{
                color: "white",
                '&.Mui-checked': {
                  color: "white",
                },
              }}
            />
          </p>
        )
      }
    }

    return result;
  }
  //#endregion

  //#region message notification
  const MessageNotification = () => {
    const result : any = [];

    if (message) {
      result.push(
        <div className="notification-screen">
          <div className="notification">
            <p className="--Text">{message}</p>
          </div>
        </div>
      )
    }

    return result;
  }

  //#endregion

  return (
    <div className="ModifyDatabaseChild">
      {renderer}
      <div className="--background">
        <img src="/UI/statue.jpg" alt="" />
      </div>

      <MessageNotification/>

      <MapSidePanel/>

      {MapDatabase()}

      <div className="button-container-BACK">
        <Button
          title="Back"
          position="--top-right-1"
          handleClick={() => {
            navigate("/employee/modify-database");
          }}
        ></Button>
      </div>
    </div>
  )
}
