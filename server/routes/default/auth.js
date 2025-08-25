const cores = require("../../utils/core_functions");
const express = require("express");
const jwt_decode = require("jwt-decode");
const hash = require("js-sha256");
const jwt = require("jsonwebtoken");
const config = require("../../config/jsonwebtoken");
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");
const router = express.Router();

console.log("/routes/default/auth");

/**
 * POST request handler to login
 *
 * checks username and password for login request
 */
router.post("/login", async (request, response) => {
  try {
    console.log("API for default /default/auth/login");
    var sent_data = DECRYPT(request.body.data);

    sent_data.data[1] = hash(sent_data.data[1]);
    // checks data of the user from database
    let check = await cores.CHECK_EXIST(
      "users",
      ["UName", "Password"],
      sent_data.data
    );

    if (check) {
      let select = await cores.SELECT(
        "users",
        ["UID", "Role"],
        ["UName", "Password"],
        cores.LENGTH_CHECKER(sent_data.data)
      );

      var randomCode;
      var unique = false;
      while (!unique) {
        newCode = await cores.GENERATE_RANDOM_CODE(10, "tokens", "Token");
        unique = newCode.unique;
        randomCode = newCode.code;
      }                  
      cores.INSERT_INTO("tokens", ["UID", "Role", "Token"], [select.info[0].UID, select.info[0].Role, randomCode]);  
      
      var token = jwt.sign({ token: randomCode }, config.secret, {
        expiresIn: 86400 // 5 minutes
      });

      let result = {
        UID: select.info[0].UID, 
        Role: select.info[0].Role, 
        Token: token
      };
      response.json(ENCRYPT({message: "Login successfully", info: result}));
    } else {
      response.json(ENCRYPT({message: "Invalid user or password" }));
    }
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({ errorMessage: "300" }));
  }
});

/**
 * POST request handler to register
 *
 * checks username, password and create account for register request
 */
router.post("/register", (request, response) => {
  try {
    console.log("API for default /default/auth/register");
    var sent_data = DECRYPT(request.body.data);

    sent_data.data[1] = hash(sent_data.data[1]);
    cores
      .CHECK_EXIST("users", ["UName"], [sent_data.data[0]])
      .then((value) => {
        if (!value) {
          cores
            .INSERT_INTO("users", "UName, Password, Phone", sent_data.data)
            .then((value) => {
              response.json(ENCRYPT({
                message: "registered successfully",
                queryInfo: value.queryInfo,
                queryError: value.queryError,
              }));
            });
        } else {
          response.json(ENCRYPT({ message: "username already existed" }));
          return;
        }
      });
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({ errorMessage: "300" }));
  }
});


/**
 * POST request handler to sign in with google
 * 
 * signs in with google account
 */
router.post("/sign-in-with-google", async (request, response) => {
  try {
    console.log("API for default /default/auth/sign-in-with-google");
    var sent_data = DECRYPT(request.body.data);

    let info = jwt_decode(sent_data.data);
        
    if (info.email_verified) {
      await cores
        .CHECK_EXIST("users", ["UName"], [info.email.toString()])
        .then((value) => {
          if (!value) {
            cores.INSERT_INTO("users", "UName", [info.email.toString()]);
          }
        });

      let select = await cores.SELECT(
        "users",
        ["UID", "Role"],
        ["UName"],
        [info.email.toString()]
      );

      var randomCode;
      var unique = false;
      while (!unique) {
        newCode = await cores.GENERATE_RANDOM_CODE(10, "tokens", "Token");
        unique = newCode.unique;
        randomCode = newCode.code;
      }
      await cores.INSERT_INTO(
        "tokens",
        ["UID", "Role", "Token"],
        [select.info[0].UID, select.info[0].Role, randomCode]
      );

      var token = jwt.sign({ token: randomCode }, config.secret, {
        expiresIn: 86400 // 5 minutes
      });

      let result = {
        UID: select.info[0].UID,
        Role: select.info[0].Role,
        Token: token,
      };

      console.log(ENCRYPT({message: "Login successfully", info: result}));

      response.json(ENCRYPT({message: "Login successfully", info: result}));

    } else {
      response.json(ENCRYPT({
        message: "Sign in with Google failed",
        errorMessage: "login page"
      }))
    }
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
});

module.exports = router;
