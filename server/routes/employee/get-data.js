const cores = require("../../utils/core_functions");
const express = require("express");
const middleware = require("../../middleware/access_level");
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");
const router = express.Router();

console.log("/routes/employee/get-data");

/**
 * GET request handler
 * 
 * retrieve the column's name of the table
 */
router.get("/getAttribute/:tableName", middleware.checkTable, (request, response) => {
  try {
    console.log("API for employee /employee/get-data/getAttribute/:tableName");

    cores.DESCRIBE(request.params.tableName).then((value) => {
      response.json(ENCRYPT({
        message: "successfully get attributes",
        info: value.info,
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      }));
    });
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
});

/**
 * GET request handler
 * 
 * retrieve the Name of the table
 */
router.get("/getTableName", (request, response) => {
  try {
    console.log("API for employee /employee/get-data/getTableName");

    cores.GET_TABLE_NAME()
    .then((value) => {
      response.json(ENCRYPT({ message: "successfully", info: value.info }));
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

/**
 * GET request handler
 * 
 * retrieve the information of the table
 */
router.get("/getTable/:tableName", middleware.checkTable, (request, response) => {
  try {
    console.log("API for employee /employee/get-data/getTable/:tableName");

    cores.SELECT_TABLE(request.params.tableName)
    .then((value) => {
      if(value.info.length != 0){
        response.json(ENCRYPT({
          message: "successfully info",
          info: value.info,
          queryInfo: value.queryInfo,
          queryError: value.queryError,
        }));
      } else {
        response.json(ENCRYPT({
          message: "no information",
          info: value.info,
          queryInfo: value.queryInfo,
          queryError: value.queryError,
        }));
      }
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

module.exports = router;
