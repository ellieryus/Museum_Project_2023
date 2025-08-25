const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/access_level");
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");

console.log("/routes/employee/modify");

/**
 * POST request handler to insert
 * 
 * insert into a table
 */
router.post("/:tableName/insert", middleware.checkTable,(request, response) => {
  try {
    console.log("API for employee /employee/modify/:tableName/insert");
    var sent_data = DECRYPT(request.body.data);

    cores.INSERT_INTO(
      sent_data.data[0],
      cores.LENGTH_CHECKER(sent_data.data[1]),
      cores.LENGTH_CHECKER(sent_data.data[2])
    ).then((value) => {
      response.json(ENCRYPT({
        message: "successfully insert",
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      }));
    });
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

/**
 * POST request handler to delete
 * 
 * delete from a table
 */
router.post("/:tableName/delete", middleware.checkTable, (request, response) => {
  try {
    console.log("API for employee /employee/modify/:tableName/delete");
    var sent_data = DECRYPT(request.body.data);

    cores.DELETE_FROM(
      sent_data.data[0],
      sent_data.data[1],
      cores.LENGTH_CHECKER(sent_data.data[2])
    ).then((value) => {
      response.json(ENCRYPT({
        message: "successfully delete",
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      }));
    });
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}));
  }
})

/**
 * POST request handler to modify
 * 
 * delete from a table
 */
router.post("/:tableName/modify", middleware.checkTable, (request, response) => {
  try {
    console.log("API for employee /employee/modify/:tableName/modify");
    var sent_data = DECRYPT(request.body.data);

    cores.UPDATE_TUPLE(
      sent_data.data[0],
      cores.LENGTH_CHECKER(sent_data.data[1]),
      cores.LENGTH_CHECKER(sent_data.data[2]),
      cores.LENGTH_CHECKER(sent_data.data[3]),
      cores.LENGTH_CHECKER(sent_data.data[4])
    ).then((value) => {
      response.json(ENCRYPT({
        message: "successfully update",
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      }));
    });
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

module.exports = router;