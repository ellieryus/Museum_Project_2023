import React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "../../components/Button/Button";
import "./Iventory.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cart from "./cart.json";
import authHeader from "../../utils/authHeader";
import ENCRYPT from "../../utils/encrypt";
import DECRYPT from "../../utils/decrypt";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

type bill = {
  billNum: string;
};

const initbill: bill = { billNum: "" };

export default function Inventory() {
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

  const [bill, setBill] = useState(cart);

  //this state is used for rendering formValue in each input field
  const [formValues, setFormValues] = useState(initbill);

  //this state is used for rendering formError in helpText prop of each input field
  const [formErrors, setFormErrors] = useState<any>({});

  //this state is used for rendering notification appearance
  const [noti, setNoti] = useState<"on" | "off">("on");
  const [message, setMessage] = useState<string | null>(null);

  //validates input value from user
  const validate = (tmpUser: bill) => {
    const errors: any = { status: "ok" };

    //validates password
    if (!tmpUser.billNum) {
      errors.status = "bad";
      errors.billNum = "*Bill Number is required";
    }
    return errors;
  };

  //updates formValue
  const handleChange = (prop: keyof bill, value: any) => {
    setFormValues({ ...formValues, [prop]: value });
  };

  //submits deliver form
  const submitDeliverForm = (event: any) => {
    event.preventDefault();
    const err: any = validate(formValues);
    setFormErrors(err);

    //check when errors list change
    if (err.status === "ok") {
      console.log(formValues);
      sendBillStatusRequest();
    }
  };

  const CheckBillStatus = () => {
    const result: any = [];

    if (Object.values(bill[0])[6] === "booked") {
      result.push(
        <div className="button-container">
          <Button
            mobile="active-mobile"
            title="Deliver"
            handleClick={sendDeliverRequest}
          ></Button>
        </div>
      );
    }
    return result;
  };

  const sendBillStatusRequest = () => {
    axios
      .get(
        "http://" + host + "/employee/inventory/" +
          ENCRYPT(formValues.billNum),
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);
        if(response.errorMessage){
          setMessageErr(response.errorMessage);
        } else if (response.info == false) {
          setBill(cart);
          setMessage(response.message);
          setNoti("on");
          setTimeout(() => {
            setNoti("off");
          }, 7000);
        } else {
          setBill(DECRYPT(response.info));
        }
      });
  };

  const sendDeliverRequest = () => {
    const billDeliverData = { id: 2, data: [formValues.billNum] };

    axios
      .post(
        "http://" + host + "/employee/inventory/deliver",
        {data: ENCRYPT(billDeliverData)},
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);
        if(response.errorMessage){
          setMessageErr(response.errorMessage);
        }
        console.log(response.data.message);
        setMessage(response.data.message);
        setNoti("on");
        setTimeout(() => {
          setNoti("off");
        }, 7000);
        sendBillStatusRequest();
      });
  };

  const MapDatabase = () => {
    return (
      <div className="database-table-container">
        <MapRow></MapRow>
      </div>
    );
  };

  const MapRow = () => {
    const result: any = [];

    result.push(
      <div className="database-row-container">
        <MapAttributeRow></MapAttributeRow>
      </div>
    );

    for (var i = 0; i < Object.values(bill).length; i++) {
      result.push(
        <div className="database-row-container">{MapNormalRow(i)}</div>
      );
    }

    return result;
  };

  const MapAttributeRow = () => {
    const result: any = [];

    for (var i = 0; i < Object.keys(bill[0]).length; i++) {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --Text --s0">
            {Object.keys(bill[0])[i]}
          </p>
        );
      } else {
        result.push(
          <p className="database-cell-container --Text --s1">
            {Object.keys(bill[0])[i]}
          </p>
        );
      }
    }

    return result;
  };

  const MapNormalRow = (rowNumber: number) => {
    const result: any = [];

    for (var i = 0; i < Object.keys(bill[0]).length; i++) {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --Text --s0">
            {Object.values(bill[rowNumber])[i]}
          </p>
        );
      } else {
        result.push(
          <p className="database-cell-container --Text --s1">
            {Object.values(bill[rowNumber])[i]}
          </p>
        );
      }
      result.push();
    }
    return result;
  };

  return (
    <div className="Inventory">
      {renderer}
      <div className="--background">
        <img src="/UI/statue.jpg" alt="" />
      </div>
      <div className="formContainer">
        <div className="inventoryForm">
          <div className={`notification ${noti}`}>
            <p className="--Text">{message}</p>
          </div>
          <div className="--Text --Title"> Inventory</div>
          <div className="field">
            <TextField
              id="standard-basic"
              label="Bill Number"
              variant="standard"
              value={formValues.billNum}
              helperText={formErrors?.billNum}
              onChange={(event) => {
                handleChange("billNum", event.target.value);
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
              }}
            />
            <Button
              mobile="active-mobile"
              title="Enter"
              handleClick={submitDeliverForm}
            ></Button>
          </div>
          <MapDatabase></MapDatabase>
          <CheckBillStatus></CheckBillStatus>
        </div>
      </div>

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
