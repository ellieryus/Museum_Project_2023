const cores = require("../../utils/core_functions");
const express = require("express");
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");
const router = express.Router();

// test connection
console.log("/routes/customer/user-likes");

/**
 * POST request handler
 * 
 * to likes an artwork with the ID
 */
router.post(`/:artID/like`, async (request, response) => {
  try {
    console.log("API for customer /customer/user-likes/:artID/like");
    var sent_data = DECRYPT(request.body.data);

    const artID = request.params.artID;
    const like = sent_data.like;
    const UID = sent_data.UID;

    if (like === 1) {
      cores.INCREASE("artworks", ["likes"], [1], ["ArtID"], [artID]);

      cores.INSERT_INTO("likes", "UID, ArtID", [UID, artID]);

      console.log(like);
    } else {
      cores.DECREASE("artworks", ["likes"], [1], ["ArtID"], [artID]);

      cores.DELETE_FROM("likes", ["UID", "ArtID"], [UID, artID]);
    }

    response.json(ENCRYPT({message: "user-likes successfully"}));
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
});

/**
 * GET request handler
 * 
 * retrieve the information about if this users has liked the picture or not
 */
router.get("/:artID/:userID", async (request, response) => {
  try {
    console.log("API for customer /customer/user-likes/:artID/:userID");

    const data = await cores.CHECK_EXIST(
      "likes",
      ["artID", "UID"],
      [request.params.artID, request.params.userID]
    );

    response.json(ENCRYPT({ res: data }));
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT(ENCRYPT({errorMessage: "300"})))
  }
});

module.exports = router;
