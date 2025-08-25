const express = require("express");

const getDataRoute = require("./get-data");
const checkInOutRoute = require("./check-in-out");
const modifyRoute = require("./modify");
const inventoryRoute = require("./inventory");

const router = express.Router();

console.log("/routes/employee");

//resolve requests to /check-in-out
router.use("/check-in-out", checkInOutRoute);

//resolve requests to /modify
router.use("/modify", modifyRoute);

//resolve requests to /get-data
router.use("/get-data", getDataRoute);

//resolve requests to /inventory
router.use("/inventory", inventoryRoute);


// app.use((request, response) => {
//   response.json({ message: "Hey! This is your server response!" });
// });

//testing region

//resolve requests to

//end of testing region

module.exports = router;