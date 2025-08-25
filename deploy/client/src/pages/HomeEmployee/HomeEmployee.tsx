import "./HomeEmployee.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import useLogout from "../../hooks/useLogout";
import useNotification from "../../hooks/useNoti";

//this component is used for render user view
export default function HomeEmployee() {
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

  const logout = useLogout();

  return (
    <div className="HomeEmployee">
      {renderer}
      <div className="--background">
        <img src="/UI/statue.jpg" alt="" />
      </div>

      <div className="side-panel">
        <div className="panel" 
          onClick={() => {
            navigate("/employee/view-database");
          }
        }>
          <p className="--Text">View Database</p>
        </div>

        <div className="panel" 
          onClick={() => {
            navigate("/employee/modify-database");
          }
        }>
          <p className="--Text">Modify Database</p>
        </div>

        <div className="panel" 
          onClick={() => {
            navigate("/employee/check-in-out");
          }}>
          <p className="--Text">Check In Out</p>
        </div>

        <div className="panel" 
          onClick={() => {
            navigate("/employee/inventory");
          }}>
          <p className="--Text">Manage Inventory</p>
        </div>
      </div>

      <div className="Title">
        <p className="--Text">Administration page of the Museum</p>
        <p className="--Text --Title">Cloud Museum</p>
      </div>

      <Button
        title="Log out"
        position="--top-right-1"
        handleClick={() => {
          logout.logout();
        }}
      ></Button>
    </div> 
  );
}
