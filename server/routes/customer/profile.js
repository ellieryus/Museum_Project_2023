const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/access_level");
const hash = require("js-sha256");
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");

/**
 * GET request handler
 * 
 * get the information about the customer with an UID 
 */
router.get("/:uid", async (request, response) => {
  try {
    console.log("API for customer /customer/profile/:uid");

    cores.SELECT("users", ["UName"], ["UID"], [request.params.uid])
    .then((value) => {
      response.json(ENCRYPT({
        message: "profile retrieved",
        info: value.info        
      }))
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}));
  }
})

/**
 * POST request handler
 * 
 * change password 
 */
router.post("/modify/password", middleware.checkUser, async (request , response) => {
  try {
    console.log("API for customer /customer/profile/modify/password");
    var sent_data = DECRYPT(request.body.data);

    var oldPassword = hash(sent_data.data[1]);
    var newPassword = hash(sent_data.data[2]);

    cores.CHECK_EXIST("users", ["UID", "Password"], [sent_data.data[0], oldPassword])
    .then((res1) => {
      if (res1) {
        cores.UPDATE_TUPLE("users", ["Password"], [newPassword], ["UID"], [sent_data.data[0]])
        .then((value) => {
          response.json(ENCRYPT({
            message: "update password",      
          }))
        })
      } else {
        response.json(ENCRYPT({message: "The submit password is wrong, please try again", error: "Again"}));
      }
    })


  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}));
  }
})

module.exports = router;