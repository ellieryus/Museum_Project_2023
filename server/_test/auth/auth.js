const cores = require("../../core/core_functions");
const express = require("express");
const router = express.Router();

router.post("/login", async (request, response) => {
    // checks data of the user from database
    if (request.body.id == 1) {
      let check = cores.CHECK_EXIST("users", ["UName", "Password"], request.body.data);
  
        if (check) {
          let select = await cores.SELECT("users", ["UID", "Role"], ["UName", "Password"], cores.LENGTH_CHECKER(request.body.data));
          console.log(select.info[0].UID);

          var randomCode;
          var unique = false;
          while (!unique) {
            newCode = await cores.GENERATE_RANDOM_CODE(10);
            unique = newCode.unique;
            randomCode = newCode.code;
          }                  
          cores.INSERT_INTO("tokens", ["UID", "Role", "Token"], [select.info[0].UID, select.info[0].Role, randomCode]);  
          let result = {
            UID: select.info[0].UID, 
            Role: select.info[0].Role, 
            Token: randomCode
          };
          response.json({message: "Successfully login", info: result});
        } else {
          response.json({ message: "Invalid user or password" });
        }
    } else if (request.body.id == 2) {
    }
  });
  
router.post("/register", (request, response) => {
    if (request.body.id == 1) {
      cores.CHECK_EXIST("users", ["UName"], [request.body.data[0]]).then((value) => {
        if (!value) {
          cores.INSERT_INTO(
            "users",
            "(UName, Password, Phone)",
            request.body.data
          ).then((value) => {
            response.json({
              message: "registered successfully",
              queryInfo: value.queryInfo,
              queryError: value.queryError,
            });
          });
        } else {
          response.json({ message: "username already existed" });
          return;
        }
      });
    } else if (request.body.id == 2) {
    }
  });

module.exports = router;