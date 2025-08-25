const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();

console.log("/routes/default/artworks");

/**
 * @swagger
 * /default/artworks/{artID}:
 *   get:
 *     summary: GET the information of the artwork with the artID  
 */
router.get(`/:artID`, async (request, response) => {
  try {
    console.log("API for default /default/artworks/:artID");

    cores
      .SELECT(
        "artworks",
        ["ArtName", "ImgLink", "AuthorID", "Description", "Likes"],
        ["ArtID"],
        [request.params.artID]
      )
      .then((res) => {
        cores
          .SELECT(
            "authors",
            ["AuthorName"],
            ["AuthorID"],
            [res.info[0].AuthorID]
          )
          .then((res1) => {
            response.json({
              artName: res.info[0].ArtName,
              imgLink: res.info[0].ImgLink,
              authorName: res1.info[0].AuthorName,
              likes: res.info[0].Likes,
              artDescription: res.info[0].Description,
            });
          });
      });
  } catch (error) {
    console.log(error);
    response.json({ errorMessage: "300" });
  }
});

module.exports = router;
