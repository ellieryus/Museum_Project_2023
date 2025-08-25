import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router";

type SetMessageFunction = (message: string) => void;

function useNotification(): [SetMessageFunction, JSX.Element | null] {
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState<
    "--hidden" | "" | "--none"
  >("--none");
  const [messageErr, setMessageErr] = useState<String | null>(null);
  const [messageErr_, setMessageErr_] = useState<String | null>(null);

  //animation after rerender
  useEffect(() => {
    var url: String = "";
    var expired = false;
    var applyFade = true;
    switch (messageErr) {
      case "100":
        setMessageErr_("Login required");
        applyFade = false;
        url = "/login";
        break;
      case "101":
        setMessageErr_("You have exceeded the customer's permission limit");
        applyFade = false;
        url = "/customer";
        break;
      case "102":
        setMessageErr_("You have exceeded the employee's permission limit");
        applyFade = false;
        url = "/employee";
        break;
      case "103":
        setMessageErr_("Login successfully :> Welcome my customer.");
        applyFade = false;
        url = "/customer";
        break;
      case "104":
        setMessageErr_("Login successfully :> Welcome my employee.");
        applyFade = false;
        url = "/employee";
        break;
      case "105":
        setMessageErr_("Registered successfully!!!.");
        applyFade = false;
        url = "/login";
        break;
      case "200":
        setMessageErr_("Incorrect data!");
        url = "/";
        expired = true;
        break;
      case "201":
        setMessageErr_("Your session has expired!");
        url = "/login";
        expired = true;
        break;
      case "202":
        setMessageErr_("Successfully change password!");
        url = "/login";
        applyFade = true;
        break;
      case "300":
        setMessageErr_(
          "Service is currently busy. Sorry for the inconvenience."
        );
        applyFade = true;
        break;
      case "301":
        setMessageErr_("Please log in first before using this feature");
        applyFade = true;
        break;
      default:
        //setMessageErr_("Default");
        break;
    }

    if (messageErr) {
      setShowNotification("");
      setTimeout(() => {
        if (applyFade) {
          setShowNotification("--hidden");
          setMessageErr(null);
        }
      }, 2000);
      setTimeout(() => {
        if (applyFade) {
          setShowNotification("--none");
          setMessageErr(null);
        }
      }, 2500);
      setTimeout(() => {
        if (expired) {
          localStorage.removeItem("userData");
        }
      }, 2900);
      setTimeout(() => {
        if (url != "") navigate(url?.toString());
      }, 3000);
    }
  }, [messageErr, showNotification]);

  const renderer = (
    <div className={`blur-background ${showNotification}`}>
      <div className="message-container">
        <p className="--Text">{messageErr_}</p>
      </div>
    </div>
  );

  return [setMessageErr, renderer];
}
export default useNotification;
