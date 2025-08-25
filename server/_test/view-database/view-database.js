const cores = require("../../core/core_functions");
const express = require("express");
const middleware = require("../../core/access_level");
const router = express.Router();

router.get("/", (request, response) => {
  cores.GET_TABLE_NAME()
  .then((value) => {
    console.log(value);
    response.json({ message: "successfully", info: value.info });
  })
})

router.get("/:tableName", (request, response) => {
  cores.SELECT_TABLE(request.params.tableName)
    .then((value) => {
      response.json({
        message: "successfully info",
        info: value.info,
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      });
      console.log(value.info);
    })
})

module.exports = router;