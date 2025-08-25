const cores = require("../../core/core_functions");
const express = require("express");
const router = express.Router();

router.get(`/:artID`, async (request, response) => {
  try {
    const data = await cores.SELECT(
      "artwork",
      ["artName", "author", "description", "likes"],
      ["artID"],
      [request.params.artID]
    );
    response.json({ info: data });
  } catch (error) {
    console.log(error);
  }
});

router.post(`/:artID/like`, async (request, response) => {
  try {
    const artID = request.params.artID;
    const like = request.body.like;
    const currLike = await cores.SELECT(
      "artwork",
      ["likes"],
      ["artID"],
      [artID]
    );
    console.log(like);
    const newLike = Number(Number(currLike.info[0][0]) + Number(like));
    console.log(newLike);
    const res = await cores.UPDATE_TUPLE(
      "artwork",
      ["likes"],
      [newLike],
      ["artID"],
      [artID]
    );
    response.json({ res: res });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
