const cores = require("../utils/core_functions");
const jwt = require("jsonwebtoken");
const config = require("../config/jsonwebtoken");
const { DECRYPT } = require("../utils/decrypt");
const { ENCRYPT } = require("../utils/encrypt");

/**
 * checks the table if it is valid for user's role or not
 * 
 * @param {*} req - information from the frontend 
 * @param {*} res - replies message to frontend
 * @param {*} next - calls the next function
 * @returns {next()} - if the table name does not include users or tokens 
 * @returns {message, errorMessage} - if the table name includes users or tokens 
 */
function checkTable(req, res, next){
  if(!["users", "tokens"].includes(req.params.tableName)){
    return next();
  } else {
    res.json(ENCRYPT({message: "No permission to access", errorMessage: "102"}));
  }
}
/**
 * 
 * @param {*} req - information from the frontend 
 * @param {*} res - replies message to frontend
 * @param {*} next - calls the next function
 * @param {next()} - if the token is valid and not expired  
 * @returns {message, errorMessage} - if the token is invalid or expired
 */
async function checkToken (req, res, next) {
  console.log("checkToken");
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send(ENCRYPT({
      message: "No token provided!",
      errorMessage: "201"
    }));
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(ENCRYPT({
        message: "Session expired",
        errorMessage: "201"
      }));
    }
    console.log("verify successfully")
    req.token = decoded.token;
    next();
  });
};

/**
 * checks if the UID has the correct token
 * 
 * @param {*} req - information from the frontend
 * @param {*} res - replies message to frontend
 * @param {*} next - calls the next function
 * @returns {next()} - if the UID has the correct Token
 * @returns {message, errorMessage} - if UID or Token is incorrect
 */
async function checkUser(req, res, next){
  console.log("checkUser");

  var sent_data = DECRYPT(req.body.data);

  let checkExist = await cores.CHECK_EXIST("tokens", ["Token"], [req.token]);

  if(checkExist){
    let checkID = await cores.SELECT("tokens", ["UID"], ["Token"], [req.token]);

    if(checkID.info[0].UID == sent_data.data[0]){
      console.log("checkUser next")
      return next();
    } else {
      res.json(ENCRYPT({message: "Information provided is not correct", errorMessage: "200"}));
    }
  } else {
    res.json(ENCRYPT({message: "Login is required", errorMessage: "201"}));
  }
}

/**
 * checks whether the user logins or not
 * 
 * @param {*} req - information from the frontend
 * @param {*} res - replies message to frontend
 * @param {*} next - calls the next function
 * @returns {next()} - if the user already logins
 * @returns {message, errorMessage} - if the user does not login
 * 
 */
function checkLogin(req, res, next){
  console.log("checkLogin");
  cores.CHECK_EXIST("tokens", ["Token"], [req.token])
    .then((value) => {
      if(value){
        return next();
      } else {
        res.json(ENCRYPT({message: "Login is required", errorMessage: "201"}));
      }
  })
}

/**
 * checks access level of employee and admin
 * 
 * @param {*} req - information from the frontend
 * @param {*} res - replies message to frontend
 * @param {*} next - calls the next function
 * @returns {next()} - if the user has role of admin or employee
 * @returns {message, errorMessage} - if the user has customer role
 * 
 */
function accessLevel_v2(req, res, next){
  console.log("accessLevel_v2");
  cores.SELECT("tokens", ["Role"], ["Token"], [req.token])
  .then((value) => {
    if(value.info[0].Role == "admin" || value.info[0].Role == "employee"){
      return next()
    } else {
      res.json(ENCRYPT({message: "You only have access permission for customer", errorMessage: "101"}));
    }
  })
}

/**
 * 
 * checks access level of admin
 * 
 * @param {*} req - information from the frontend
 * @param {*} res - replies message to frontend
 * @param {*} next - calls the next function
 * @returns {next()} - if the user has role of admin
 * @returns {message, errorMessage} - if the user has customer or employee role
 * 
 */
function accessLevel_v3(req, res, next){
  console.log("accessLevel_v3");
  cores.SELECT("tokens", ["Role"], ["Token"], [req.token])
  .then((value) => {
    if(value.info[0].Role == "admin"){
      return next()
    } else {
      res.json(ENCRYPT({message: "You have no permission for admin", errorMessage: "102"}));
    }
  })
}

module.exports = {
    accessLevel_v3,
    accessLevel_v2,
    checkUser,
    checkLogin,
    checkTable,
    checkToken
};