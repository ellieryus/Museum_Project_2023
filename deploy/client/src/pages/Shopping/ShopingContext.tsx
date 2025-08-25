import { useState, createContext } from "react";
import React from "react";
import axios from "axios";
//contemporary json file
import itemTableTmp from "./item.json";
import ENCRYPT from "../../utils/encrypt";
import DECRYPT from "../../utils/decrypt";
import authHeader from "../../utils/authHeader";
import useNotification from "../../hooks/useNoti";
import { host } from "../../config/host";

//This variable is used for storing user login information
type item = {
  id: number;
  name?: string | null;
  categories: string;
  quantity: number;
  number: number;
  price?: string | null;
};
//this variable is used for initializing item
var tmpItem: item = { id: 0, categories: "", quantity: 0, number: 0 };
const ShopContext = createContext<any>(0);

//provides item context globaly
function ShopProvider(props: any) {
  //this variable is used for initializing item table
  const [itemTable, setItemTable] = useState(itemTableTmp);
  //this state is used for rendering item list in cart
  const [itemList, setItemList] = useState<item[]>([]);
  //this state is used for rendering items' quantities
  const [productQuantities, setProductQuantities] = useState<any>({});
  //this state is used for handling add items into pending list
  const [update, setUpdate] = useState<boolean>(false);

  //const [setMessageErr, renderer] = useNotification();

  //updates list of item
  const updateItemList = (tmpItem: item) => {
    setItemList([...itemList, tmpItem]);
  };
  //removes specific item from list
  const removeItem = (id: number) => {
    setItemList(itemList.filter((item: any) => item.id !== id));
    //addItemToPending();
    setUpdate(true);
  };
  //updates items' quantities in the list
  function handleQuantityChange(id: number, quantity: number) {
    setProductQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
    //console.log(Object.values(itemList)[0]);
    var update = false;
    itemList.map((e, i) => {
      if (e.id === id) {
        if (e.number == quantity) {
          update = false;
        } else {
          update = true;
        }
      }
    });
    if (update) {
      setItemList(
        itemList.map((e, i) => (e.id === id ? { ...e, number: quantity } : e))
      );
    }
  }

  //increases number of item
  function handleAdd(id: number, i: number) {
    handleQuantityChange(
      id,
      Math.min((productQuantities[id] || 1) + 1, Number(itemList[i].quantity))
    );
    //addItemToPending();
    setUpdate(true);
  }
  //decreases number of item
  function handleRemove(id: number) {
    handleQuantityChange(id, Math.max((productQuantities[id] || 1) - 1, 1));
    //addItemToPending();
    setUpdate(true);
  }

  //updates item into pending list.
  const addItemToPending = () => {
    if (localStorage.getItem("userData")) {
      console.log(itemList);

      var arrayId: number[] = [];
      var arrayNumber: number[] = [];
      var sum = 0;
      if (itemList != null) {
        itemList.map((e: item, i: number) => {
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
  
      const _sendData = {
        data: ENCRYPT(sendData)
      }
      axios
        .post(
          "http://" + host + "/customer/giftshop/cart",
          _sendData,
          {
            headers: authHeader(),
          }
        )
  
        .then((res) => {
          //console.log(res.data.info);
          var response = DECRYPT(res.data);

          if(response.errorMessage){
            //setMessageErr(response.errorMessage);
          }
        });
    }
  };
  //retrieves pending list (itemList)
  const retrievePending = () => {
    if (localStorage.getItem("userData")) {
      axios
      .get(
        "http://" + host + "/customer/giftshop/getGoodsTable/pending/" +
          JSON.parse(localStorage.getItem("userData")!).UID,
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        var response = DECRYPT(res.data);
        
        if(response.errorMessage){
          //setMessageErr(response.errorMessage);
        }

        setItemList([]);
        //shopContext.setItemList(res.data.info);
        response.info.map((e: any, i: number) => {
          //console.log(e);
          let tmp = e;
          updatePendingList(
            Number(Object.values(tmp)[1]),
            Number(Object.values(tmp)[2]),
            i
          );
          setItemList(pendingArr);
        });
      });
    }
  };
  //updates item which is chosen by user
  var pendingArr: item[] = [];
  const updatePendingList = (i: number, num: number, index: number) => {
    tmpItem = {
      id: i,
      name: Object.values(itemTable[i - 1])[1].toString(),
      categories: Object.values(itemTable[i - 1])[2].toString(),
      quantity: Number(Object.values(itemTable[i - 1])[3]),
      number: num,
      price: Object.values(itemTable[i - 1])[4].toString(),
    };
    pendingArr[index] = tmpItem;
  };
  //export value for global usage
  const value = {
    itemList,
    setItemList,
    updateItemList,
    productQuantities,
    removeItem,
    handleAdd,
    handleRemove,
    handleQuantityChange,
    addItemToPending,
    setItemTable,
    itemTable,
    retrievePending,
    update,
    setUpdate,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
    //{renderer}
  );
}

export { ShopContext, ShopProvider };
