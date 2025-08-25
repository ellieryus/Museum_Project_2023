const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();

console.log("/routes/default/reviews");

/**
 * GET request handler
 * 
 * retrieve the reviews of the top customers
 */
router.get("/", (request, response) => {
  try {
    console.log("API for default /default/reviews");

    cores.SELECT_V2("reviews", ["RText, RRatings"], "RRatings", 3).then(
      (value) => {
        response.json({
          message: "Reviews retrived",
          info: value.info,
          queryInfo: value.queryInfo,
          queryError: value.queryError,
        });
      }
    );
  } catch (error) {
    console.log(error);
    response.json({errorMessage: "300"})
  }
});


module.exports = router;