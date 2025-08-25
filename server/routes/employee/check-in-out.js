const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");

console.log("/routes/employee/check-in-out");

/**
 * Get request handler to check in
 * 
 * gets the status of the ticket
 */
router.get("/:ticketCode", (request, response) => {
	try {
		console.log("API for employee /employee/check-in-out");

		cores.CHECK_EXIST("books", ["TicketCode"], [request.params.ticketCode])
		.then((checkExist) => {
      if(checkExist) {
        cores.SELECT("books", ["*"], ["ticketCode"], [request.params.ticketCode])
        .then((value) => {
        response.json(ENCRYPT({message: "The ticket  exist", info: value.info}));
        })
      } else {
        response.json(ENCRYPT({message: "The ticket does not exist", info: checkExist}));
      }
		})
	} catch (error) {
		console.log(error);
		response.json(ENCRYPT({errorMessage: "300"}))
	}
})

/**
 * POST request handler to check in
 * 
 * checks in the ticket for the customer
 */
router.post("/check-in", (request, response) => {
	try {
		console.log("API for employee /employee/check-in");
		var ticket = DECRYPT(request.body.data);

		cores.SELECT("books", ["TStatus"], ["TicketCode"], [ticket.data[0]])
		.then((value) => {
			if (value.info[0].TStatus === "booked") {
				cores.UPDATE_TUPLE("books", ["TStatus"], ["check-in"], ["TicketCode"], [ticket.data[0]])
				.then(() => {
					response.json(ENCRYPT({ message: "checked in successfully" }));
				})
			} else {
				response.json(ENCRYPT({ message: "The ticket is already " + value.info[0].TStatus }));
			}
		})
	} catch (error) {
		console.log(error);
		response.json(ENCRYPT({errorMessage: "300"}))
	}
});

/**
 * POST request handler to check out
 * 
 * checks out the ticket for the customer
 */
router.post("/check-out", (request, response) => {
	try {
		console.log("API for employee /employee/check-out");
		var ticket = DECRYPT(request.body.data);

		cores.SELECT("books", ["TStatus"], ["TicketCode"], [ticket.data[0]])
		.then((value) => {
			if (value.info[0].TStatus === "check-in") {
				cores.UPDATE_TUPLE("books", ["TStatus"], ["check-out"], ["TicketCode"], [ticket.data[0]])
				.then(() => {
					response.json(ENCRYPT({ message: "checked out successfully" }));
				})
			} else if (value.info[0].TStatus === "booked") {
				response.json(ENCRYPT({ message: "The ticket is only " + value.info[0].TStatus }));
			} else {
				response.json(ENCRYPT({ message: "The ticket is already " + value.info[0].TStatus }));
			}
		}) 
	} catch (error) {
		console.log(error);
		response.json(ENCRYPT({errorMessage: "300"}))
	}
})

module.exports = router;
