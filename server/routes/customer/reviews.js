const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();
const reviewsRoute = require("./reviews.js");
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");

console.log("/routes/customer/reviews");

/**
 * GET request handler
 * 
 * retrieve the reviews of the top customers
 */
router.get("/:uid", (request, response) => {
  try {
    console.log("API for customer /customer/reviews/:uid");

    cores.SELECT("reviews", ["RText, RRatings"], ["UID"], [request.params.uid]).then(
      (value) => {
        response.json(ENCRYPT({
          message: request.params.uid + "'s Reviews retrived",
          info: value.info,
          queryInfo: value.queryInfo,
          queryError: value.queryError,
        }));
      }
    );
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
});

/**
 * POST request handler
 * 
 * post new review
 */
router.post("/", async (request, response) => {
  try {
    console.log("API for customer /customer/reviews");
    var sent_data = DECRYPT(request.body.data);

    let checkExist = await cores.CHECK_EXIST("reviews", ["UID"], [sent_data.data[0]])

    if (checkExist) {
      cores.UPDATE_TUPLE("reviews", ["RText", "RRatings"], [sent_data.data[1], sent_data.data[2]], ["UID"], [sent_data.data[0]]).then(
        (value) => {
          response.json(ENCRYPT({
            message: "Update review succesfully",
            queryInfo: value.queryInfo,
            queryError: value.queryError,
          }));
        }
      );
    } else {
      cores.INSERT_INTO("reviews", ["UID", "RText", "RRatings"], [sent_data.data[0], sent_data.data[1], sent_data.data[2]]).then(
        (value) => {
          response.json(ENCRYPT({
            message: "Insert review succesfully",
            queryInfo: value.queryInfo,
            queryError: value.queryError,
          }));
        }
      );
    }
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
});


module.exports = router;