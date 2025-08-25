const cores = require("../../core/core_functions");
const express = require("express");
const router = express.Router();

router.get("/:artID/:userID", async (request, response) => {
  try {
    const data = await cores.CHECK_EXIST(
      "likes",
      ["artID", "UID"],
      [request.params.artID, request.params.userID]
    );
    response.json({ res: data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
