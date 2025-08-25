const cores = require("../../utils/core_functions");
const express = require("express");
const middleware = require("../../middleware/access_level")
const { ENCRYPT } = require("../../utils/encrypt");
const router = express.Router();

console.log("/routes/default/check-login");

/**
 * POST request handler
 * 
 * Checks if the user already log in or not
 */
router.get("/", middleware.checkToken, async (req, res) => {
  try {
    console.log("API for default /default/check-login");

    let checkExist = await cores.CHECK_EXIST("tokens", ["Token"], [req.token]);

    if(checkExist){
      let checkID = await cores.SELECT("tokens", ["UID", "Role"], ["Token"], [req.token]);
      res.json(ENCRYPT({message: "UID and Role retrieval", info: checkID.info}));
    } else {
      res.json(ENCRYPT({message: "Login is required", errorMessage: "201"}));
    }
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

module.exports = router;