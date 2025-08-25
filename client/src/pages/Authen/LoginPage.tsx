import React, { KeyboardEvent } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "../../components/Button/Button";
import "./AuthenPage.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ENCRYPT from "../../utils/encrypt";
import DECRYPT from "../../utils/decrypt";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

type user = {
  username: string | null;
  pw: string | null;
};

type userData = {
  id: number | null;
  role: string | null;
};
const initUser: user = { username: "", pw: "" };

function LoginPage() {
  //this variable is used for referencing textfiled 1
  const input1Ref = useRef<HTMLInputElement>(null);
  //this variable is used for referencing textfiled 2
  const input2Ref = useRef<HTMLInputElement>(null);
  //this variable is used for navigating page components in router dom
  const navigate = useNavigate();
  var form_incrorect = false;
  const [setMessageErr, renderer] = useNotification();

  //this state is used for rendering formValue in each input field
  const [formValues, setFormValues] = useState(initUser);

  //this state is used for rendering formError in helpText prop of each input field
  const [formErrors, setFormErrors] = useState<any>({});

  //this state is used for rendering notification appearance
  const [isDone, setIsDone] = useState<"" | "--out">("");
  //this varaible is used for navigate text field by hitting tab button
  var inputRef = useRef<number>(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (input1Ref.current && inputRef.current % 2 === 0) input1Ref.current.focus();
      if (input2Ref.current && inputRef.current % 2 === 1) input2Ref.current.focus();
      inputRef.current++;
    }
    if (event.key === "Enter") {
      submitLogin();
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
  },);

  //updates formValue
  const handleChange = (prop: keyof user, value: any) => {
    setFormValues({ ...formValues, [prop]: value });
    console.log(formValues);
  };

  //submits sign up form
  const submitLogin = () => {
    const err: any = validate(formValues);
    setFormErrors(err);
    //check when errors list change
    if (err.status === "ok") {
      console.log(formValues);
      sendLoginRequest();
    }
  };

  //validates input value from user
  const validate = (tmpUser: user) => {
    const errors: any = { status: "ok" };
    //validates username
    if (form_incrorect) {
      errors.status = "bad";
      errors.username = "*Incorrect username or password!";
    }
    if (!tmpUser.username) {
      errors.status = "bad";
      errors.username = "*Username is required!";
    }
    //validates password
    if (!tmpUser.pw) {
      errors.status = "bad";
      errors.pw = "*Password is required";
    } else if (tmpUser.pw.length < 4) {
      errors.status = "bad";
      errors.pw = "*Password must be more than 4 characters";
    }
    return errors;
  };

  //sends request to database
  const sendLoginRequest = () => {
    //manual testcase when database is offline
    // authContext.setLoginInfo({ id: 12345, role: "admin" });
    // checkLogin("Login successfully");
    const sendData = {
      id: 1,
      data: [formValues.username, formValues.pw],
    };

    axios
      .post("http://" + host + "/default/auth/login", {
        data: ENCRYPT(sendData),
      })
      .then((res) => {
        var response = DECRYPT(res.data);
        console.log(response);
        if (response.errorMessage) {
          setMessageErr(response.errorMessage);
        } else {
          if (response.info) {
            console.log(Object.values(response.info)[0]);
            console.log(Object.values(response.info)[1]);
            localStorage.setItem(
              "userData",
              JSON.stringify({
                UID: Object.values(response.info)[0],
                Role: Object.values(response.info)[1],
                Token: Object.values(response.info)[2],
              })
            );
          }
        }
        //console.log(authContext.loginRes);
        console.log(sendData);
        checkLogin(response.message);
      });
  };
  //checks data responses
  const checkLogin = (resData: string) => {
    if (resData == "Login successfully") {
      //shows notification with noti message
      //directs user to user view
      //navigate(`/${}`);
      if (JSON.parse(localStorage.getItem("userData")!).Role === "customer") {
        setMessageErr("103");
      } else {
        setMessageErr("104");
      }
      setTimeout(() => {
        setIsDone("--out");
      }, 1000);
    } else if (resData == "Invalid user or password") {
      form_incrorect = true;
      submitLogin();
    }
  };

  function handleCallBackResponse(response: any) {
    const sendData = {
      id: 1,
      data: response.credential,
    };

    console.log(sendData.data);

    axios
      .post("http://" + host + "/default/auth/sign-in-with-google", {
        data: ENCRYPT(sendData),
      })
      .then((res) => {
        var response = DECRYPT(res.data);

        console.log(Object.values(response.info)[0]);
        console.log(Object.values(response.info)[1]);
        if (response.errorMessage) {
          setMessageErr(response.errorMessage);
        } else {
          if (response.info) {
            localStorage.setItem(
              "userData",
              JSON.stringify({
                UID: Object.values(response.info)[0],
                Role: Object.values(response.info)[1],
                Token: Object.values(response.info)[2],
              })
            );
            console.log(JSON.parse(localStorage.getItem("userData")!).Role);
            if (
              JSON.parse(localStorage.getItem("userData")!).Role === "customer"
            ) {
              setMessageErr("103");
            } else {
              setMessageErr("104");
            }
            setTimeout(() => {
              setIsDone("--out");
            }, 1000);
          }
        }
        //console.log(authContext.loginRes);
        console.log(sendData);
      });
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "174984122055-7bdurmnvo6ogirc0rp6cpje3v0otnt5o.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_black",
      size: "large",
      shape: "circle",
    });
  }, []);

  return (
    <div className={`AuthenPage ${isDone}`}>
      {renderer}
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <div className={`--background`}>
        <img src="/UI/statue.jpg" alt="" />
        <div className="--line"></div>
        <div className="--line"></div>
        <div className="--line"></div>
        <div className="--line"></div>
      </div>
      <div className="formContainer  glass" >
        <div className="authenForm">
          <p className="--Text --Title">Log in</p>
          <div className="field">
            <TextField
              inputRef={input1Ref}
              id="standard-basic"
              label="Username"
              variant="standard"
              value={formValues.username}
              helperText={formErrors?.username}
              onChange={(event) => {
                handleChange("username", event.target.value);
              }}
              onClick={() => {
                inputRef.current= 1;
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
              id="standard-basic"
              type="password"
              label="Password"
              variant="standard"
              value={formValues.pw}
              helperText={formErrors?.pw}
              onChange={(event) => {
                handleChange("pw", event.target.value);
              }}
              onClick={() => {
                inputRef.current= 0;
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
            title="Log in"
            type="--black --shadow"
            handleClick={submitLogin}
          ></Button>

          <div id="signInDiv"></div>

          <Button
            title="Don't have an account yet?"
            type="--link"
            handleClick={() => {
              navigate("/signup");
            }}
          ></Button>
        </div>
      </div>
      <Button
        title="Home"
        position="--top-right-1"
        handleClick={() => {
          navigate("/");
        }}
      ></Button>
    </div>
  );
}
export default LoginPage;
