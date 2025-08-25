const express = require("express");

const authRoute = require("./auth.js");
const galleryRoute = require("./gallery.js");
const artworkRoute = require("./artworks.js");
const searchRoute = require("./search-artworks.js");
const bookingRoute = require("./booking.js");
const checkLogin = require("./check-login.js");
const reviewsRoute = require("./reviews.js");
const giftshopRoute = require("./giftshop.js");

const router = express.Router();

console.log("/routes/default");

//resolve requests to /auth
router.use("/auth", authRoute);

//resolve requests to /gallery
router.use("/gallery", galleryRoute);

//resolve requests to /artworks
router.use("/artworks", artworkRoute);

//resolve requests to /search-artworks
router.use("/search-artworks", searchRoute);

//resolve requests to /search-artworks
router.use("/booking", bookingRoute);

//resolve requests to /checklogin
router.use("/check-login", checkLogin);

//resolve requests to /reviews
router.use("/reviews", reviewsRoute);

//resolve requests to /giftshop
router.use("/giftshop", giftshopRoute);

// app.use((request, response) => {
//   response.json({ message: "Hey! This is your server response!" });
// });

//testing region

//resolve requests to

//end of testing region

module.exports = router;