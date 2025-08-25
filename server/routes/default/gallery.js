const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();

console.log("/routes/default/gallery");

/**
 * GET request handler
 *
 * retrieve random artwork for gallery
 */
router.get("/", async (request, response) => {
  try {
    console.log("API for default /default/gallery");

    const sliderNo = 4;
    let slider = [];
    for (let i = 0; i < sliderNo; i++) {
      cores
        .SELECT(
          "artworks",
          ["ArtName", "ImgLink", "AuthorID", "ArtYear"],
          ["ArtID"],
          [(i + 1).toString()]
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
              slider.push({
                artName: res.info[0].ArtName,
                imgLink: res.info[0].ImgLink,
                artYear: res.info[0].ArtYear,
                authorName: res1.info[0].AuthorName,
              });
              if (i == sliderNo - 1) {
                response.json({
                  sliderData: slider,
                });
              }
            })
            .catch((err) => {
              console.log("no item");
            });
        });
    }
  } catch (error) {
    console.log(error);
    response.json({ errorMessage: "300" });
  }
});

module.exports = router;
