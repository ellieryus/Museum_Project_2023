import "./Booking.scss";
import Button from "../../components/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Shop from "../LandingPage/Shop";
import { useState, useEffect, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Loader from "../../components/Loader/Loader";

//contemporary json file
import timeTableTmp from "./TimeTable.json";
import axios from "axios";
import ENCRYPT from "../../utils/encrypt";
import DECRYPT from "../../utils/decrypt";
import authHeader from "../../utils/authHeader";
import { ComponentToPrint } from "./ComponentToPrint";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

function Booking() {
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

  //this datatype is used for declaring ticket's information
  type ticket = {
    id: number;
    date?: string | null;
    month?: string | null;
    time?: string | null;
    number?: number | null;
    code?: string | null;
  };

  //this variable is used for initializing time table
  const [timeTable, setTimeTable] = useState(timeTableTmp);
  //this variable is used for initializing ticket
  const initTicket: ticket = { id: 0, date: "", month: "", time: "" };
  //this state is used for rendering ticket information corresponding timeslot
  const [ticketInfo, setTicketInfo] = useState<ticket>(initTicket);
  //this state is used for rendering ticket number in modify section
  const [ticketNum, setTicketNum] = useState<number>(0);
  //this state is used for rendering ticket list in modify section
  const [ticketList, setTicketList] = useState<ticket[]>([]);
  //this state is used for rendering visibility of modify section
  const [hideModify, setHideModify] = useState<null | "hide-booking-modify">(
    "hide-booking-modify"
  );
  //this state is used for rendering visibility of notification
  const [showNoti, setShowNoti] = useState<null | "--hide">("--hide");
  //this state is used for rendering content of notification
  const [showMessage, setShowMessage] = useState<string | null>("noti");
  const navigate = useNavigate();
  const [setMessageErr, renderer] = useNotification();


  //updates time table variable
  useEffect(() => {
    axios
      .get("http://" + host + "/default/booking/getTimeslots", {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.data.info.length === 15) {
          setTimeTable(res.data.info);
        }
        if(res.data.errorMessage){
          setMessageErr(res.data.errorMessage);
        }
        console.log(timeTable);
      });
  }, [ticketList]);

  //reduces ticket number
  const reduceNum = () => {
    ticketNum <= 0 ? setTicketNum(0) : setTicketNum(ticketNum - 1);
  };

  //increases ticket number
  const addNum = (id: any) => {
    if (ticketNum >= Number(Object.values(timeTable[id])[2])) {
      setShowMessage("exceeds available tickets!");
      setShowNoti(null);
      setTimeout(() => setShowNoti("--hide"), 3000);
    } else setTicketNum(ticketNum + 1);
  };

  //converts from date datatype to string data type
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

  //handles add event when clicking the timeslot button
  const handleAdd = (id: number) => {
    //shows modify window
    setHideModify(null);
    var day = convertDateFormat(Object.values(timeTable[id])[0].toString()).day;
    var month = convertDateFormat(
      Object.values(timeTable[id])[0].toString()
    ).month;
    var time = Object.values(timeTable[id])[1].toString();
    //update current ticket info
    setTicketInfo({
      id: id,
      date: day,
      month: month,
      time: time,
    });
    setTicketNum(0);
  };

  //handles submit ticket info
  const handleSubmit = () => {
    //checks duplicated booking of timeslot
    if (ticketList.filter((item) => item.id === ticketInfo.id).length === 1) {
      //shows message
      setShowMessage("This timeslot has been booked!");
      setShowNoti(null);
      setTimeout(() => setShowNoti("--hide"), 3000);
    } else {
      //checks validity of number of tickets
      if (ticketNum === 0) {
        //shows message
        setShowMessage("please enter num of ticket!");
        setShowNoti(null);
        setTimeout(() => setShowNoti("--hide"), 3000);
      } else {
        ticketInfo.number = ticketNum;
        //sets ticket number to 0
        setTicketNum(0);
        //adds ticket info to order list
        setTicketList([...ticketList, ticketInfo]);
        //shows message
        setShowMessage("add ticket successfully!");
        setShowNoti(null);
        setTimeout(() => setShowNoti("--hide"), 3000);
      }
    }
  };

  //maps the list of ticket
  const orderList = (e: ticket) => {
    return (
      <div
        className={"time-slot-item"}
        key={e.id}
        // removes ticket from list
        onClick={() => {
          setTicketList(ticketList.filter((item) => item.id !== e.id));
        }}
      >
        <div className="slide-btn">
          <p className="--Text">{`${e.date} ${e.month} ${e.time} | No: ${e.number}`}</p>
          <p className="--Text --white">remove</p>
        </div>
      </div>
    );
  };

  //list of 1 column of buttons
  var columnBtn: any = [];
  //maps 5 timeslots into each column
  const mappingTimeTable = (i: number) => {
    for (let j = i; j < i + 5; j++) {
      var time = Object.values(timeTable[j])[1].toString();
      var unclickable = null;
      var currentTime = new Date().getHours();
      var timeOnTable = Number(time.split(":")[0]);
      if (i < 5) {
        if (currentTime + 1 > timeOnTable && currentTime + 1 < 20) {
          unclickable = "--unclickable";
        }
      }
      columnBtn.push(
        <div
          className={`time-slot-btn ${unclickable}`}
          key={j}
          onClick={() => {
            handleAdd(j);
          }}
        >
          <div className="slide-btn">
            <p className="--Text">{time}</p>
            <p className="--Text --white">add</p>
          </div>
        </div>
      );
    }
    return columnBtn;
  };

  //list used to store 3 time slot column
  const Column: any = [];
  //renders 3 column for booking timeslot
  for (let i = 0; i < 3; i++) {
    //contemporary day time slot
    var day = convertDateFormat(
      Object.values(timeTable[i * 5])[0].toString()
    ).day;
    //contemporary month time slot
    var month = convertDateFormat(
      Object.values(timeTable[i * 5])[0].toString()
    ).month;
    //pushes day and month ontop of each column
    Column.push(
      <div className="time-slot-column" key={i}>
        <p className="--header">{`${day} ${month}`}</p>
        <div className="time-slot-line"></div>
        {/* maps 5 timeslots into each column  */}
        {mappingTimeTable(i * 5)}
      </div>
    );
    columnBtn = [];
  }

  //submits ticket ordered to database
  const handleBooking = () => {
    console.log(ticketList);
    if (ticketList.length === 0) {
      setShowMessage("Your order is empty!");
      setShowNoti(null);
      setTimeout(() => setShowNoti("--hide"), 3000);
    } else {
      ticketList.map((e) => {
        const sendData = {
          id: 1,
          data: [
            JSON.parse(localStorage.getItem("userData")!).UID,
            Object.values(timeTable)[e.id].TDate.slice(0, 10),
            e.time,
            e.number,
          ],
        };
        console.log(sendData);
        axios
          .post(
            "http://" + host + "/customer/booking/books",
            { data: ENCRYPT(sendData) },
            {
              headers: authHeader(),
            }
          )
          .then((res) => {
            var response = DECRYPT(res.data);
            if(response.errorMessage){
              setMessageErr(response.errorMessage);
            }
            console.log(response.message);
          });
      });
    }
    setTicketList([]);
  };
  const printElementRef = useRef<any>(null);

  // const handlePrint = () => {
  //   if (printElementRef.current !== null) {
  //     printElementRef.current.print();
  //   }
  // };

  const handlePrint = useReactToPrint({
    content: () => printElementRef.current,
  });
  return (
    <div className="Booking">
      {renderer}
      <div className="--background">
        <img src="/UI/Visit.jpg" alt="" />
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
        <div className="--line non-phone"></div>
      </div>

      {/* ticket time table section--------------------------------------- */}
      <div className="container">
        <div className="--title">
          <p className="--Text --Title">Booking Ticket</p>
        </div>
        <div className="time-slot-container">{Column}</div>
        <div className="button-container">
          <Button
            title="Home"
            type="--black"
            handleClick={() => navigate("/")}
          />
          <Button title="Book now" type="--black" handleClick={handleBooking} />
        </div>
      </div>

      {/* ticket modify section------------------------------------------- */}
      <div className={`booking-modify ${hideModify}`}>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            setHideModify("hide-booking-modify");
          }}
          style={{
            color: "white",
            position: "absolute",
            top: "50%",
            right: "5px",
            cursor: "pointer",
          }}
        >
          arrow_back_ios_new
        </span>
        <div className="booking-ticket-container">
          <p className="--Text" id="prata-booking">
            Ticket modify
          </p>
          <div className="booking-ticket">
            <img src="/UI/ticket-layout.png" alt="" />
            <img id="ticket-img" src="/UI/statue-halftone.png" alt="" />
            <div className="ticket-component">
              <div className="head-component">
                <div className="booking-ticket-info">
                  <p className="--Text">{ticketInfo.date}</p>
                  <p className="--Text">Entry</p>
                </div>
                <div className="-line"></div>
                <div className="booking-ticket-info">
                  <p className="--Text">{ticketInfo.month}</p>
                  <p className="--Text">{ticketInfo.time}</p>
                </div>
              </div>
              <div className="bottom-component">
                <div className="cir-ticket">
                  <div className="cir"></div>
                  <p className="--Text">TICKET</p>
                </div>
                <p id="-detail">concept design of the Rijksmuseum website</p>
                <p id="-barcode">{ticketInfo.time}</p>
              </div>
            </div>
          </div>
          <div className="booking-modify-container">
            <div className="remove-btn" onClick={reduceNum}>
              <i
                className="material-symbols-outlined"
                style={{ color: "white" }}
              >
                remove
              </i>
            </div>
            <p className="--Text" id="prata-booking">
              {ticketNum}
            </p>
            <div
              className="add-btn"
              onClick={() => {
                addNum(ticketInfo.id);
              }}
            >
              <i
                className="material-symbols-outlined"
                style={{ color: "white" }}
              >
                add
              </i>
            </div>
          </div>
          <p className={`--Text ${showNoti}`}>{showMessage}</p>
          <Button title="Confirm" handleClick={handleSubmit}></Button>
          <div className="-line-booking-modify"></div>
        </div>
        <div className="booking-order-container">
          <p className="--Text" id="prata-booking">
            Order list
          </p>
          <div className="booking-order-list">{ticketList.map(orderList)}</div>
          <Button title="Book now" handleClick={handleBooking} />
          {/* <button onClick={handlePrint}>Print</button> */}
          {/* <ReactToPrint
            trigger={() => <button>Print</button>}
            content={() => printElementRef.current}
          /> */}
        </div>
      </div>
    </div>
  );
}
export default Booking;
