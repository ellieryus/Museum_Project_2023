const mysql = require("mysql");

var con = mysql.createConnection({
  host: "20.239.50.102",
  user: "root",
  password: "passWORD%123",
  database: "mmsdb",
  insecureAuth: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
