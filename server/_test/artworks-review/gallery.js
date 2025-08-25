const cores = require("../../core/core_functions");
const express = require("express");
const router = express.Router();

const artworkRoute = require("./artwork");

router.use("/artwork", artworkRoute);

router.get("/", async (request, response) => {
  const sliderNo = 3;
  let slider = [];
  try {
    for (let i = 0; i < sliderNo; i++) {
      //const temp = await
      cores
        .SELECT(
          "artworks",
          ["ArtName", "ImgLink", "AuthorID"],
          ["ArtID"],
          [(i + 1).toString()]
        )
        .then((res) => {
          console.log("yes", res.info[0].AuthorID);
        });
      const authorName = await cores.SELECT(
        "authors",
        ["AuthorName"],
        ["AuthorID"],
        [1] //temp.info[0].AuthorID]
      );

      //console.log("yes", temp.info[0]);
      //slider[i] = await temp.info;
    }

    console.log(slider);
    response.json({
      sliderData: slider,
    }); //, favorites: [] });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
