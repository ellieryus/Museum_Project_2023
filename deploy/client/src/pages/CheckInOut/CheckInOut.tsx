import React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "../../components/Button/Button";
import "./CheckInOut.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import exTicket from "./ticket.json";
import ENCRYPT from "../../utils/encrypt";
import DECRYPT from "../../utils/decrypt";
import authHeader from "../../utils/authHeader";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

type ticket = {
  ticketCode: string;
};

const initTicket: ticket = {ticketCode: "" };

export default function CheckInOut(){
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

  const [ticket, setTicket] = useState(exTicket);

  //this state is used for rendering formValue in each input field
  const [formValues, setFormValues] = useState(initTicket);

  //this state is used for rendering formError in helpText prop of each input field
  const [formErrors, setFormErrors] = useState<any>({});

  //this state is used for rendering notification appearance
  const [noti, setNoti] = useState<"on" | "off">("on");
  const [message, setMessage] = useState<string | null>(null);

  //validates input value from user
  const validate = (tmpTicket: ticket) => {
      const errors: any = { status: "ok" };

      //validates ticket code
      if (!tmpTicket.ticketCode) {
      errors.status = "bad";
      errors.ticketCode = "*Ticket Code is required";
      } 
      return errors;
  };

  //updates formValue
  const handleChange = (prop: keyof ticket, value: any) => {
      setFormValues({ ...formValues, [prop]: value });
  };

  //submits check-in form
  const submitTicketStatusForm = (event: any) => {
      event.preventDefault();
      const err: any = validate(formValues);
      setFormErrors(err);

      //check when errors list change
      if (err.status === "ok") {
          console.log(formValues);
          sendTicketStatusRequest();
      } 
  };

  const CheckTicketStatus = () => {
    const result: any = [];

    if(Object.values(ticket[0])[5] === "booked"){
      result.push(
        <div className="button-container">
          <Button
              mobile="active-mobile"
              title="Check-in"
              handleClick={sendCheckinRequest}
          ></Button>
      </div>
      )
    } else if (Object.values(ticket[0])[5] === "check-in"){
      result.push(
        <div className="button-container">
          <Button
              mobile="active-mobile"
              title="Check-out"
              handleClick={sendCheckoutRequest}
          ></Button>
        </div>
      );
    }
    return result;
  }

  const sendTicketStatusRequest = () => {
    axios
    .get("http://" + host + "/employee/check-in-out/" + formValues.ticketCode,
    {
      headers: authHeader()
    })
    .then((res) => {
      var response = DECRYPT(res.data);
      if(response.errorMessage){
        setMessageErr(response.errorMessage);
      } else if(response.info == false){
        setTicket(exTicket);
        setMessage(response.message);
        setNoti("on");
        setTimeout(() => {
            setNoti("off");
        }, 7000);
      } else {
        setTicket(response.info);
      }
    });
  };

  const sendCheckinRequest = () => {
      const ticketCheckinData = {id : 1, data: [formValues.ticketCode]};
      const _ticketCheckinData = {
        data: ENCRYPT(ticketCheckinData)
      }
      axios
      .post("http://" + host + "/employee/check-in-out/check-in", _ticketCheckinData,
      {
        headers: authHeader()
      })
      .then((res) => {
        var response = DECRYPT(res.data);
        if(response.errorMessage){
          setMessageErr(response.errorMessage);
        }
        console.log(response.message);
        setMessage(response.message);
        setNoti("on");
        setTimeout(() => {
            setNoti("off");
        }, 7000);
        sendTicketStatusRequest();
      });
  };

  const sendCheckoutRequest = () => {
      const ticketCheckoutData = {id: 2, data: [formValues.ticketCode]};
      const _ticketCheckoutData = {
        data: ENCRYPT(ticketCheckoutData)
      }
      axios
      .post("http://" + host + "/employee/check-in-out/check-out", _ticketCheckoutData,
      {
        headers: authHeader(),
      })
      .then((res) => {
        var response = DECRYPT(res.data);
        if(response.errorMessage){
          setMessageErr(response.errorMessage);
        }
        console.log(response.message);
        setMessage(response.message);
        setNoti("on");
        setTimeout(() => {
            setNoti("off");
        }, 7000);
        sendTicketStatusRequest();
      });
  }


  const MapDatabase = () => {
    return (
      <div className="database-table-container">
        <MapRow></MapRow>
      </div>
    );
  }

  const MapRow = () => {
    const result: any = [];

    result.push(
      <div className="database-row-container">
        <MapAttributeRow></MapAttributeRow>
      </div>
    )

    for (var i = 0; i < Object.values(ticket).length; i++) {
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

    for (var i = 0; i < Object.keys(ticket[0]).length; i++) {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --Text --s0">{Object.keys(ticket[0])[i]}</p>
        )
      } else {
        result.push(
          <p className="database-cell-container --Text --s1">{Object.keys(ticket[0])[i]}</p>
        )
      }
    }

    return result;
  }

  const MapNormalRow = (rowNumber : number) => {
    const result: any = [];

    for (var i = 0; i < Object.keys(ticket[0]).length; i++) {
      if (i % 2 === 0) {
        result.push(
          <p className="database-cell-container --Text --s0">{Object.values(ticket[rowNumber])[i]}</p>
        )
      } else {
        result.push(
          <p className="database-cell-container --Text --s1">{Object.values(ticket[rowNumber])[i]}</p>
        )
      }
      result.push(
        
      )
    }
    return result;
  }

  return (
      <div className="CheckInOut">
        {renderer}
          <div className="--background">
          <img src="/UI/statue.jpg" alt="" />
          </div>
          <div className="formContainer">
              <div className="checkInOutForm">
                  <div className={`notification ${noti}`}>
                  <p className="--Text">{message}</p>
                  </div>
                  <div className="--Text --Title"> Check</div>
                  <div className="field">
                      <TextField
                      id="standard-basic"
                      label="Ticket Code"
                      variant="standard"
                      value={formValues.ticketCode}
                      helperText={formErrors?.ticketCode}
                      onChange={(event) => {
                          handleChange("ticketCode", event.target.value);
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
                        handleClick={submitTicketStatusForm}
                    ></Button>
                  </div>
                  <MapDatabase></MapDatabase>
                  <CheckTicketStatus></CheckTicketStatus>
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
