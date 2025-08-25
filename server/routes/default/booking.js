const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();

console.log("/routes/default/booking");

/**
 * GET request handler
 * 
 * retrieve the available Timeslots for customers to book
 */
router.get("/getTimeslots", (request, response) => {
  try {
    console.log("API for default /default/booking/getTimeslots");

    cores.SELECT_TABLE("timeslots")
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