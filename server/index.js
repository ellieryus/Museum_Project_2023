const http = require("http");
const app = require("./app");
const cron = require("./scheduler/cron");

app.set("port", 3001);

const server = http.createServer(app);

server.listen(3001);

// app.set("port", 3001);

// const server = http.createServer(app);

// server.listen(3001);
