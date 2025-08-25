import "./Profile.scss";
import Button from "../../components/Button/Button";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import ticketsTmp from "./itemTicket.json";
import itemsTmp from "./itemCart.json";
import { TextField } from "@mui/material";
import authHeader from "../../utils/authHeader";
import DECRYPT from "../../utils/decrypt";
import ENCRYPT from "../../utils/encrypt";
import useNotification from "../../hooks/useNoti";
import { useNavigate } from "react-router";
import { host } from "../../config/host";

//this variable is used for mapping month in json file
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Item {
  GName: string;
  GQuantity: number;
  BDate: string;
  BNum: string;
}
//this variable is data for input fields in authenForm section
type user = {
  pw_: string | null;
  pw: string | null;
  pwConfirm: string | null;
};
//this variable is a null user
const initUser: user = { pw_: "", pw: "", pwConfirm: "" };

export default function Profile() {
  //use notification hook
  const [setMessage, renderer] = useNotification();
  //this variable is used for referencing textfiled 1
  const input1Ref = useRef<HTMLInputElement>(null);
  //this variable is used for referencing textfiled 2
  const input2Ref = useRef<HTMLInputElement>(null);
  //this variable is used for referencing textfiled 3
  const input3Ref = useRef<HTMLInputElement>(null);
  //this state is used for show or hide panel change password
  const [panel, setPanel] = useState<"expand-div" | "" | null>(null);
  //this state is used for show or hide panel change password
  const [panelPw, setPanelPw] = useState<"-show" | "">("");
  const [panelPwVisble, setPanelPwVisible] = useState<"-visible" | "">("");

  //this state is used for rendering formValue in each input field
  const [formValues, setFormValues] = useState(initUser);
  //this state is used for rendering formError in helpText prop of each input field
  const [formErrors, setFormErrors] = useState<any>({});

  //this variable is ref to ticket slider div
  const slideRef = useRef<HTMLDivElement>(null);

  //this variable is number of ticket belong to user.
  var ticketQuantity = 0;

  //this variable is used for navigating ticket slider
  var slider: number = 0;
  //this state is used for rendering list of ticket
  const [tickets, setTickets] = useState(ticketsTmp);
  const [userName, setUserName] = useState<String>("User Name");

  //this state is used for show or hide drop down list
  const [show, setShow] = useState<{ [id: string]: "--show" | "" }>({});
  //this state is used for rendereing items
  const [items, setItems] = useState(itemsTmp);
  const [items_, setItems_] = useState(itemsTmp);
  //this state is used for filter the bill num of delivered items
  const [deliverList, setDeliverList] = useState<{ [key: string]: Item[] }>({});
  //this state is used for filter the bill num of booked items
  const [bookList, setBookList] = useState<{ [key: string]: Item[] }>({});
  //submits change password form
  const navigate = useNavigate();
  const submitChange = () => {
    const err: any = validate(formValues);
    setFormErrors(err);
    if (err.status === "ok") {
      console.log(formValues);
      sendChangeRequest();
    }
  };
  //updates formValue
  const handleChange = (prop: keyof user, value: any) => {
    setFormValues({ ...formValues, [prop]: value });
  };
  var inputRef = 0;
  var pw_incorrect = false;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (input1Ref.current && inputRef % 3 === 0) input1Ref.current.focus();
      if (input2Ref.current && inputRef % 3 === 1) input2Ref.current.focus();
      if (input3Ref.current && inputRef % 3 === 2) input3Ref.current.focus();
      inputRef++;
    }
    if (event.key === "Enter") {
      submitChange();
    }
  };
  useEffect(() => {
    document.addEventListener(
      "keydown",
      handleKeyDown as unknown as (event: Event) => void
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown as unknown as (event: Event) => void
      );
    };
  });
  useEffect(() => {
    if (panel == "expand-div") {
      setTimeout(() => {
        setPanelPw("-show");
      }, 500);
      setTimeout(() => {
        setPanelPwVisible("-visible");
      }, 700);
    } else {
      setPanelPw("");
      setPanelPwVisible("");
    }
  }, [panel]);
  //get info from server
  useEffect(() => {
    //get user name
    axios
      .get(
        "http://" + host + "/customer/profile/" +
          JSON.parse(localStorage.getItem("userData")!).UID,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);
        if (response.info) {
          //console.log(Object.values(response.info[0]));
          setUserName(Object.values(response.info[0]).toString());
        }
      });
    //get tickets
    axios
      .get(
        "http://" + host + "/customer/booking/" +
          JSON.parse(localStorage.getItem("userData")!).UID +
          "/ticket",
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);
        if (response.info) {
          setTickets(response.info);
        }
      });
    //get items
    axios
      .get(
        "http://" + host + "/customer/giftshop/getGoodsTable/booked/" +
          JSON.parse(localStorage.getItem("userData")!).UID,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);
        if (response.info) {
          setItems(response.info);
        }
      });
    axios
      .get(
        "http://" + host + "/customer/giftshop/getGoodsTable/delivered/" +
          JSON.parse(localStorage.getItem("userData")!).UID,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);
        if (response.info) {
          setItems_(response.info);
        }
      });
  }, []);

  const sendChangeRequest = () => {
    const sendData = {
      id: 1,
      data: [
        JSON.parse(localStorage.getItem("userData")!).UID,
        formValues.pw_,
        formValues.pw,
      ],
    };
    const _sendData = {
      data: ENCRYPT(sendData),
    };
    axios
      .post(
        "http://" + host + "/customer/profile/modify/password",
        _sendData,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);
        if (response.error) {
          console.log(response.message);
          pw_incorrect = true;
          submitChange();
        } else {
          console.log(response.message);
          pw_incorrect = false;
          setPanel("");
          setMessage("202");
        }
      });
  };
  //validates input value from user
  const validate = (tmpUser: user) => {
    console.log(pw_incorrect);

    const errors: any = { status: "ok" };
    if (pw_incorrect) {
      errors.status = "bad";
      errors.pw_ = "*Incorrect password!";
    }
    if (!tmpUser.pw_) {
      errors.status = "bad";
      errors.pw_ = "*Current password is required!";
    }
    //validates password
    if (!tmpUser.pw) {
      errors.status = "bad";
      errors.pw = "*Password is required";
    } else if (tmpUser.pw.length < 4) {
      errors.status = "bad";
      errors.pw = "*Password must be more than 4 characters";
    }
    //validates confirm password
    if (!(tmpUser.pwConfirm === tmpUser.pw)) {
      errors.status = "bad";
      errors.pwConfirm = "*Those passwords didn’t match. Try again.";
    }
    return errors;
  };

  function convertDateFormat(time: string) {
    var tmp = new Date(time);
    var day = tmp.getDate().toString();
    var tmpMonth = tmp.getMonth();
    var month: string = "";
    for (let i = 0; i < 12; i++) {
      if (tmpMonth === i) {
        month = months[i];
      }
    }
    return { day: day, month: month };
  }

  const handleDrop = (id: string) => {
    show[id] == "--show"
      ? setShow((prev: any) => ({
          ...prev,
          [id]: "",
        }))
      : setShow((prev: any) => ({
          ...prev,
          [id]: "--show",
        }));
  };

  useEffect(() => {
    const tmpBook: { [key: string]: Item[] } = {};
    const tmpDeliver: { [key: string]: Item[] } = {};
    items.map((e: Item) => {
      const billNum = Object.entries(e)[3][1];
      if (!tmpBook[billNum]) {
        tmpBook[billNum] = [];
      }
      tmpBook[billNum].push(e);
    });
    items_.map((e: Item) => {
      const billNum = Object.entries(e)[3][1];
      if (!tmpDeliver[billNum]) {
        tmpDeliver[billNum] = [];
      }
      tmpDeliver[billNum].push(e);
    });

    setBookList(tmpBook);
    setDeliverList(tmpDeliver);
  }, [items]);

  var renderBookedItems: any = [];
  var renderDeliveredItems: any = [];

  for (const key in bookList) {
    const tmpBookItems = bookList[key];

    renderBookedItems.push(
      <div className="item-container" key={key}>
        <div className="item" onClick={() => handleDrop(key)}>
          <div className="item-title">
            <p className="--Text">{`${Object.entries(
              tmpBookItems[0]
            )[2][1]!.toString()}`}</p>
            <p className="--SmallText">{`Bill number: ${key}`}</p>
          </div>
          <i className="material-symbols-outlined" style={{ color: "white" }}>
            {show[key] == "--show" ? "expand_less" : "expand_more"}
          </i>
        </div>
        <ul className={`${show[key]}`}>
          {tmpBookItems.map((e: any, i: number) => {
            return (
              <li key={i}>
                <p className="--Text">{Object.entries(e)[0][1]!.toString()}</p>
                <p className="--Text">{`quantity: ${Number(
                  Object.entries(e)[1][1]
                )}`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  for (const key in deliverList) {
    const tmpDeliverItems = deliverList[key];

    renderDeliveredItems.push(
      <div className="item-container" key={key}>
        <div className="item" onClick={() => handleDrop(key)}>
          <div className="item-title">
            <p className="--Text">{`${Object.entries(
              tmpDeliverItems[0]
            )[2][1]!.toString()}`}</p>
            <p className="--SmallText">{`Bill number: ${key}`}</p>
          </div>
          <i className="material-symbols-outlined" style={{ color: "white" }}>
            {show[key] == "--show" ? "expand_less" : "expand_more"}
          </i>
        </div>
        <ul className={`${show[key]}`}>
          {tmpDeliverItems.map((e: any, i: number) => {
            return (
              <li key={i}>
                <p className="--Text">{Object.entries(e)[0][1]!.toString()}</p>
                <p className="--Text">{`quantity: ${Number(
                  Object.entries(e)[1][1]
                )}`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const handleNext = () => {
    // setNavSlider(slider);

    if (slider > -ticketQuantity + 1) {
      if (slideRef)
        slideRef.current!.style.transform = `translateX(${
          slider * 200 - 200
        }px)`;
      slider--;
    }
  };
  const handleBack = () => {
    if (slider < 0) {
      if (slideRef)
        slideRef.current!.style.transform = `translateX(${
          slider * 200 + 200
        }px)`;
      slider++;
    }
  };

  return (
    <div className="Profile">
      {renderer}
      <div className="--background">
        <img src="/UI/statue.jpg" alt="" />
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
      </div>

      <div
        className={`account-container ${
          panel == null ? "" : "in-animate"
        } ${panel}`}
      >
        <div className="account">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              panel == "expand-div" ? setPanel("") : setPanel("expand-div");
              if (panel != "expand-div") {
                setFormValues(initUser);
              }
            }}
            style={{
              color: "white",
            }}
          >
            account_circle
          </span>
          <div className="account-title">
            <p className="--header">{userName}</p>
            <p className="--Text">
              {JSON.parse(localStorage.getItem("userData")!).Role}
            </p>
          </div>
        </div>
        <div className={`change-pw-form ${panelPw} ${panelPwVisble}`}>
          <div className="field">
            <TextField
              inputRef={input1Ref}
              type="password"
              label="Current password"
              variant="standard"
              value={formValues.pw_}
              helperText={formErrors?.pw_}
              onChange={(event) => {
                handleChange("pw_", event.target.value);
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

            <TextField
              inputRef={input2Ref}
              type="password"
              label="Password"
              variant="standard"
              value={formValues.pw}
              helperText={formErrors?.pw}
              onChange={(event) => {
                handleChange("pw", event.target.value);
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
            <TextField
              inputRef={input3Ref}
              type="password"
              label="Confirm Password"
              variant="standard"
              value={formValues.pwConfirm}
              helperText={formErrors?.pwConfirm}
              onChange={(event) => {
                handleChange("pwConfirm", event.target.value);
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
          </div>
          <Button
            title="Change"
            type="--black --shadow"
            handleClick={submitChange}
          ></Button>
        </div>
      </div>

      <div className="section">
        <div className="section-ticket">
          {tickets.length == 0 && <p className="--Text"></p>}
          {tickets.length == 0 && <p className="--Text"></p>}

          {tickets.length == 0 && <p className="--header">Empty of Ticket</p>}
          <div className="ticket-slider-out">
            <div className="ticket-slider-in" ref={slideRef}>
              {tickets.map((e: any, i: number) => {
                ticketQuantity++;
                var day = convertDateFormat(
                  Object.entries(e)[0][1]!.toString()
                ).day;
                var month = convertDateFormat(
                  Object.entries(e)[0][1]!.toString()
                ).month;

                return (
                  <div className="booking-ticket" key={i}>
                    <img src="/UI/ticket-layout.png" alt="" />
                    <img id="ticket-img" src="/UI/statue-halftone.png" alt="" />
                    <div className="ticket-component">
                      <div className="head-component">
                        <div className="booking-ticket-info">
                          <p className="--Text">{day}</p>
                          <p className="--Text">Entry</p>
                        </div>
                        <div className="-line"></div>
                        <div className="booking-ticket-info">
                          <p className="--Text">{month}</p>
                          <p className="--Text">
                            {Object.entries(e)[1][1]!.toString()}
                          </p>
                        </div>
                      </div>
                      <div className="bottom-component">
                        <div className="cir-ticket">
                          <div className="cir"></div>
                          <p className="--Text">TICKET</p>
                        </div>
                        <p id="-detail">
                          concept design of the Rijksmuseum website
                        </p>
                        <p id="-barcode">
                          {Object.entries(e)[2][1]!.toString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="navigate">
            <div className="remove-btn">
              <i
                className="material-symbols-outlined"
                style={{ color: "white" }}
                onClick={handleBack}
              >
                arrow_back_ios
              </i>
            </div>
            <span
              className="material-symbols-outlined"
              style={{
                color: "white",
              }}
            >
              confirmation_number
            </span>
            <p className="--Text">{ticketQuantity}</p>

            <div className="add-btn">
              <i
                className="material-symbols-outlined"
                style={{ color: "white" }}
                onClick={handleNext}
              >
                arrow_forward_ios
              </i>
            </div>
          </div>
        </div>
        <div className="section-cart">
          <div className="item-header">
            <p className="--header">Booked</p>
          </div>
          {renderBookedItems}
          <div className="item-header">
            <p className="--header">Delivered</p>
          </div>
          {renderDeliveredItems}
        </div>
      </div>
      <Button
        title="Home"
        position="--top-right-1"
        handleClick={() => {
          navigate("/customer");
        }}
      ></Button>
    </div>
  );
}
