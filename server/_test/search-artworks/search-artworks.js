const cores = require("../../core/core_functions");
const express = require("express");
const router = express.Router();

// cores.SELECT_SEARCH(["Artworks", "Authors"], ["AuthorName", "ArtName", "ArtCharacteristics"], ["vinci"], "Likes");

router.get("/", (request, response) => {
  cores
    .SELECT_SEARCH(
      ["artworks", "authors"],
      ["AuthorName", "ArtName", "ArtChracteristics"],
      request.params.data,
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
});

module.exports = router;
