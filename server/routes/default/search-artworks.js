const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();

console.log("/routes/default/search-artworks");

/**
 * GET request handler
 *
 * retrieve the artwork customer want to find
 */
router.get("/", (request, response) => {
  try {
    console.log("API for default /default/search-artworks");

    cores.SELECT_SEARCH(
      ["artworks", "authors"],
      ["AuthorName", "ArtName", "ArtCharacteristics"],
      request.query.data,
      "Likes"
    )
    .then((value) => {
      response.json({
        message: "Artwork found",
        info: value.info,
        queryInfo: value.queryInfo,
        queryError: value.queryError,
      });
    });
  } catch (error) {
    console.log(error);
    response.json({errorMessage: "300"})
  }

});

module.exports = router;
