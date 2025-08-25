const cores = require("../../utils/core_functions");
const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/access_level");
const { ENCRYPT } = require("../../utils/encrypt");
const { DECRYPT } = require("../../utils/decrypt");

// test connection
console.log("/routes/customer/booking");

/**
 * GET request handler
 * 
 * gets information about the client's ticket
 */
router.get("/:UID/ticket", (request, response) => {
  try {
    console.log("API for customer /customer/booking/:UID/ticket");

    cores.SELECT("books", ["TDate", "TTime", "TicketCode", "TStatus"], ["UID"], [request.params.UID])
    .then((value) => {
     response.json(ENCRYPT({message: "Ticket retrieve", info: value.info}));
    })
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

/**
 * POST request handler
 * 
 * add information about the new tickets into the books table 
 *  and reduce available Timeslots in the timeslots table 
 */
router.post("/books", middleware.checkUser, async (request, response) => {
  try {
    console.log("API for customer /customer/booking/books");
    var sent_data = DECRYPT(request.body.data);

    for (var i = 0; i < sent_data.data[3]; i++) {
      var randomCode;
      var unique = false;
      while (!unique) {
        newCode = await cores.GENERATE_RANDOM_CODE(4, "books", "ticketCode");
  
        unique = newCode.unique;
        randomCode = newCode.code;      
      }
      cores.INSERT_INTO("books", ["UID", "TDate", "TTime", "TicketCode"], [sent_data.data[0], sent_data.data[1], sent_data.data[2], randomCode]);
    }
    cores.DECREASE("timeslots", ["Count"], [sent_data.data[3]], ["TDate", "TTime"], [sent_data.data[1], sent_data.data[2]]);
  
    response.json(ENCRYPT({ message: "booked successfully" }));
  } catch (error) {
    console.log(error);
    response.json(ENCRYPT({errorMessage: "300"}))
  }
})

module.exports = router;