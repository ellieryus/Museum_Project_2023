const cores = require("../../core/core_functions");
const express = require("express");
const router = express.Router();
const middleware = require("../../core/access_level");

router.post("/", (request, response) => {
    // gets attributes from database
    if (request.body.id == 1) {
        cores.DESCRIBE(request.body.data[0]).then((value) => {
            console.log(value.info);
            response.json({
                message: "successfully get attributes",
                info: value.info,
                queryInfo: value.queryInfo,
                queryError: value.queryError,
            });
        });
    }

    // inserts data into database
    else if (request.body.id == 2) {
        cores.INSERT_INTO(
            request.body.data[0],
            "",
            cores.LENGTH_CHECKER(request.body.data.slice(1))
        );
    }

    // deletes data from database
    else if (request.body.id == 3) {
        cores.DELETE_FROM(
            request.body.data[0],
            request.body.data[1],
            cores.LENGTH_CHECKER(request.body.data[2])
        ).then((value) => {
            response.json({
                message: "successfully delete",
                queryInfo: value.queryInfo,
                queryError: value.queryError,
            });
        });
    }
});

router.post("/books", async (request, response) => {
  if (request.body.id == 1) {
    console.log(request.body.data[1]);

    for (var i = 0; i < request.body.data[3]; i++) {
      var randomCode;
      var unique = false;
      while (!unique) {
        newCode = await cores.GENERATE_RANDOM_CODE(4);

        unique = newCode.unique; 
        randomCode = newCode.code;      
      }
      cores.INSERT_INTO("books", ["UID", "TDate", "TTime", "TicketCode"], [request.body.data[0], request.body.data[1], request.body.data[2], randomCode]);
    }
    cores.DECREASE("timeslots", ["Count"], [request.body.data[3]], ["TDate", "TTime"], [request.body.data[1], request.body.data[2]]);

    response.json({ message: "booked successfully" });
  }
})

router.post("/checkin_out", (request, response) => {
	if (request.body.id == 1) {
		cores.CHECK_EXIST("books", ["TicketCode"], [request.body.data[0]])
		.then((checkExist) => {
			if (checkExist) {
				cores.SELECT("books", ["TStatus"], ["TicketCode"], [request.body.data[0]])
					.then((value) => {
						if (value.info[0].TStatus === "booked") {
                            cores.UPDATE_TUPLE("books", ["TStatus"], ["check-in"], ["TicketCode"], [request.body.data[0]])
                            .then(() => {
                                response.json({ message: "checked in successfully" });
                            })
						} else {
							response.json({ message: "The ticket is already " + value.info[0].TStatus });
						}
					})
			} else {
				response.json({ message: "The ticket does not exist" });
			}
		}) 
  } else if (request.body.id == 2) {
		cores.CHECK_EXIST("books", ["TicketCode"], [request.body.data[0]])
		.then((checkExist) => {
			if (checkExist) {
				cores.SELECT("books", ["TStatus"], ["TicketCode"], [request.body.data[0]])
					.then((value) => {
						if (value.info[0].TStatus === "check-in") {
                            cores.UPDATE_TUPLE("books", ["TStatus"], ["check-out"], ["TicketCode"], [request.body.data[0]])
                            .then(() => {
                                response.json({ message: "checked out successfully" });
                            })
						} else if (value.info[0].TStatus === "booked") {
							response.json({ message: "The ticket is only " + value.info[0].TStatus });
						} else {
							response.json({ message: "The ticket is already " + value.info[0].TStatus });
						}
					})
			} else {
				response.json({ message: "The ticket does not exist" });
			}
		}) 
    
    for (var i = 0; i < request.body.data[3]; i++) {
      cores.INSERT_INTO(
        "books",
        ["UID", "TDate", "TTime", "TicketCode"],
        [
          request.body.data[0],
          request.body.data[1],
          request.body.data[2],
          randomCode,
        ]
      );
    }

    cores.DECREASE(
      "timeslots",
      ["Count"],
      [request.body.data[3]],
      ["TDate", "TTime"],
      [request.body.data[1], request.body.data[2]]
    );

    response.json({ message: "booked successfully" });
  }
});

module.exports = router;
