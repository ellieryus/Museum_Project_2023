const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();

// test connection
console.log("/routes/default/giftshop");

/**
 * GET request handler for /getGoodsTable
 * 
 * retrieve the tuples of the table goods
 */
router.get("/getGoodsTable", (request, response) => {
  try {
    console.log("API for default /default/giftshop/getGoodsTable");

    cores.SELECT_TABLE("goods")
    .then((value) => {
      response.json({
        message: "successfully info",
        info: value.info,
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      });
    })
  } catch (error) {
    console.log(error);
    response.json({errorMessage: "300"})
  }
})

module.exports = router;