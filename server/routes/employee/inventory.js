const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");


console.log("/routes/employee/inventory");

/**
 * Get request handler to check in
 * 
 * gets the status of the cart
 */
router.get("/:billNum", (request, response) => {
	try {
		console.log("API for employee /employee/inventory/:billNum");

		cores.CHECK_EXIST("buys", ["BillNum"], [request.params.billNum])
		.then((checkExist) => {
			if(checkExist) {
				cores.SELECT("buys", ["*"], ["BillNum"], [ request.params.billNum ])
				.then((value) => {
				response.json(ENCRYPT({message: "The cart exist", info: value.info}));
				})
			} else {
				response.json(ENCRYPT({message: "The cart does not exist", info: checkExist}));
			}
		})
	} catch {
		console.log(error);
		response.json(ENCRYPT({errorMessage: "300"}))
	}
})

/**
 * POST request handler to check in
 * 
 * deliver the goods for the customer
 */
router.post("/deliver", (request, response) => {
	try {
		console.log("API for employee /employee/inventory/deliver");
		var bill = DECRYPT(request.body.data);

		cores.SELECT("buys", ["BStatus"], ["BillNum"], [bill.data[0]])
		.then((value) => {
			if (value.info[0].BStatus === "booked") {
				cores.UPDATE_TUPLE("buys", ["BStatus"], ["deliver"], ["BillNum"], [bill.data[0]])
				.then(() => {
					response.json(ENCRYPT({ message: "deliver successfully" }));
				})
			} else {
				response.json(ENCRYPT({ message: "The goods is already " + value.info[0].TStatus }));
			}
	  })
	} catch (error) {
		console.log(error);
		response.json(ENCRYPT({errorMessage: "300"}))
	}
});
module.exports = router;