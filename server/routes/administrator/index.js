const express = require("express");

const getDataRoute = require("./get-data");
const modifyRoute = require("./modify");

const router = express.Router();

console.log("/routes/admin");

//resolve requests to /modify
router.use("/modify", modifyRoute);

//resolve requests to /get-data
router.use("/get-data", getDataRoute);

// app.use((request, response) => {
//   response.json({ message: "Hey! This is your server response!" });
// });

//testing region

//resolve requests to

//end of testing region

module.exports = router;