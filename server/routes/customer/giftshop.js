const cores = require("../../utils/core_functions");
const express = require("express");
const middleware  = require("../../middleware/access_level");
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");
const router = express.Router();

// test connection
console.log("/routes/customer/giftshop");


/**
 * GET request handler for /getGoodsTable
 * 
 * retrieve the tuples of the table goods
 */
router.get("/getGoodsTable", (request, response) => {
  try {
    console.log("API for customer /customer/giftshop/getGoodsTable");

    cores.SELECT_TABLE("goods")
    .then((value) => {
      response.json(ENCRYPT({
        message: "successfully info",
        info: value.info,
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      }));
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

/**
 * GET request handler for /getGoodsTable/pending/:uid
 * 
 * retrieve the tuples of the table goods where status of cart is pending
 */
router.get("/getGoodsTable/pending/:uid", (request, response) => {
  try {
    console.log("API for customer /customer/giftshop/getGoodsTable/pending/:uid");

    cores.SELECT("buys", ["*"], ["UID", "BStatus"], [request.params.uid, "pending"])
    .then((value) => {
      response.json(ENCRYPT({
        message: "successfully info",
        info: value.info,
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      }));
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }

})

/**
 * GET request handler for /getGoodsTable/booked/:uid
 * 
 * retrieve the tuples of the table goods where status of cart is booked
 */
router.get("/getGoodsTable/booked/:uid", (request, response) => {
  try {
    console.log("API for customer /customer/giftshop/getGoodsTable/booked/:uid");

    cores.SELECT("(buys NATURAL JOIN goods)", ["GName", "GQuantity", "BDate", "BillNum"], ["UID", "BStatus"], [request.params.uid, "booked"])
    .then((value) => {
      response.json(ENCRYPT({
        message: "successfully info",
        info: value.info,
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      }));
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

/**
 * GET request handler for /getGoodsTable/delivered/:uid
 * 
 * retrieve the tuples of the table goods where status of cart is delivered
 */
router.get("/getGoodsTable/delivered/:uid", (request, response) => {
  try {
    console.log("API for customer /customer/giftshop/getGoodsTable/delivered/:uid");

    cores.SELECT("(buys NATURAL JOIN goods)", ["GName", "GQuantity", "BDate", "BillNum"], ["UID", "BStatus"], [request.params.uid, "deliver"])
    .then((value) => {
      response.json(ENCRYPT({
        message: "successfully info",
        info: value.info,
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      }));
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }

})

router.post("/booked", middleware.checkUser, async (request, response) => {
  try {
    console.log("API for customer /customer/giftshop/booked");
    
    var sent_data = DECRYPT(request.body.data);
    var randomCode;
    var unique = false;
    while (!unique) {
      newCode = await cores.GENERATE_RANDOM_CODE(4, "buys", "BillNum");
      unique = newCode.unique;
      randomCode = newCode.code;
    }
  
    var BDate = cores.GET_DATE(0);
    var BTime = cores.GET_TIME();
  
    for (var i = 0; i < sent_data.data[3]; i++){
      cores.UPDATE_TUPLE(
        "buys",
        ["BDate", "BTime", "BillNum", "BStatus"],
        [BDate, BTime, randomCode, "booked"], ["UID", "BStatus"],
        [sent_data.data[0], "pending"]
      );
  
      cores.DECREASE(
        "goods",
        ["GAmount"],
        cores.LENGTH_CHECKER([sent_data.data[2][i]]),
        ["GID"],
        cores.LENGTH_CHECKER([sent_data.data[1][i]])
      );
    }
  
    response.json({
      message: "successfully place order"
    });
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

router.post("/cart", async (request, response) => {
  try {
    console.log("API for customer /customer/giftshop/cart");
    var sent_data = DECRYPT(request.body.data);

    cores.DELETE_FROM("buys",["UID", "BStatus"], [sent_data.data[0], "pending"])
    .then((value) => {
      for (var i = 0; i < sent_data.data[3]; i++) {
        cores.INSERT_INTO(
          "buys",
          ["UID", "GID", "GQuantity"],
          [sent_data.data[0], sent_data.data[1][i], sent_data.data[2][i]]
        )
      }
      response.json(ENCRYPT({
        message: "successfully change amount"
      }));
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

module.exports = router;