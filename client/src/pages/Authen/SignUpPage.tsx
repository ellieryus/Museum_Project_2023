import React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "../../components/Button/Button";
import "./AuthenPage.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ENCRYPT from "../../utils/encrypt";
import DECRYPT from "../../utils/decrypt";
import authHeader from "../../utils/authHeader";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";
//this variable is data for input fields in authenForm section
type user = {
  username: string | null;
  phoneNr: string | null;
  pw: string | null;
  pwConfirm: string | null;
};
//this variable is a null user
const initUser: user = { username: "", phoneNr: "", pw: "", pwConfirm: "" };
function SignUpPage() {
  //this variable is used for referencing textfiled 1
  const input1Ref = useRef<HTMLInputElement>(null);
  //this variable is used for referencing textfiled 2
  const input2Ref = useRef<HTMLInputElement>(null);
  //this variable is used for referencing textfiled 3
  const input3Ref = useRef<HTMLInputElement>(null);
  //this variable is used for referencing textfiled 4
  const input4Ref = useRef<HTMLInputElement>(null);
  const [setMessageErr, renderer] = useNotification();
  //this state is used for rendering notification appearance
  const [isDone, setIsDone] = useState<"" | "--out">("");

  //this variable is used for navigating page components in router dom
  const navigate = useNavigate();
  //this variable provides userdata context
  //this state is used for rendering formValue in each input field
  const [formValues, setFormValues] = useState(initUser);
  //this state is used for rendering formError in helpText prop of each input field
  const [formErrors, setFormErrors] = useState<any>({});
  //this state is used for rendering receive data from request database
  const [registerRes, setRegisterRes] = useState<string | null>(null);
  //this varaible is used for navigate text field by hitting tab button
  var inputRef = 0;
  var form_incorrect = false;
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (input1Ref.current && inputRef % 4 === 0) input1Ref.current.focus();
      if (input2Ref.current && inputRef % 4 === 1) input2Ref.current.focus();
      if (input3Ref.current && inputRef % 4 === 2) input3Ref.current.focus();
      if (input4Ref.current && inputRef % 4 === 3) input4Ref.current.focus();
      inputRef++;
    }
    if (event.key === "Enter") {
      submitSignUp();
    }
  };

  useEffect(() => {
    console.log("mounting");

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
  //updates formValue
  const handleChange = (prop: keyof user, value: any) => {
    setFormValues({ ...formValues, [prop]: value });
  };
  //submits sign up form
  const submitSignUp = () => {
    const err: any = validate(formValues);
    setFormErrors(err);
    //check when errors list change
    if (err.status === "ok") {
      console.log(formValues);
      sendRegisterRequest();
    }
  };
  //validates input value from user
  const validate = (tmpUser: user) => {
    const errors: any = { status: "ok" };
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (form_incorrect) {
      errors.status = "bad";
      errors.username = "*Username is already existed!";
    }
    //validates username
    if (!tmpUser.username) {
      errors.status = "bad";
      errors.username = "*Username is required!";
    }
    //validates phone number
    if (!tmpUser.phoneNr) {
      errors.status = "bad";
      errors.phoneNr = "*Phone number is required";
    } else if (!regex.test(tmpUser.phoneNr)) {
      errors.status = "bad";
      errors.phoneNr = "*Phone number is incorrect format";
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
    console.log("up2dateErr", errors);
    return errors;
  };
  //sends request to database
  const sendRegisterRequest = () => {
    const sendData = {
      id: 1,
      data: [formValues.username, formValues.pw, formValues.phoneNr],
    };
    axios
      .post(
        "http://" + host + "/default/auth/register",
        { data: ENCRYPT(sendData) },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);

        if (response.errorMessage) {
          setMessageErr(response.errorMessage);
        } else {
          setRegisterRes(response.data);
          console.log(response.message);
          checkRegister(response.message);
        }
      });
    console.log(registerRes);
  };
  //checks data responses
  const checkRegister = (resData: string) => {
    if (resData === "registered successfully") {
      setTimeout(() => {
        setIsDone("--out");
      }, 1000);
      setMessageErr("105");
    } else if ((resData = "username is already existed!")) {
      form_incorrect = true;
      submitSignUp();
    }
  };

  return (
    <div className={`AuthenPage ${isDone}`}>
      {renderer}
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <div className="--background">
        <img src="/UI/statue.jpg" alt="" />
        <div className="--line"></div>
        <div className="--line"></div>
        <div className="--line"></div>
        <div className="--line"></div>
      </div>
      <div className="formContainer glass">
        <div className="authenForm">
          <p className="--Text --Title">Register</p>
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
                // inputRef.current = 1;
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
              label="Phone Number"
              variant="standard"
              value={formValues.phoneNr}
              helperText={formErrors?.phoneNr}
              onChange={(event) => {
                handleChange("phoneNr", event.target.value);
              }}
              onClick={() => {
                // inputRef.current= 2;
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
                // inputRef.current= 3;
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
              inputRef={input4Ref}
              id="standard-basic"
              type="password"
              label="Confirm Password"
              variant="standard"
              value={formValues.pwConfirm}
              helperText={formErrors?.pwConfirm}
              onChange={(event) => {
                handleChange("pwConfirm", event.target.value);
              }}
              onClick={() => {
                // inputRef.current= 4;
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
            title="Sign up"
            type="--black --shadow"
            handleClick={submitSignUp}
          ></Button>
          <Button
            title="Already have an account?"
            type="--link"
            handleClick={() => {
              navigate("/login");
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
export default SignUpPage;
