const express = require("express");
const cors = require("cors");
const con = require("./config/connect_mysql");

// middlewares
const middleware = require("./middleware/access_level");

// routes
const defaultRoute = require("./routes/default");
const employeeRoute = require("./routes/employee");
const customerRoute = require("./routes/customer");
const administratorRoute = require("./routes/administrator");

const app = express();

app.use(cors());
app.use(express.json());

//#region documentation
//swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "CloudXi Museum",
      description: "This is the REST API documentaion for the Cloudxi Museum online management system",
      version: "1.0.0",
      contact: {
        email: 'CloudXiMuseum@gmail.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
      {
        url: 'http://20.239.50.102',
        description: 'Deployment server',
      }
    ],
  },
  apis: ['app.js', './routes/default/artworks.js'],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// swagger documention
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//#endregion

//resolve requests to /default
app.use("/default", defaultRoute);

//resolve requests to /customer
app.use("/customer", middleware.checkToken, middleware.checkLogin, customerRoute);

//resolve requests to /employee
app.use("/employee", middleware.checkToken, middleware.checkLogin, middleware.accessLevel_v2, employeeRoute);

//resolve requests to /administrator
app.use("/admin", middleware.checkToken, middleware.checkLogin, middleware.accessLevel_v2, middleware.accessLevel_v3, administratorRoute);

// app.use((request, response) => {
//   response.json({ message: "Hey! This is your server response!" });
// });

//testing region

//resolve requests to

//end of testing region

module.exports = app;
