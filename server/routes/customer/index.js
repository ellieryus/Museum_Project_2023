const express = require("express");

const router = express.Router();

// routes used in /customer
const bookingRoute = require("./booking");
const userlikesRoute = require("./user-likes.js");
const giftshopRoute = require("./giftshop.js");
const reviewsRoute = require("./reviews.js");
const profileRoute = require("./profile.js")

// test connection
console.log("/routes/customer");

//resolve requests to /booking
router.use("/booking", bookingRoute);

//resolve requests to /user-likes
router.use("/user-likes", userlikesRoute);

//resolve requests to /giftshop
router.use("/giftshop", giftshopRoute);

//resolve requests to /reviews
router.use("/reviews", reviewsRoute);

//resolve requests to /profile
router.use("/profile", profileRoute);

module.exports = router;