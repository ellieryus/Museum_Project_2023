import "./Review.scss";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import axios from "axios";
import { Rating } from "@mui/material";
import { TextField } from "@mui/material";
//contemporary json file
import reviewTmp from "./ReviewArticle.json";
import authHeader from "../../utils/authHeader";
import ENCRYPT from "../../utils/encrypt";
import DECRYPT from "../../utils/decrypt";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

type review = {
  text: String | null;
  star: Number | null;
};
export default function Review() {
  // this state is used for rating exp
  const [starValue, setStarValue] = useState<number | null>(0);
  // this state is used for rating text exp
  const [textValue, setTextValue] = useState<String>("");
  // this state is used for setting up review table
  const [reviewTable, setReviewTable] = useState(reviewTmp);
  //this state is used for rendering formError in helpText prop of each input field
  const [formErrors, setFormErrors] = useState<any>({});
  var initReview: review = { text: "", star: 0 };

  const [setMessageErr, renderer] = useNotification();

  useEffect(() => {
    axios.get("http://" + host + "/default/reviews").then((res) => {
      console.log(res.data.info);
      setReviewTable(res.data.info);
      if(res.data.errorMessage){
        setMessageErr(res.data.errorMessage);
      }
    });
    if (localStorage.getItem("userData")) {
      if (JSON.parse(localStorage.getItem("userData")!).Role) {
        axios
          .get(
            "http://" + host + "/customer/reviews/" +
              JSON.parse(localStorage.getItem("userData")!).UID,
            {
              headers: authHeader() 
            }
          )
          .then((res) => {
            var response = DECRYPT(res.data);
            console.log(response.info);
            if(response.errorMessage){
              setMessageErr(response.errorMessage);
            }
            setTextValue(Object.entries(response.info[0])[0][1]!.toString());
            setStarValue(Number(Object.entries(response.info[0])[1][1]));
          });
      }
    }
  }, []);

  //save review form
  const saveForm = () => {
    if (localStorage.getItem("userData")) {
      const err: any = validate();
      setFormErrors(err);
      initReview.star = starValue;
      initReview.text = textValue;
      if (err.status === "ok") {
        const sendData = {
          id: 1,
          data: [
            JSON.parse(localStorage.getItem("userData")!).UID,
            textValue,
            starValue,
          ],
        };
        console.log(sendData);
        axios
          .post("http://" + host + "/customer/reviews", sendData, {
            headers: authHeader()
          })
          .then((res) => {
            var response = DECRYPT(res.data);
  
            console.log(response.message);
          });
      }
    } else {
      setMessageErr("301");
    }

  };

  //validates input value from user
  const validate = () => {
    const errors: any = { status: "ok" };

    if (!textValue) {
      errors.status = "bad";
      errors.type = "*Your emotion is required!";
    }
    if (textValue.length > 45) {
      errors.status = "bad";
      errors.type = "*Your emotion is exceeding 45 words!";
    }
    if (!starValue) {
      errors.status = "bad";
      errors.type = "*You have not rated yet!";
    }
    return errors;
  };
  return (
    <div className="Review">
      {renderer}
      <div className="--background">
        <img src="/UI/statue.jpg" alt="" />
      </div>
      <div className="review-container">
        <p className="--Text --Title">Rating from User</p>
        <div className="review-article">
          {reviewTable.map((e: any, i: number) => {
            return (
              <div className="item" key={i}>
                <div className="review-text">
                  <p className="--Text">
                    {Object.entries(e)[0][1]!.toString()}
                  </p>
                </div>
                <Rating value={Number(Object.entries(e)[1][1])} readOnly />
              </div>
            );
          })}
        </div>
      </div>
      <div className="review-rating">
        <p className="--Text">Ratings your experiences</p>
        <Rating
          name="simple-controlled"
          value={starValue}
          onChange={(event, newValue) => {
            setStarValue(newValue);
          }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Write your experiences.."
          // variant="standard"
          multiline
          maxRows={3}
          value={textValue}
          helperText={formErrors?.type}
          onChange={(event) => {
            setTextValue(event.target.value);
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
        <Button title="Save" handleClick={saveForm}></Button>
      </div>
    </div>
  );
}
