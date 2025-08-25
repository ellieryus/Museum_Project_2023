const express = require("express");
const cors = require("cors");
const con = require("./connect_mysql");
const cores = require("./core/core_functions");

const galleryRoute = require("./routes/default/gallery");
const authRoute = require("./routes/default/auth");
const employeeRoute = require("./routes/employee/modify");
const administratorRoute = require("./routes/administrator/admin");
const searchArtworksRoute = require("./routes/default/search-artworks");
const checkInOutRoute = require("./routes/employee/check-in-out");

const middleware = require("./core/access_level")

const { response, json, request } = require("express");
const { resolve } = require("path");

const app = express();

app.use(cors());
app.use(express.json());

//resolve requests to /gallery
app.use("/gallery", galleryRoute);

//resolve requests to /auth
app.use("/auth", authRoute);

//resolve requests to /employee
app.use("/employee", employeeRoute);

//resolve requests to /administrator
app.use("/administrator", middleware.checkToken, middleware.accessLevel_v3, administratorRoute);

//resolve requests to /search-artworks
app.use("/search-artworks", searchArtworksRoute);

//resolve requests to /check-in-out
app.use("/check-in-out", checkInOutRoute);

// app.use((request, response) => {
//   response.json({ message: "Hey! This is your server response!" });
// });

//testing region

//resolve requests to 

//end of testing region

module.exports = app;
