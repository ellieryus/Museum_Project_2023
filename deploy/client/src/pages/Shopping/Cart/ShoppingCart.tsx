import Button from "../../../components/Button/Button";
import "./ShoppingCart.scss";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../ShopingContext";
import axios from "axios";
import useNotification from "../../../hooks/useNoti";
import authHeader from "../../../utils/authHeader";
import { host } from "../../../config/host";
import ENCRYPT from "../../../utils/encrypt";

//This variable is used for storing user login information
type item = {
  id: number;
  name?: string | null;
  categories: string;
  quantity: number;
  number: number;
  price?: string | null;
};
function ShoppingCart() {
  const shopContext = useContext(ShopContext);
  const [setMessageErr, renderer] = useNotification();

  const navigate = useNavigate();
  //this state is used for rendering visibility of notification
  const [show, setShow] = useState<"" | "--hidden">("");
  const [order, setOrder] = useState<boolean>(false);
  const placeOrder = () => {
    if (localStorage.getItem("userData")) {
      console.log(shopContext.itemList);

      var arrayId: number[] = [];
      var arrayNumber: number[] = [];
      var sum = 0;
      if (shopContext.itemList != null) {
        shopContext.itemList.map((e: item, i: number) => {
          // console.log("map");
  
          arrayId[i] = e.id;
          arrayNumber[i] = e.number;
          sum++;
        });
      }
      const sendData = {
        id: 1,
        data: [
          JSON.parse(localStorage.getItem("userData")!).UID,
          arrayId,
          arrayNumber,
          sum,
        ],
      };
      console.log(sendData);
      axios
        .post("http://" + host + "/customer/giftshop/booked", {data: ENCRYPT(sendData)}, {
          headers: authHeader()
        })
        .then((res) => {
          setOrder(!order);
          //console.log(res.data.info);
        });
    } else {
      setMessageErr("301")
    }
  };
  //renders
  useEffect(() => {
    shopContext.retrievePending();
  }, [order]);
  console.log(order);

  useEffect(() => {
    if (shopContext.itemList.length == 0) {
      setShow("");
    } else {
      setShow("--hidden");
    }
    shopContext.itemList.forEach((e: any) => {
      shopContext.handleQuantityChange(e.id, e.number);
    });
  }, [shopContext.itemList]);

  useEffect(() => {
    if (shopContext.update) {
      shopContext.addItemToPending();
      shopContext.setUpdate(false);
    }
  }, [shopContext.update]);

  return (
    <div className="Shopping-cart">
      {renderer}
      <div className="--background">
        <img src="../../UI/Shop.jpg" alt="" />
      </div>
      <div className="container">
        <p className="--Text --Title">Order list</p>
        <p className={`--Text --Title  ${show}`}>Your Cart is empty</p>
        <ul className="item-container">
          {shopContext.itemList.map((e: any, i: number) => {
            if (shopContext.itemList.length != 0)
              return (
                <li key={i}>
                  <div className="item-title">
                    <p className="--Text">{e.name}</p>
                  </div>
                  <div className="item-modify">
                    <i
                      className="material-symbols-outlined"
                      style={{ color: "white" }}
                      onClick={() => shopContext.handleRemove(e.id)}
                    >
                      remove
                    </i>
                    <p className="--Text">
                      {shopContext.productQuantities[e.id]}
                    </p>
                    <i
                      className="material-symbols-outlined"
                      style={{ color: "white" }}
                      onClick={() => shopContext.handleAdd(e.id, i)}
                    >
                      add
                    </i>
                    <div
                      className="delete"
                      onClick={() => {
                        shopContext.removeItem(e.id);
                      }}
                    >
                      <p className="--Text">Delete</p>
                    </div>
                  </div>
                </li>
              );
          })}
        </ul>

        <div className="button-container">
          <Button
            title="Back"
            type="--black"
            handleClick={() => navigate("/Shopping")}
          />
          <Button
            title="Place order"
            type="--black"
            handleClick={() => {
              console.log(shopContext.itemList);
              placeOrder();
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default ShoppingCart;
