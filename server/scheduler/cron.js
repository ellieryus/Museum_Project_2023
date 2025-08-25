const cron = require("node-cron");
const { response } = require("../app");
const con = require("../config/connect_mysql");
const cores = require("../utils/core_functions");

const time = "0 13 * * *";
const test = "*/5 * * * * * *";

/**
 * This function is called after a specific time
 * 
 * @param time - a fixed time to run the function
 */
cron.schedule(time, function () {
  console.log("cron ne");
  var res = cores.GET_DATE(0);
  var week = new Date();

  con.query(
    "DELETE FROM timeslots WHERE TDate = '" + res + "';",
    (err, result, field) => {
      if (err) {
        console.log(err);
      } else {
        var nextDate = cores.GET_DATE(3);
        if (week.getDay() != 5) {
          for (var j = 9; j < 18; j += 2) {
            var slot;
            if (j < 10) {
              slot = "0" + j + ":00";
            } else {
              slot = j + ":00";
            }
            con.query(
              "INSERT INTO timeslots (TDate, TTime) VALUES ('" +
                nextDate +
                "', '" +
                slot +
                "');"
            );
            console.log();
          }
        } else {
          for (var j = 7; j < 16; j += 2) {
            var slot;
            if (j < 10) {
              slot = "0" + j + ":00";
            } else {
              slot = j + ":00";
            }
            con.query(
              "INSERT INTO timeslots (TDate, TTime, Count) VALUES ('" +
                nextDate +
                "', '" +
                slot +
                "', 0);"
            );
          }
        }
      }
    }
  );
});
