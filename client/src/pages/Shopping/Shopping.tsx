import "./Shopping.scss";
import Button from "../../components/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "./ShopingContext";
import axios from "axios";
import authHeader from "../../utils/authHeader";
import ShoppingItem from "./ShoppingItem";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

function Shopping() {
  const focusRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const shopContext = useContext(ShopContext);
  //this datatype is used for declaring ticket's information

  interface item {
    id: number;
    name?: string | null;
    categories: string;
    quantity: number;
    number: number;
    price?: string | null;
  }
  //this variable is used for initializing item
  var tmpItem: item = { id: 0, categories: "", quantity: 0, number: 0 };
  //this variable is used for initializing filter list
  var initFilterList: any = [];
  //this state is used for rendering filter list
  const [filterList, setFilterList] = useState<string[]>([]);
  //this state is used for rendering filter list which is chosen
  const [filterList_, setFilterList_] = useState<string[]>([]);
  //this state is used for rendering list filter
  const [show, setShow] = useState<"--hide" | "">("--hide");
  const [isAnimate, setIsAnimate] = useState<"in-animate" | "re-animate" | "">(
    ""
  );
  const [setMessageErr, renderer] = useNotification();

  //updates item table variable
  useEffect(() => {
    axios
      .get("http://" + host + "/default/giftshop/getGoodsTable", {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res.data.message);
        //setMessageErr(res.data.message);
        shopContext.setItemTable(res.data.info);

        if(res.data.errorMessage){
          setMessageErr(res.data.errorMessage);
        }
      });
    shopContext.retrievePending();
  }, []);

  useEffect(() => {
    initFilterList = [];
    shopContext.itemTable.map((e: any, i: number) => {
      initFilterList.push(Object.entries(e)[2][1]!.toString());
    });

    setFilterList(Array.from(new Set(initFilterList)));
  }, [shopContext.itemTable]);

  useEffect(() => {
    if (shopContext.update) {
      shopContext.addItemToPending();
      shopContext.setUpdate(false);
      console.log("change");
    }
  }, [shopContext.update]);
  //updates item which is chosen by user
  const updateItemList = (e: any, i: number) => {
    var duplicate = false;
    tmpItem = {
      id: i + 1,
      name: Object.entries(e)[1][1]!.toString(),
      categories: Object.entries(e)[2][1]!.toString(),
      quantity: Number(Object.entries(e)[3][1]),
      number: 1,
      price: Object.entries(e)[4][1]!.toString(),
    };
    //checks duplicate item to increase it's quantity
    shopContext.itemList.forEach((i: any) => {
      if (i.id == tmpItem.id) {
        i.number = i.number + 1;
        duplicate = true;
      }
    });
    if (!duplicate) {
      shopContext.updateItemList(tmpItem);
    }
    //console.log(shopContext.itemList);
  };

  return (
    <div className="Shopping">
      {renderer}
      <div className="--background">
        <img src="/UI/Shop.jpg" alt="" />
      </div>
      <div className="container">
        <div className="--title" ref={focusRef}>
          <p className="--Text --Title">Gifts & Souvenirs</p>
        </div>
        <div className="filter-container">
          <div
            className="filter"
            onClick={() => (show == "--hide" ? setShow("") : setShow("--hide"))}
          >
            <p className="--Text">Sort by:</p>
            <i className="material-symbols-outlined" style={{ color: "white" }}>
              {show == "--hide" ? "expand_more" : "expand_less"}
            </i>
          </div>
          <div className="filter-item-list">
            {filterList_.map((e: string, i) => {
              return (
                <div
                  className="filter-item"
                  key={i}
                  onClick={() => {
                    setIsAnimate("re-animate");
                    setFilterList([...filterList, e]);
                    setTimeout(() => {
                      setFilterList_(filterList_.filter((item) => item !== e));
                    }, 300);
                    setTimeout(() => {
                      setIsAnimate("in-animate");
                    }, 300);
                  }}
                >
                  <div className="slide-btn">
                    <p className="--Text">{e}</p>
                    <p className="--Text --white">remove</p>
                  </div>
                </div>
              );
            })}
          </div>
          <ul className={`--Text filter-list ${show}`}>
            {filterList.map((e: string, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    setIsAnimate("");
                    setShow("--hide");
                    setFilterList(filterList.filter((item) => item !== e));
                    setFilterList_([...filterList_, e]);
                    setTimeout(() => {
                      setIsAnimate("in-animate");
                    }, 200);
                  }}
                >
                  {e}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="item-container">
          {shopContext.itemTable.map((e: any, i: number) => {
            if (filterList_.includes(Object.entries(e)[2][1]!.toString())) {
              return (
                <ShoppingItem
                  key={i}
                  inAnimate={isAnimate}
                  handleClick={() => {
                    updateItemList(e, i);
                    shopContext.setUpdate(true);
                  }}
                  id={i}
                  GID = {Object.entries(e)[0][1]!.toString()}
                  name={Object.entries(e)[1][1]!.toString()}
                  price={Object.entries(e)[4][1]!.toString()}
                />
              );
            }
          })}
        </div>
        <div className="button-container">
          <Button
            title="Home"
            type="--black"
            handleClick={() => navigate("/")}
          />
          <div className="cart-number">{shopContext.itemList.length}</div>
          <Button
            title="My cart"
            type="--black"
            handleClick={() => {
              navigate("/Shopping/Cart");
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Shopping;
